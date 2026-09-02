# akosigiyan — Portfolio

Personal portfolio of **Gianssen G. Jasolin** — AI / Full-Stack Developer & BSIT student based in Metro Manila, Philippines.

Live: [akosigiyan.vercel.app](https://akosigiyan.vercel.app)

## Tech Stack

- **React 19** — UI library
- **Vite 7** — build tool & dev server
- **Tailwind CSS 4** — styling (via `@tailwindcss/vite`)
- **Framer Motion** — scroll-reveal animations
- **React Router 7** — client-side routing (`/`, `/resume`)
- **Gemini API** — powers the "Giyan AI" chatbot via a serverless proxy

## Project Structure

```
├── api/
│   └── chat.js              # Vercel serverless function: POST /api/chat → Gemini
├── public/                  # Static assets (profile, projects, certifications, gallery)
├── src/
│   ├── components/
│   │   ├── chatbot/         # Floating AI chat widget
│   │   ├── sections/        # Bento-grid page sections (Hero, About, Projects, ...)
│   │   └── ui/              # Shared primitives (BentoCard, Toast, ImageModal, ...)
│   ├── context/             # ThemeContext (dark mode)
│   ├── data/                # portfolioData.js — all content in one place
│   └── pages/               # HomePage, ResumePage
└── vercel.json              # SPA fallback rewrite
```

## Getting Started

```bash
npm install

# Create .env (server-side only — used by api/chat.js)
cp .env.example .env
# then paste your key from https://aistudio.google.com/apikey

npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

> The chatbot works without an API key — it replies with a friendly "not configured" message instead.

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add `GEMINI_API_KEY` in **Project Settings → Environment Variables**.
3. Deploy — `api/chat.js` is picked up automatically as `/api/chat`.

## Features

- Floating glass **navbar** with scroll-spy active indicator, hide-on-scroll, and animated mobile menu
- Light/dark theme with system-preference detection and no flash-on-load
- Interactive bento grid with spotlight hover effects, 3D tilt cards, and magnetic buttons
- ReactBits-style touches: click spark bursts, split-text hero name, animated gradient text
- Drifting aurora background behind the hero
- Masonry photo album with staggered reveals and a keyboard-navigable lightbox
- Emulated terminal (`help`, `about`, `projects`, ...) with command history
- Printable resume page with dedicated print stylesheet
- AI chatbot with multi-turn conversation memory, localStorage persistence, markdown rendering, and XSS-safe output
- Fully responsive, reduced-motion aware, keyboard accessible
