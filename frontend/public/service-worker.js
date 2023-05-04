/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'booksitout-cache-v4'

const urlsToCache = [
    '/',
    '/index.html',
    './manifest.json',
    '/src/resources'
]

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)))
})