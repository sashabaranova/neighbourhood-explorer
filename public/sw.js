let appCacheName = 'nbrhd-explorer-v1';

self.addEventListener('install', event => {

  event.waitUntil(
    caches.open(appCacheName).then(cache => {
      return cache.addAll([
        '/',
        './App.js',
        './App.css',
        './CustomMarker.js',
        './index.css',
        './index.js',
        './Infobox.js',
        './ListLocations.js',
        './MapDisplay.js',
        './Marker.js',
        'public/index.html',
        'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
        'https://fonts.googleapis.com/css?family=Righteous|Open+Sans:400,700'
      ]);
    })
  );
});

// courtesy to Google Web Fundamentals https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', event => {
  // console.log(event);
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log(response);
      // if the response in found in the cache
      if (response) {
        return response;
      }
      // if the response is not in the cache
      // Cloning the response to use it more than once
      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
        if(!response) {
          return response;
        }
        // storing the responses in an array of responses
        let cachedResponses = [];
        cachedResponses.push(response.clone());

        caches.open(appCacheName).then(cache => {
          cache.put(event.request, cachedResponses);
        });
        return response;
      });
    })
  );
});