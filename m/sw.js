// Service worker for the PA mobile snapshot viewer.
//
// Scope is deliberately narrow: cache-first for the same-origin app shell
// only (this page, manifest, icons). Yahoo/CORS-proxy requests are
// cross-origin and always go straight to the network — we never want a
// stale cached price masquerading as a live one. The app's own
// localStorage-based LIVE_CACHE_KEY (see index.html) is what actually
// provides the "last known live price" offline fallback; this service
// worker's only job is making sure the page itself still loads with no
// signal at all.

const CACHE_NAME = 'pa-mobile-shell-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return; // let cross-origin (Yahoo/proxy) requests pass through untouched

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
