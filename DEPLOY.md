# Deploying the Fyro website to Cloudflare Pages

This site is a **Vite + React** front end with a small **Cloudflare Pages
Functions** backend (`functions/api/*`) that powers the "book a discovery call"
feature on the Contact page.

- Build command: `pnpm build`
- Build output directory: `dist/public`
- Functions directory: `functions/` (auto-detected by Cloudflare)
- Node version: 20 or newer

---

## 1. Connect the GitHub repo to Cloudflare Pages (auto-deploy)

1. Push this project to GitHub (see the project README / the steps your
   assistant gave you).
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages →
   Connect to Git**.
3. Pick the `fyro-website` repository.
4. Set the build settings:
   - **Framework preset:** None / Vite
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist/public`
5. Click **Save and Deploy**. Every push to the main branch now redeploys.

---

## 2. Booking feature — Google Calendar setup (required for /contact)

The booking form reads your calendar's free/busy and creates a 15-minute event.
It authenticates with a **Google service account**.

### a. Create the service account
1. Go to <https://console.cloud.google.com> → create (or pick) a project.
2. **APIs & Services → Library** → enable **Google Calendar API**.
3. **APIs & Services → Credentials → Create credentials → Service account**.
4. After creating it, open the service account → **Keys → Add key → JSON**.
   Download the JSON file. You'll need two values from it:
   - `client_email`  → this is `GOOGLE_SA_EMAIL`
   - `private_key`   → this is `GOOGLE_SA_PRIVATE_KEY`

### b. Share your calendar with the service account
1. In Google Calendar, find the calendar you want bookings on
   (your "Fyro Appointments" calendar).
2. **Settings → Share with specific people → Add people** → paste the service
   account's `client_email`.
3. Permission: **Make changes to events**.
4. Copy the calendar's **Calendar ID** (Settings → Integrate calendar).
   The existing Fyro calendar ID is:
   `7414ffcb65a68324c1a0b0925008135a4d0de99d98a1e8df572ea6ec2da134a7@group.calendar.google.com`

### c. Add the secrets in Cloudflare Pages
Cloudflare dashboard → your Pages project → **Settings → Environment variables
→ Production** (add the same to Preview if you want previews to work). Add:

| Name | Value |
|---|---|
| `GOOGLE_SA_EMAIL` | the service account `client_email` |
| `GOOGLE_SA_PRIVATE_KEY` | the full `private_key` (keep the `\n` characters as-is) |
| `CALENDAR_ID` | the calendar ID above |
| `ET_OFFSET_HOURS` | `-4` in summer (EDT), `-5` in winter (EST) — optional |

Mark `GOOGLE_SA_PRIVATE_KEY` as **encrypted/secret**. Redeploy after saving.

> If you'd rather not set this up, the rest of the site works without it — only
> the Contact page's live time-slot picker needs these variables.

---

## 3. Replace the placeholder photos

The photos in `client/public/manus-storage/` are gray placeholders (the
originals were stuck on Manus). Drop your real photos in with the **same
filenames** — see `client/public/manus-storage/README-ASSETS.md`. Commit and
push; Cloudflare redeploys automatically.

---

## 4. Custom domain (fyroagents.com)

In the Pages project → **Custom domains → Set up a domain** → enter
`fyroagents.com`. If the domain's DNS is already on Cloudflare, it's one click.
Otherwise follow the prompts to point DNS at Cloudflare.

---

## ⚠️ Security note
The original Manus export contained live API keys and a database password in
`.project-config.json` (now deleted). You should rotate/regenerate the old
**Google Calendar API key**, **Manus API key**, **JWT secret**, and **database
password** in case the export was shared. The new site does not use any of them.

---

## Local development

```bash
pnpm install
pnpm build          # production build into dist/public
pnpm preview        # serve the built site + functions locally (wrangler)
# or, front-end only with hot reload:
pnpm dev
```
