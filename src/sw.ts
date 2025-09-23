// Placeholder SW (Workbox pourra être ajouté ultérieurement)
self.addEventListener("install", () => {
  const sw = self as unknown as ServiceWorkerGlobalScope;
  sw.skipWaiting();
});

self.addEventListener("activate", () => {
  const sw = self as unknown as ServiceWorkerGlobalScope;
  sw.clients.claim();
});
