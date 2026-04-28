# Drake's Ideas and Solutions

A futuristic static landing page for Drake's current ideas, tools, and buildable solutions.

## What it is

- dark premium landing page
- responsive tile grid
- modal details for each idea
- GitHub Pages friendly
- easy to expand by editing `assets/ideas.js`

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
