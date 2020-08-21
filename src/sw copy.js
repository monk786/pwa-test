if('worker' in self){
    workbox.precaching.prechacheAndRoute( self.__precacheManifest || []);
}
const cacheName = 'pwa-conf-v1';
const staticAssets = [
    './',
    './index.html',
    './app.js',
    './styles.css'
];
self.addEventListener( 'install', async event => {
    console.log( 'install event test' );
    const cache = await caches.open( cacheName );
    await cache.addAll( staticAssets );
});

self.addEventListener('fetch', async event => {
    console.log('fetch event');
    const req = event.request;
     // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
    
    if(/.*(json)$/.test(req.url)) {
        event.respondWith(networkFrist(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

async function cacheFirst( req ) {
    // console.log('req',req)
 const cache = await caches.open( cacheName );
 const cacheResponse = await caches.match( req );
 return cacheResponse || networkFrist( req );
};

async function networkFrist( req ) {
    const cache = await caches.open( cacheName );
    try{
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    } catch ( e ){
        const cacheResponse = await caches.match( req );
        return cacheResponse;
    }
};