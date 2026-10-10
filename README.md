# Esandu Obadaarachchi, portfolio v2

React + Vite. Motion for scroll and UI animation, Lenis for smooth scroll, Three.js (react-three-fiber) for the award model. Static site, no backend.

The design rationale (palette, type, the hero "doors", the agent-loop concept) is in [DESIGN.md](DESIGN.md).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve the build locally
```

## Where to edit

| What | Where |
|---|---|
| All copy: projects, awards, experience, stack, loop steps | `src/data.js` |
| Section layout and behaviour | `src/components/<Section>.jsx` and its `.css` |
| Colours, fonts, easing tokens | `src/styles/global.css` (`:root`) |
| Project diagrams | `src/components/diagrams/index.jsx` |
| The 3D award | `src/components/Trophy.jsx` |
| CV download | `public/Esandu_Obadaarachchi_CV.pdf` |

## Photos

Source photos live one folder up. `node scripts/images.mjs` converts them to WebP in `public/img/` at the size they display. It also crops the certificate numbers off the certificates and the phone watermark off the team photo. Run it again after you swap a photo.

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist/`. The social card is `public/og-card.png` (1200x630). `index.html` points `og:image` at `https://esandu-works.netlify.app/og-card.png`, so change that if the domain changes.
