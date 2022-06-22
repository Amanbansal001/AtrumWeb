workbox.skipWaiting();
workbox.clientsClaim();
workbox.routing.registerRoute(
    new RegExp("/login"),
    workbox.strategies.NetworkFirst()
);
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])