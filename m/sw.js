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

const CACHE_NAME = 'pa-mobile-shell-v2';
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

  // Network-first, falling back to cache only when the network actually
  // fails — NOT cache-first. Fixed 2026-08-26: the original cache-first
  // version meant the shell only ever refreshed when sw.js's own bytes
  // changed (which triggers install() — see below), and that almost never
  // happened even as index.html itself kept changing, so the phone served
  // one frozen snapshot from the very first install indefinitely, with no
  // way to "refresh" out of it short of deleting and reinstalling the app.
  // This matches what the comment at the top of this file always said the
  // intent was — an offline fallback, not a reason to prefer stale content
  // when the network is right there — the code just didn't do that.
  // Every successful network fetch also re-primes the cache, so the
  // offline fallback stays reasonably current on its own, without needing
  // a new sw.js deploy just to refresh it.
  event.respondWith(
    fetch(event.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
