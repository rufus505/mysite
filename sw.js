const CACHE_NAME = 'mysite-static-v1';
const APP_PREFIX = '/mysite/';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('mysite-static-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_PREFIX)) return;

  // Keep HTML fresh; use the cached copy only when the network is unavailable.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (_) {
        return (await cache.match(request)) || Response.error();
      }
    })());
    return;
  }

  // Return static assets immediately from cache and refresh them in the background.
  if (/\.(?:css|js|png|jpe?g|webp|svg|ico|woff2?)$/i.test(url.pathname)) {
    const cachePromise = caches.open(CACHE_NAME);
    const cachedPromise = cachePromise.then(cache => cache.match(request));
    const refreshPromise = cachePromise.then(cache => fetch(request).then(response => {
      if (response.ok && response.type === 'basic') {
        return cache.put(request, response.clone()).then(() => response);
      }
      return response;
    })).catch(() => null);

    // Extend the service-worker event while the cached asset is refreshed.
    event.waitUntil(refreshPromise.then(() => undefined));
    event.respondWith(cachedPromise.then(cached => cached || refreshPromise).then(response => response || Response.error()));
  }
});
