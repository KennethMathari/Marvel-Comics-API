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
    console.log('Fetching request', ev.request);
    ev.respondWith(fetch(ev.request)
    .then(res =>{
        //clone response
        const resClone = res.clone();
        //open cache
        caches
        .open(cacheName)
        .then(res=>{
            //add response to cache
            cache.put(ev.request, resClone)
        });
        return res;
    }).catch(err=>caches.match(ev.request).then(res=>res))
    );
    
  });
  