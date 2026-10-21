# MotionCraft AI 🎬

Transform your images into stunning animated clips. A React + Vite single-page app inspired by
image-to-video AI tools: pick a style, choose a motion preset, and generate looping clips from
still images — running entirely in the browser (demo mode, no backend, images never leave your device).

**Live:** https://chowdory.github.io/motioncraft-ai/

## Pages

| Page | What it does |
|---|---|
| **Landing** | Hero, features, how-it-works, pricing, FAQ |
| **Generator** | Drag-and-drop image upload, 4 styles (Cinematic / Anime / UGC / Neon), 7 motion presets, duration & aspect controls, credit system, animated render progress |
| **Library** | Saved clips grid with live motion playback, style filters, fullscreen modal, delete |
| **Dashboard** | Usage stats, clips-by-style breakdown, recent activity table |
| **Profile** | Identity, plan, demo credit refill, default generator preferences |
| **Admin** | Workspace stats and demo users table |
| **Thank You** | Post-upgrade page |

## How the "generation" works

This is an honest demo: instead of calling a video model, the app animates the uploaded still
image with CSS motion presets (Ken Burns, zoom, pan, orbit, parallax) scaled to the chosen
duration. The clip is stored as `data URL + settings` in localStorage — so the whole product
works offline with zero infrastructure.

Swapping in a real backend later means replacing the `setTimeout` in
`src/pages/Generator.jsx` with your API call and storing clips server-side.

## Tech

React 19 · React Router 7 · Vite · plain CSS design system · zero runtime dependencies beyond React

## Develop

```bash
npm install
npm run dev          # local dev server
VITE_BASE=/motioncraft-ai/ npm run build   # production build for GitHub Pages
```

Deploy is automated: pushing to `main` triggers the Pages workflow (build → deploy → live).

## License

MIT
