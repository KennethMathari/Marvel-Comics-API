const cacheName = 'marvelCachev2';


self.addEventListener('install', (ev) => {
    //service worker is installed.
    console.log('Service worker installed');
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