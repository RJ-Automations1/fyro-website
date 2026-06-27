# Deploying the Fyro website to Render

This site is a **Vite + React** front end served by a small **Node/Express**
web service (`server/index.ts`) that also powers the "book a discovery call"
feature on the Contact page. On Render it runs as a single **Web Service**.

- Build command: `corepack enable && pnpm install && pnpm build`
- Start command: `pnpm start`
- Output: `dist/public` (static site) + `dist/index.js` (server)
- Node version: 20+

A `render.yaml` Blueprint is included, so Render can configure everything
automatically.

---

## 1. Deploy from GitHub (auto-deploy)

1. Push this project to GitHub (your assistant set this up).
2. Go to <https://dashboard.render.com> → **New → Blueprint**.
3. Connect your GitHub account and pick the `fyro-website` repo.
4. Render reads `render.yaml` and proposes a **fyro-website** web service —
   click **Apply**.
5. First build takes a few minutes. When it's live you'll get a URL like
   `https://fyro-website.onrender.com`. Every push to the main branch
   redeploys automatically.

> Prefer to set it up by hand instead of the Blueprint? **New → Web Service →**
> connect the repo, then set Build = `corepack enable && pnpm install && pnpm build`,
> Start = `pnpm start`, and add the env vars from section 2.

> Note on the free plan: the service sleeps after inactivity, so the first
> visit after idle can take ~30–60s to wake. Upgrade to a paid instance to keep
> it always on.

---

## 2. Booking feature — Google Calendar setup (required for /contact)

The booking form reads your calendar's free/busy and creates a 15-minute event.
It authenticates with a **Google service account**.

### a. Create the service account
1. Go to <https://console.cloud.google.com> → create (or pick) a project.
2. **APIs & Services → Library** → enable **Google Calendar API**.
3. **APIs & Services → Credentials → Create credentials → Service account**.
4. Open the service account → **Keys → Add key → JSON**. Download it. You need:
   - `client_email`  → `GOOGLE_SA_EMAIL`
   - `private_key`   → `GOOGLE_SA_PRIVATE_KEY`

### b. Share your calendar with the service account
1. In Google Calendar, open your "Fyro Appointments" calendar.
2. **Settings → Share with specific people → Add people** → paste the service
   account's `client_email`. Permission: **Make changes to events**.
3. The existing Fyro calendar ID is:
   `7414ffcb65a68324c1a0b0925008135a4d0de99d98a1e8df572ea6ec2da134a7@group.calendar.google.com`
   (or copy a new one from Settings → Integrate calendar).

### c. Add the env vars in Render
Render dashboard → your service → **Environment** → add:

| Key | Value |
|---|---|
| `GOOGLE_SA_EMAIL` | service account `client_email` |
| `GOOGLE_SA_PRIVATE_KEY` | the full `private_key` (paste with `\n` characters intact) |
| `CALENDAR_ID` | the calendar ID above |
| `ET_OFFSET_HOURS` | `-4` in summer (EDT) / `-5` in winter (EST) |

Save — Render redeploys automatically.

> The site runs fine without these; only the Contact page's live time-slot
> picker needs them.

---

## 3. Replace the placeholder photos

Photos in `client/public/manus-storage/` are gray placeholders (the originals
were stuck on Manus). Drop your real photos in with the **same filenames** —
see `client/public/manus-storage/README-ASSETS.md`. Commit + push; Render
redeploys.

---

## 4. Custom domain (fyroagents.com)

Render service → **Settings → Custom Domains → Add Custom Domain** → enter
`fyroagents.com` and follow the DNS instructions Render gives you (a CNAME or
A record at your domain registrar).

---

## ⚠️ Security note
The original Manus export contained live API keys and a database password in
`.project-config.json` (now deleted). Rotate/regenerate the old **Google
Calendar API key**, **Manus API key**, **JWT secret**, and **database
password** in case the export was shared. The new site uses none of them.

---

## Local development

```bash
pnpm install
pnpm dev       # Vite (port 3000) + Express API (port 3001), hot reload
# or test the real production build locally:
pnpm preview   # builds, then serves on http://localhost:3000
```
