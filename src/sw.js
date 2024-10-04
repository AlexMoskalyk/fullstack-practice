const CACHE_NAME = 'v1';
// const CACHE_URLS = [
//     '/src/index.html',       // Main page
//     '/src/pages/sw-task.html',   // Task page
//     '/src/css/sw-task.css',      // CSS for the page
//     '/src/jsDocsTask/sw-task-app.js',  // JS logic for the page
//     'https://jsonplaceholder.typicode.com/posts?_limit=5' // API data to cache
// ];

// Install the service worker and cache essential files
self.addEventListener('install', event => {
    console.log("Service Worker installed");
    
    // event.waitUntil(
    //     caches.open(CACHE_NAME).then(cache => {
    //         console.log('Opened cache');
    //         return cache.addAll(CACHE_URLS);
    //     })
    // );
    // self.skipWaiting();
});

// Activate the service worker and delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Old cache removed:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: Intercept fetch requests
self.addEventListener('fetch', event => {

    // Check if the request's URL scheme is unsupported (e.g., "chrome-extension")
    if (event.request.url.startsWith('chrome-extension://')) {
        return; // Ignore the request and do nothing
    }
   console.log("Server Worker:Fetching");
   event.respondWith(
    fetch(event.request)
    .then(res =>{
        // make a copy of response
        const resClone = res.clone();
        //Open cache
        caches.open(CACHE_NAME).then(cache=>{
            // Add response to cache
            cache.put(event.request, resClone);
        });
        return res;
    }).catch(err => caches.match(event.request).then(res=>res))
   )
   
});
