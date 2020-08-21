if('worker' in self){
    workbox.precaching.prechacheAndRoute( self.__precacheManifest || []);
}