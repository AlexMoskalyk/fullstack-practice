const CACHE_NAME = 'network-status-cache-v1';
const urlsToCache = [
    '../index.html',    // Головна сторінка
    '../pages/sw-task.html',   // Сторінка завдання
    '../css/sw-task.css',      // СSS для сторінки завдання
    './sw-task-app.js'  // JS-логіка для сторінки
];

// Install the service worker and cache the essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate the service worker and delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Old cache removed:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercept fetch requests and serve cached files if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached file or make a network request
                return response || fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            }).catch(() => caches.match('./sw-task.html'))  // Показуємо сторінку завдання, якщо немає інтернету
    );
});
