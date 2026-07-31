# Harshitha Palaram — Portfolio

A portfolio site styled as a VS Code workspace: a file explorer, tabs, an
integrated terminal, a command palette, a keyboard-shortcuts reference, a
multi-theme switcher, a retro pixel cursor, a Chrome-dino-style easter egg
game, and a simulated "Copilot" chat that answers questions about my resume —
all client-side, no backend required.

Built with **React + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a static production
build in `dist/`, deployable to Vercel, Netlify, or GitHub Pages as-is.

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
