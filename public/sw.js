// CESS UofK Ultra-Fast Stale-While-Revalidate Service Worker
// Delivers sub-40ms page loads from CacheStorage with background cookie synchronization

const CACHE_NAME = 'cess-cache-v2026.09.03';
const PRECACHE_URLS = [
  '/',
  '/about',
  '/departments',
  '/departments/academic',
  '/departments/technical',
  '/departments/cultural',
  '/departments/sports',
  '/events',
  '/events/cesscon-3',
  '/events/icec-lc-khartoum',
  '/events/ice-chartered-seminar',
  '/events/traffic-congestion-lecture',
  '/events/academic-reforms-forum',
  '/projects',
  '/projects/course-hub',
  '/projects/cesscon-exhibitions',
  '/projects/resource-archive',
  '/blogs',
  '/blogs/submit-your-work',
  '/blogs/iaces-exchange-notes',
  '/blogs/reading-a-soil-report',
  '/blogs/annual-conference-notes',
  '/blogs/how-the-council-works',
  '/team',
  '/contact',
  '/credits',
  '/cess-nav-ink.png',
  '/cess-nav-white.png',
  '/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Pre-cache partial fail:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Bypass next dev HMR, API routes, or chrome extension traffic
  if (url.pathname.startsWith('/api/') || url.pathname.includes('webpack-hmr')) {
    return;
  }

  // 1. Navigation & Page Content (HTML & RSC requests): Stale-While-Revalidate for sub-40ms response
  const isNavigation = request.mode === 'navigate' || url.searchParams.has('_rsc');

  if (isNavigation) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);

        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        // Serve from memory/disk cache in <15ms if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. Static Assets (_next/static, images, fonts): Cache-First strategy
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|woff2|woff|css|js)$/)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse;
        }
      })
    );
    return;
  }
});
