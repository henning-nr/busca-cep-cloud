const CACHE_NAME = "busca-cep-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker ativo");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});