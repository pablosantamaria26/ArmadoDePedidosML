// 1. CAMBIAMOS LA VERSIÓN A V2 (Esto le avisa al celular que hay código nuevo)
const CACHE_NAME = 'pedidos-ml-v2'; 
const archivosParaCachear = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

self.addEventListener('install', event => {
  // 2. OBLIGA AL CELULAR A ACTUALIZAR YA MISMO, SIN ESPERAR
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(archivosParaCachear);
      })
  );
});

self.addEventListener('activate', event => {
  // 3. BORRA LA VERSIÓN VIEJA (V1) PARA QUE NO QUEDEN RESTOS
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Primero busca en internet (para tener siempre lo último) y si no hay internet, usa el caché
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
