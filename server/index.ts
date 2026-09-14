import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { generateSlotTimes, getAccessToken, type GoogleEnv } from "./google.js";
import { createChatRouteHandler } from "./chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env as GoogleEnv;
const CAL_SCOPE = "https://www.googleapis.com/auth/calendar";

function offsetHours(): number {
  return env.ET_OFFSET_HOURS ? Number(env.ET_OFFSET_HOURS) : -4;
}

export function calendarConfigured(): boolean {
  return Boolean(env.GOOGLE_SA_EMAIL && env.GOOGLE_SA_PRIVATE_KEY && env.CALENDAR_ID);
}

// ── Shared booking logic ─────────────────────────────────────────────────────
// Used by both the HTTP routes (Contact page) and the chat assistant's tools.

/** An error carrying the HTTP status + client-safe message the routes return. */
export class BookingError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "BookingError";
  }
}

export interface AvailabilitySlot {
  label: string;
  startISO: string;
  available: boolean;
}

export interface AvailabilityResult {
  date: string;
  slots: AvailabilitySlot[];
}

/** YYYY-MM-DD of an instant, in ET (using the configured fixed offset). */
function etDateOf(ms: number): string {
  return new Date(ms + offsetHours() * 3600_000).toISOString().slice(0, 10);
}

export async function getAvailability(date: string): Promise<AvailabilityResult> {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new BookingError(400, "Invalid date. Use YYYY-MM-DD format.");
  }
  if (!calendarConfigured()) {
    throw new BookingError(500, "Calendar not configured.");
  }

  const slots = generateSlotTimes(date, offsetHours());
  if (slots.length === 0) return { date, slots: [] };
  const timeMin = slots[0].startISO;
  const timeMax = slots[slots.length - 1].endISO;

  let busy: { start: string; end: string }[];
  try {
    const token = await getAccessToken(env, CAL_SCOPE);
    const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ timeMin, timeMax, items: [{ id: env.CALENDAR_ID }] }),
    });
    if (!gcalRes.ok) {
      console.error("[availability] Calendar API error", await gcalRes.text());
      throw new BookingError(502, "Calendar API error.");
    }
    const gcalData = (await gcalRes.json()) as {
      calendars: Record<string, { busy: { start: string; end: string }[] }>;
    };
    busy = gcalData.calendars[env.CALENDAR_ID!]?.busy ?? [];
  } catch (err) {
    if (err instanceof BookingError) throw err;
    console.error("[availability] error", err);
    throw new BookingError(500, "Internal server error.");
  }

  return {
    date,
    slots: slots.map((slot) => {
      const s = new Date(slot.startISO).getTime();
      const e = new Date(slot.endISO).getTime();
      const isBusy = busy.some((b) => {
        const bs = new Date(b.start).getTime();
        const be = new Date(b.end).getTime();
        return s < be && e > bs;
      });
      return { label: slot.label, startISO: slot.startISO, available: !isBusy };
    }),
  };
}

export interface BookingInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  companySize?: string;
  slotStartISO?: string;
  slotLabel?: string;
  slotDate?: string;
  source?: "website" | "chat";
}

export interface BookingResult {
  startISO: string;
  endISO: string;
  date: string; // YYYY-MM-DD, ET
  label: string; // e.g. "2:30 PM" (ET)
  invited: boolean; // false if the attendee invite had to be dropped
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const slotStartISO = input.slotStartISO?.trim();
  const { phone, company, industry, companySize } = input;

  if (!name || !email || !slotStartISO) {
    throw new BookingError(400, "Missing required fields: name, email, slotStartISO");
  }
  if (!calendarConfigured()) {
    throw new BookingError(500, "Calendar not configured.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new BookingError(400, "Invalid email address.");
  }

  const startMs = new Date(slotStartISO).getTime();
  if (Number.isNaN(startMs)) {
    throw new BookingError(400, "Invalid slotStartISO.");
  }
  if (startMs <= Date.now()) {
    throw new BookingError(400, "That time has already passed. Please pick a future time.");
  }
  const date = etDateOf(startMs);
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  if (weekday === 0 || weekday === 6) {
    throw new BookingError(400, "Demos are available Monday through Friday.");
  }
  const matched = generateSlotTimes(date, offsetHours()).find(
    (s) => new Date(s.startISO).getTime() === startMs,
  );
  if (!matched) {
    throw new BookingError(400, "Please pick one of the available time slots (9 AM–5 PM ET).");
  }

  const label = input.slotLabel || matched.label;
  const startISO = new Date(startMs).toISOString();
  const endISO = new Date(startMs + 15 * 60 * 1000).toISOString();

  const summary = `Fyro Free Demo — ${name}${company ? ` (${company})` : ""}`;
  const description = [
    `15-Minute Free Demo booked via fyroagents.com`,
    ...(input.source === "chat" ? [`Booked via: website chat`] : []),
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Industry: ${industry || "Not provided"}`,
    `Team Size: ${companySize || "Not provided"}`,
    ``,
    `Booked slot: ${input.slotDate || date} ${label} ET`,
  ].join("\n");

  const event: Record<string, unknown> = {
    summary,
    description,
    start: { dateTime: startISO },
    end: { dateTime: endISO },
    reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 15 }] },
  };

  try {
    const token = await getAccessToken(env, CAL_SCOPE);
    const insert = (withAttendee: boolean) => {
      const payload = withAttendee ? { ...event, attendees: [{ email }] } : event;
      const sendUpdates = withAttendee ? "all" : "none";
      return fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.CALENDAR_ID!)}/events?sendUpdates=${sendUpdates}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
    };

    // Try inviting the booker; fall back to no-attendee if the service account
    // isn't allowed to invite (no domain-wide delegation).
    let invited = true;
    let result = await insert(true);
    if (!result.ok) {
      const errText = await result.text();
      if (errText.includes("attendee") || result.status === 403) {
        invited = false;
        result = await insert(false);
      } else {
        console.error("[book] insert error", result.status, errText);
        throw new BookingError(502, "Could not create the booking. Please try again.");
      }
    }
    if (!result.ok) {
      console.error("[book] insert error (retry)", result.status, await result.text());
      throw new BookingError(502, "Could not create the booking. Please try again.");
    }

    return { startISO, endISO, date, label, invited };
  } catch (err) {
    if (err instanceof BookingError) throw err;
    console.error("[book] error", err);
    throw new BookingError(500, "Internal server error.");
  }
}

function sendBookingError(res: express.Response, err: unknown) {
  if (err instanceof BookingError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error("[booking] unexpected error", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

async function startServer() {
  const app = express();
  // Render sits behind a proxy; trust it so req.ip is the visitor's address
  // (used by the chat rate limiter).
  app.set("trust proxy", 1);
  app.use(express.json());
  const server = createServer(app);

  // ── Availability ──────────────────────────────────────────────────────────
  app.get("/api/availability", async (req, res) => {
    const { date } = req.query as { date?: string };
    try {
      res.json(await getAvailability(date ?? ""));
    } catch (err) {
      sendBookingError(res, err);
    }
  });

  // ── Booking ───────────────────────────────────────────────────────────────
  app.post("/api/book", async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : undefined);
    try {
      await createBooking({
        name: str("name"),
        email: str("email"),
        phone: str("phone"),
        company: str("company"),
        industry: str("industry"),
        companySize: str("companySize"),
        slotStartISO: str("slotStartISO"),
        slotLabel: str("slotLabel"),
        slotDate: str("slotDate"),
        source: "website",
      });
      res.json({
        success: true,
        message: "Booking confirmed. You'll receive a calendar invite shortly.",
      });
    } catch (err) {
      sendBookingError(res, err);
    }
  });

  // ── AI chat assistant ─────────────────────────────────────────────────────
  app.post(
    "/api/chat",
    createChatRouteHandler({ getAvailability, createBooking, calendarConfigured, BookingError }),
  );

  // ── Static site + SPA fallback ──────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Fyro site running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
