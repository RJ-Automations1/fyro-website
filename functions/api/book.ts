import { Env, getAccessToken, jsonResponse } from "../_lib/google";

interface BookBody {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  companySize?: string;
  slotStartISO?: string;
  slotLabel?: string;
  slotDate?: string;
}

// POST /api/book
// Creates a 15-minute Google Calendar event on the target calendar.
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: BookBody;
  try {
    body = (await request.json()) as BookBody;
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const { name, email, phone, company, industry, companySize, slotStartISO, slotLabel, slotDate } = body;

  if (!name || !email || !slotStartISO) {
    return jsonResponse({ error: "Missing required fields: name, email, slotStartISO" }, 400);
  }

  if (!env.GOOGLE_SA_EMAIL || !env.GOOGLE_SA_PRIVATE_KEY || !env.CALENDAR_ID) {
    return jsonResponse({ error: "Calendar not configured." }, 500);
  }

  const startMs = new Date(slotStartISO).getTime();
  if (Number.isNaN(startMs)) {
    return jsonResponse({ error: "Invalid slotStartISO." }, 400);
  }
  const endISO = new Date(startMs + 15 * 60 * 1000).toISOString();

  const summary = `Fyro Discovery Call — ${name}${company ? ` (${company})` : ""}`;
  const description = [
    `15-Minute Discovery Call booked via fyroagents.com`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Industry: ${industry || "Not provided"}`,
    `Team Size: ${companySize || "Not provided"}`,
    ``,
    `Booked slot: ${slotLabel || slotDate} ET`,
  ].join("\n");

  try {
    const token = await getAccessToken(env, "https://www.googleapis.com/auth/calendar");

    const event: Record<string, unknown> = {
      summary,
      description,
      start: { dateTime: slotStartISO },
      end: { dateTime: endISO },
      reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 15 }] },
    };

    const insert = async (withAttendee: boolean) => {
      const payload = withAttendee
        ? { ...event, attendees: [{ email }] }
        : event;
      const sendUpdates = withAttendee ? "all" : "none";
      return fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.CALENDAR_ID)}/events?sendUpdates=${sendUpdates}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
    };

    // Try with the booker as an attendee (sends them an invite email). If the
    // service account isn't allowed to invite attendees (no domain-wide
    // delegation), retry without attendees so the booking still succeeds.
    let res = await insert(true);
    if (!res.ok) {
      const errText = await res.text();
      if (errText.includes("attendee") || res.status === 403) {
        res = await insert(false);
      } else {
        console.error("[book] Calendar insert error", res.status, errText);
        return jsonResponse({ error: "Could not create the booking. Please try again." }, 502);
      }
    }

    if (!res.ok) {
      console.error("[book] Calendar insert error (retry)", res.status, await res.text());
      return jsonResponse({ error: "Could not create the booking. Please try again." }, 502);
    }

    return jsonResponse({
      success: true,
      message: "Booking confirmed. You'll receive a calendar invite shortly.",
    });
  } catch (err) {
    console.error("[book] error", err);
    return jsonResponse({ error: "Internal server error." }, 500);
  }
};
