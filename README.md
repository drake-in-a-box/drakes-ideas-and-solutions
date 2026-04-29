# Drake's Ideas and Solutions

A futuristic static landing page for Drake's current ideas, tools, and buildable solutions.

## What it is

- dark premium landing page
- responsive tile grid
- project detail pages
- live Dinosaur family dashboard surface
- mobile live launch pages for the other web-ready projects
- installable phone-friendly PWA shell with Add-to-Home-Screen support
- GitHub Pages friendly
- easy to expand by editing `assets/ideas.js`

## Phone app access

This site now includes a web app manifest, service worker, and home-screen icons.

That means:
- **Android:** tap **Install app** or use the browser menu → **Install app**
- **iPhone:** Safari → **Share** → **Add to Home Screen**

Once installed, you get a real tappable app icon on your phone for the hub.

## Live mobile project surfaces

Every `webReady` project now has a real phone-safe live surface:
- Dinosaur opens its dedicated `dinosaur.html` experience
- the other web-ready ideas open `live.html?idea=<slug>` mobile launch pages
- each still keeps the deeper `project.html?idea=<slug>` brief

These pages are intentionally honest: they are live mobile launch surfaces, not fake backend demos.

## Dinosaur live surface

`dinosaur.html` is now a responsive **TV-model port** instead of a generic phone page.

It now reuses the same visual language as the real local Dinosaur board:
- wallpaper-stage family art
- museum-glass cards
- top quote / Spanish / calendar band
- weather + fishing left rail
- fish activity + property-watch right rail
- three family note cards along the bottom
- local property-watch modal and note persistence via `localStorage`

The state is still intentionally browser-local, which keeps the public site safe: no backend, no auth, no database, no secrets.

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
