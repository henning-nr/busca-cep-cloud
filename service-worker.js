const CACHE_NAME = 'busca-cep-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/materialize.css',
  './css/style.css',
  './js/materialize.js',
  './js/init.js',
  './js/script.js',
  './img/icon-192x192.png',
  './img/icon-512x512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://code.jquery.com/jquery-2.1.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/1.11.0/axios.min.js'
];

// Instalação do Service Worker e Caching dos arquivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar as requisições (Fetch)
self.addEventListener('fetch', event => {
  // Para requisições de API (ViaCEP, IBGE) tentar a rede primeiro
  if (event.request.url.includes('viacep.com.br') || event.request.url.includes('servicodados.ibge.gov.br')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback genérico para a API, poderíamos retornar uma resposta customizada mockada
        return new Response(
          JSON.stringify({ erro: true, mensagem: "Você está offline. Não foi possível realizar a consulta na API." }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para os outros arquivos
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache, mas faz uma requisição para atualizar o cache em background
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });

        // Retorna o que tiver no cache, se não tiver, retorna a promise do fetch
        return response || fetchPromise;
      })
  );
});
