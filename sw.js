const CACHE_NAME = 'drake-hub-v3';
const ASSETS = [
  './',
  './index.html',
  './project.html',
  './live.html',
  './dinosaur.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/app.js',
  './assets/project.js',
  './assets/live.js',
  './assets/site.js',
  './assets/ideas.js',
  './assets/dinosaur.js',
  './assets/dinosaur-state.js',
  './assets/icons/icon-180.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon.svg',
  './assets/dino-claw-cursor.svg',
  './assets/custom/family-sun.jpg',
  './assets/custom/family-cold.jpg',
  './assets/custom/family-rain.jpg',
  './assets/custom/fish-redfish.jpg',
  './assets/custom/fish-trout.jpg',
  './assets/custom/fish-flounder.jpg'
];

function normalizeRequest(request) {
  const url = new URL(request.url);
  if (url.pathname.endsWith('/live.html')) {
    return new Request('./live.html', { method: 'GET' });
  }
  if (url.pathname.endsWith('/project.html')) {
    return new Request('./project.html', { method: 'GET' });
  }
  return request;
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const normalizedRequest = normalizeRequest(event.request);

  event.respondWith(
    caches.match(normalizedRequest).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(normalizedRequest, clone));
          return response;
        })
        .catch(() => caches.match(normalizedRequest).then((cachedResponse) => cachedResponse || caches.match('./index.html')));
    }),
  );
});
