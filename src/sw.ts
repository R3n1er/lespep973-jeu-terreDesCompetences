// Placeholder SW (Workbox pourra être ajouté ultérieurement)
self.addEventListener('install', () => {
  // @ts-ignore
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  // @ts-ignore
  self.clients.claim()
})

