import { Env, generateSlotTimes, getAccessToken, jsonResponse } from "../_lib/google";

// GET /api/availability?date=YYYY-MM-DD
// Returns 30-min slots between 9am–5pm ET with an `available` flag based on
// the target Google Calendar's free/busy.
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return jsonResponse({ error: "Invalid date. Use YYYY-MM-DD format." }, 400);
  }

  if (!env.GOOGLE_SA_EMAIL || !env.GOOGLE_SA_PRIVATE_KEY || !env.CALENDAR_ID) {
    return jsonResponse({ error: "Calendar not configured." }, 500);
  }

  const offset = env.ET_OFFSET_HOURS ? Number(env.ET_OFFSET_HOURS) : -4;
  const slots = generateSlotTimes(date, offset);
  if (slots.length === 0) return jsonResponse({ date, slots: [] });

  const timeMin = slots[0].startISO;
  const timeMax = slots[slots.length - 1].endISO;

  try {
    const token = await getAccessToken(env, "https://www.googleapis.com/auth/calendar");
    const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: [{ id: env.CALENDAR_ID }],
      }),
    });

    if (!gcalRes.ok) {
      console.error("[availability] Calendar API error", await gcalRes.text());
      return jsonResponse({ error: "Calendar API error." }, 502);
    }

    const gcalData = (await gcalRes.json()) as {
      calendars: Record<string, { busy: { start: string; end: string }[] }>;
    };
    const busy = gcalData.calendars[env.CALENDAR_ID]?.busy ?? [];

    const result = slots.map((slot) => {
      const s = new Date(slot.startISO).getTime();
      const e = new Date(slot.endISO).getTime();
      const isBusy = busy.some((b) => {
        const bs = new Date(b.start).getTime();
        const be = new Date(b.end).getTime();
        return s < be && e > bs;
      });
      return { label: slot.label, startISO: slot.startISO, available: !isBusy };
    });

    return jsonResponse({ date, slots: result });
  } catch (err) {
    console.error("[availability] error", err);
    return jsonResponse({ error: "Internal server error." }, 500);
  }
};
