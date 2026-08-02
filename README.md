# Harshitha Palaram — Portfolio

A portfolio site styled as a VS Code workspace: a file explorer, tabs, an
integrated terminal, a command palette, a keyboard-shortcuts reference, a
multi-theme switcher, a retro pixel cursor, a Chrome-dino-style easter egg
game, and a "Copilot" chat backed by the Gemini API that answers questions
about my resume.

Built with **React + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a static production
build in `dist/`.

The Copilot chat (`api/copilot.ts`) is a Vercel Edge Function, so the site
needs to be deployed on **Vercel** to keep that feature working — a plain
static host (GitHub Pages, etc.) will serve the rest of the site fine, but
`/api/copilot` will 404 and the chat silently falls back to canned,
keyword-matched answers (`src/components/copilot/responseEngine.ts`).

## Copilot chat (Gemini API)

The Copilot panel calls `POST /api/copilot`, a serverless function that
injects `src/data/resume.ts` into the system prompt and forwards the
conversation to Gemini (`gemini-flash-latest`). The API key never reaches
the browser.

1. Get a free API key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Locally: copy `.env.example` to `.env` and set `GEMINI_API_KEY`, then
   run `vercel dev` (plain `vite dev` won't serve `/api/*`).
3. In production: add `GEMINI_API_KEY` under the project's Environment
   Variables in the Vercel dashboard, not in a committed file.

Gemini's free tier is rate-limited per project (not unlimited), and the
endpoint has no server-side rate limiting beyond the client's local
per-visitor message cap (`BASE_FREE_MESSAGES` in `CopilotPanel.tsx`) — worth
keeping an eye on usage in [AI Studio](https://aistudio.google.com) if the
site gets real traffic.

## Contact form (Formspree)

The `contact.tsx` file's message form posts to
[Formspree](https://formspree.io). To wire it up:

1. Create a free form at formspree.io and copy its form ID (the part after
   `/f/` in the endpoint it gives you).
2. Copy `.env.example` to `.env` and set `VITE_FORMSPREE_ID` to that ID.
3. Restart the dev server (or redeploy) so Vite picks up the new env var.

Until it's set, the form shows a friendly notice and messages aren't sent.

## Content

All resume content (education, experience, projects, skills, achievements,
certifications, contact info) lives in one place: `src/data/resume.ts`. Edit
that file to update anything shown on the site — every section reads from it.

The résumé PDF served by the "Download Resume" buttons lives at
`public/resume.pdf`; replace it to update what gets downloaded.

## Key shortcuts

`Ctrl/Cmd+P` command palette · `Ctrl/Cmd+B` toggle sidebar ·
`` Ctrl/Cmd+` `` toggle terminal · `Ctrl/Cmd+Shift+C` toggle Copilot ·
`F5` play the dino game · `?` keyboard shortcuts reference.
