// Google Calendar helpers (Node 20+ has global crypto.subtle, fetch, btoa/atob).
// Auth uses a Google service account (RS256 JWT signed with Web Crypto).

export interface GoogleEnv {
  GOOGLE_SA_EMAIL?: string; // service account email
  GOOGLE_SA_PRIVATE_KEY?: string; // PEM, with literal \n or real newlines
  CALENDAR_ID?: string; // calendar shared with the service account
  ET_OFFSET_HOURS?: string; // optional, default -4 (EDT)
}

function base64url(input: ArrayBuffer | string): string {
  let bytes: Uint8Array;
  if (typeof input === "string") {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = new Uint8Array(input);
  }
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const normalized = pem.replace(/\\n/g, "\n");
  const body = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const buf = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
  return buf;
}

let cachedToken: { token: string; exp: number } | null = null;

export async function getAccessToken(env: GoogleEnv, scope: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.token;

  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: env.GOOGLE_SA_EMAIL,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.GOOGLE_SA_PRIVATE_KEY || ""),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  );
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Google token error: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, exp: now + data.expires_in };
  return data.access_token;
}

export interface Slot {
  label: string;
  startISO: string;
  endISO: string;
}

// Business hours: 9am–5pm ET, 30-minute slots.
export function generateSlotTimes(dateStr: string, offsetHours: number): Slot[] {
  const slots: Slot[] = [];
  for (let hour = 9; hour < 17; hour++) {
    for (const min of [0, 30]) {
      const utcHour = hour - offsetHours;
      const startDate = new Date(
        `${dateStr}T${String(utcHour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00Z`,
      );
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
      const label12 = `${hour > 12 ? hour - 12 : hour}:${String(min).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
      slots.push({ label: label12, startISO: startDate.toISOString(), endISO: endDate.toISOString() });
    }
  }
  return slots;
}
