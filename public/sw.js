// CESS UofK Service Worker
//
// IMPORTANT: This worker intentionally NEVER caches page navigations,
// HTML, or RSC payloads. Next.js renames its JS chunks on every deploy
// (content-hashed filenames). A service worker that caches page HTML
// will keep serving old HTML that references JS chunks which no longer
// exist on the server after a redeploy -> the browser 404s fetching
// them -> the app throws a ChunkLoadError and crashes. That was the
// cause of the crashes on repeat visits, especially on phones that
// don't get hard-refreshed.
//
// This version only cache-firsts genuinely immutable, content-hashed
// assets (Next's /_next/static/* build output, images, fonts). Those
// are safe to cache forever because a changed file always gets a new
// filename. Everything else (pages, RSC data, API calls) always goes
// to the network.

const CACHE_NAME = 'cess-static-cache-v3';
const STATIC_FILE_PATTERN = /\.(?:png|jpg|jpeg|svg|webp|ico|woff2|woff)$/;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept page navigations, RSC data requests, or API routes.
  // These must always hit the network so users get the current build.
  if (
    request.mode === 'navigate' ||
    url.searchParams.has('_rsc') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('webpack-hmr')
  ) {
    return;
  }

  const isImmutableAsset =
    url.pathname.startsWith('/_next/static/') || STATIC_FILE_PATTERN.test(url.pathname);

  if (!isImmutableAsset) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        // If network fails and nothing is cached, throw to let the browser handle the offline state
        throw err;
      }
    })
  );
});
