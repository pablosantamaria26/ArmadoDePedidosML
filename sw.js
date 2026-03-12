const CACHE_NAME = 'pedidos-ml-v1';
const archivosParaCachear = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png' //
];

// Instala el Service Worker y guarda los archivos básicos en el celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(archivosParaCachear);
      })
  );
});

// Intercepta las peticiones (Esto es lo que Android exige para considerarlo App Nativa)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
