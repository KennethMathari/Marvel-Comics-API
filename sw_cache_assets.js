const cacheName = 'marvelCachev1';
const api_url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";


self.addEventListener('install', (ev) => {
    //service worker is installed.
    console.log('Service worker installed');

    ev.waitUntil(
        fetch(api_url).then(res => {
           
          return res.json();

          })
          .then(function(data){
            console.log('Marvel Universe Characters:', data);
            caches.open(cacheName).then(cache => {
                cache.put(api_url, new Response(api_url)).then( () => {
                    // console.log(new Response(api_url))
                 });
              })

          })
          .catch(function (error) {
            console.log('Oops! Something went wrong', error);
          })
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

