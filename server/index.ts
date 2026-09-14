import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { generateSlotTimes, getAccessToken, type GoogleEnv } from "./google.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env as GoogleEnv;
const CAL_SCOPE = "https://www.googleapis.com/auth/calendar";

function offsetHours(): number {
  return env.ET_OFFSET_HOURS ? Number(env.ET_OFFSET_HOURS) : -4;
}

function calendarConfigured(): boolean {
  return Boolean(env.GOOGLE_SA_EMAIL && env.GOOGLE_SA_PRIVATE_KEY && env.CALENDAR_ID);
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const server = createServer(app);

  // ── Availability ──────────────────────────────────────────────────────────
  app.get("/api/availability", async (req, res) => {
    const { date } = req.query as { date?: string };
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: "Invalid date. Use YYYY-MM-DD format." });
      return;
    }
    if (!calendarConfigured()) {
      res.status(500).json({ error: "Calendar not configured." });
      return;
    }

    const slots = generateSlotTimes(date, offsetHours());
    if (slots.length === 0) {
      res.json({ date, slots: [] });
      return;
    }
    const timeMin = slots[0].startISO;
    const timeMax = slots[slots.length - 1].endISO;

    try {
      const token = await getAccessToken(env, CAL_SCOPE);
      const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ timeMin, timeMax, items: [{ id: env.CALENDAR_ID }] }),
      });
      if (!gcalRes.ok) {
        console.error("[availability] Calendar API error", await gcalRes.text());
        res.status(502).json({ error: "Calendar API error." });
        return;
      }
      const gcalData = (await gcalRes.json()) as {
        calendars: Record<string, { busy: { start: string; end: string }[] }>;
      };
      const busy = gcalData.calendars[env.CALENDAR_ID!]?.busy ?? [];
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
      res.json({ date, slots: result });
    } catch (err) {
      console.error("[availability] error", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // ── Booking ───────────────────────────────────────────────────────────────
  app.post("/api/book", async (req, res) => {
    const { name, email, phone, company, industry, companySize, slotStartISO, slotLabel, slotDate } =
      req.body as Record<string, string | undefined>;

    if (!name || !email || !slotStartISO) {
      res.status(400).json({ error: "Missing required fields: name, email, slotStartISO" });
      return;
    }
    if (!calendarConfigured()) {
      res.status(500).json({ error: "Calendar not configured." });
      return;
    }

    const startMs = new Date(slotStartISO).getTime();
    if (Number.isNaN(startMs)) {
      res.status(400).json({ error: "Invalid slotStartISO." });
      return;
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

    const event: Record<string, unknown> = {
      summary,
      description,
      start: { dateTime: slotStartISO },
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
      let result = await insert(true);
      if (!result.ok) {
        const errText = await result.text();
        if (errText.includes("attendee") || result.status === 403) {
          result = await insert(false);
        } else {
          console.error("[book] insert error", result.status, errText);
          res.status(502).json({ error: "Could not create the booking. Please try again." });
          return;
        }
      }
      if (!result.ok) {
        console.error("[book] insert error (retry)", result.status, await result.text());
        res.status(502).json({ error: "Could not create the booking. Please try again." });
        return;
      }

      res.json({
        success: true,
        message: "Booking confirmed. You'll receive a calendar invite shortly.",
      });
    } catch (err) {
      console.error("[book] error", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });

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
