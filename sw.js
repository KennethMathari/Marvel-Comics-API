const cacheName = 'marvelCachev1';

const cacheAssets =[
    'app.js',
    'composer.json',
    'index.html',
    'index.php',
    'sw.js'
]


self.addEventListener('install', (ev) => {
    //service worker is installed.
    console.log('Service worker installed');

    ev.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('caching files');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
  });
  self.addEventListener('activate', (ev) => {
    //service worker is activated
    console.log('activated');
  });
  
  self.addEventListener('fetch', (ev) => {
    //service worker intercepted a fetch call
    console.log('intercepted a http request', ev.request);
  });
  
  self.addEventListener('message', (ev) => {
    //message from webpage
  });