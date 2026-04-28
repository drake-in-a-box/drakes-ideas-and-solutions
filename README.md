# Drake's Ideas and Solutions

A futuristic static landing page for Drake's current ideas, tools, and buildable solutions.

## What it is

- dark premium landing page
- responsive tile grid
- project detail pages
- live Dinosaur family dashboard surface
- GitHub Pages friendly
- easy to expand by editing `assets/ideas.js`

## Dinosaur live surface

`dinosaur.html` now behaves like a real daily-use phone surface instead of a static mock card.

It includes:
- saved dinner plan controls
- saved family note + focus mode
- persisted bedtime/checklist progress
- Spanish word rotation
- locally persisted beach-watch settings summary

The state is intentionally browser-local via `localStorage`, which keeps the public site safe: no backend, no auth, no database, no secrets.

## Local preview

```bash
cd /home/fabric-02-rabot/Desktop/drakes-ideas-and-solutions
python3 -m http.server 8017
```

Then open <http://127.0.0.1:8017>.

## Update idea tiles

Edit `assets/ideas.js` and add another object to `window.ideasCatalog`.

## Deploy

This repo is designed for GitHub Pages. Pushing `index.html` and `assets/` is enough for deployment.
