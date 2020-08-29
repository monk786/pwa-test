if ('workbox' in self) {
    console.log('workbox found')
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  }