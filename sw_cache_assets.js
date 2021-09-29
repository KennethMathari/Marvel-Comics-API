const cacheName = 'marvelCachev1';

const cacheAssets =[
    'app.js',
    'composer.json',
    'index.html',
    'index.php',
    'sw_cache_assets.js',
    'sw_cache_site.js'
]


self.addEventListener('install', (ev) => {
    //service worker is installed.
    console.log('Service worker installed');

    ev.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('caching files');
            //add files to cache
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
  });

  self.addEventListener('activate', (ev) => {
    //service worker is activated
    console.log('service worker activated');
    //remove unwanted caches
    ev.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache != cacheName){
                        console.log('old cache cleared');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
  });
  
  self.addEventListener('fetch', (ev) => {
    //service worker intercepted a fetch call
    console.log('intercepted a http request', ev.request);
    ev.respondWith(fetch(ev.request).catch(()=>caches.match(ev.request)));
    
  });
  
  self.addEventListener('message', (ev) => {
    //message from webpage
  });