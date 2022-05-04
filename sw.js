const CACHE_KEY = 'v1';
const CACHE_STORAGE = [];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(`${CACHE_KEY}`).then( (cache) => {
            return cache.addAll(
                CACHE_STORAGE
            ).then( () => {self.skipWaiting() });
        })
    );
});
    
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then( (response) => {
            if (response) {
                return response;
            }
            return fetch(evt.request).then(  (response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                return response;
            }).catch(e => console.log(e));
        }).catch( e => console.log(e))
    );
});