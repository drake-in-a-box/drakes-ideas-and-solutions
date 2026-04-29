import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const repoRoot = path.resolve(import.meta.dirname, '..');

function loadIdeas() {
  const source = fs.readFileSync(path.join(repoRoot, 'assets', 'ideas.js'), 'utf8');
  const context = { window: {} };
  vm.runInNewContext(source, context);
  return context.window.ideasCatalog || [];
}

test('every web-ready project has a live mobile surface', () => {
  const ideas = loadIdeas();
  const webReadyIdeas = ideas.filter((idea) => idea.webReady);

  assert.ok(webReadyIdeas.length > 0);
  for (const idea of webReadyIdeas) {
    assert.equal(typeof idea.liveUrl, 'string', `${idea.slug} is missing liveUrl`);
    assert.ok(idea.liveUrl.length > 0, `${idea.slug} has empty liveUrl`);
  }
});

test('project detail script does not use stale pre-launch web-candidate language', () => {
  const projectScript = fs.readFileSync(path.join(repoRoot, 'assets', 'project.js'), 'utf8');

  assert.doesNotMatch(projectScript, /good web candidate/i);
  assert.doesNotMatch(projectScript, /Web candidate/);
});

test('live page script does not inject unbound duplicate install buttons', () => {
  const liveScript = fs.readFileSync(path.join(repoRoot, 'assets', 'live.js'), 'utf8');

  assert.doesNotMatch(liveScript, /data-install-button/);
});

test('service worker normalizes query-string routes for live and project pages', () => {
  const sw = fs.readFileSync(path.join(repoRoot, 'sw.js'), 'utf8');

  assert.match(sw, /live\.html/);
  assert.match(sw, /project\.html/);
  assert.match(sw, /new URL\(request\.url\)/);
});

test('site documents installable app metadata for phone home-screen entry', () => {
  const htmlFiles = ['index.html', 'project.html', 'dinosaur.html', 'live.html'];

  for (const filename of htmlFiles) {
    const html = fs.readFileSync(path.join(repoRoot, filename), 'utf8');
    assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
    assert.match(html, /rel="apple-touch-icon" href="\.\/assets\/icons\/icon-180\.png"/);
  }

  const manifest = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'manifest.webmanifest'), 'utf8'),
  );

  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons));
  assert.ok(manifest.icons.some((icon) => icon.sizes === '192x192'));
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512'));
});
