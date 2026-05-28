const VERSION = 'v2'
const PRECACHE = `lucienne-precache-${VERSION}`
const RUNTIME = `lucienne-runtime-${VERSION}`
const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE && key !== RUNTIME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

const putInCache = async (request, response) => {
  if (!response || !response.ok || response.type === 'opaque') return
  const cache = await caches.open(RUNTIME)
  await cache.put(request, response.clone()).catch(() => {})
}

// HTML navigations: fresh content when online, cached shell / offline page when not.
const networkFirst = async (request) => {
  try {
    const response = await fetch(request)
    await putInCache(request, response)
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    const shell = await caches.match('/')
    if (shell) return shell
    return caches.match(OFFLINE_URL)
  }
}

// Immutable, content-hashed assets: serve from cache, fetch once.
const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    await putInCache(request, response)
    return response
  } catch {
    return cached || Response.error()
  }
}

// Images / other assets: serve cache instantly, refresh in background.
const staleWhileRevalidate = async (request) => {
  const cached = await caches.match(request)
  const network = fetch(request)
    .then((response) => {
      putInCache(request, response)
      return response
    })
    .catch(() => cached)
  return cached || network
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  const sameOrigin = url.origin === self.location.origin
  const isUnsplash = url.hostname.endsWith('unsplash.com')
  if (!sameOrigin && !isUnsplash) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }

  if (sameOrigin && url.pathname.startsWith('/_next/static')) {
    event.respondWith(cacheFirst(request))
    return
  }

  if (request.destination === 'image' || isUnsplash) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  event.respondWith(staleWhileRevalidate(request))
})
