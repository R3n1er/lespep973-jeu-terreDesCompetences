import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
});

self.addEventListener("activate", () => {
  clientsClaim();
});

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "pages",
    networkTimeoutSeconds: 3,
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    matchOptions: { ignoreSearch: true },
  })
);
