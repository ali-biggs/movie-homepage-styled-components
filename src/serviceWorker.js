const CACHE_NAME = "tmbd-api-cache";
const urlsToCache = [
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/genre/movie/list?language=$en`,
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/configuration/languages`,
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/popular`,
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/discover/movie`,
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/search/movie?query=example&include_adult=false&language=en-US&page=1`,
  `${process.env.REACT_APP_TMDB_PUBLIC_URL}/movie/123`,
  "/css/App.css",
  "/images/arrow-icon.png",
  "/images/filter-icon.png",
  "/images/search-icon-white.png",
  "/images/search-icon-yellow.png",
  "/images/year-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Register the service worker
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}

// Unregister the service worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
