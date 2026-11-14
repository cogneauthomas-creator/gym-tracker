// Cache simple : l'appli s'ouvre même sans réseau à la salle.
const CACHE = "gym-tracker-v8";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "img/m-chest.png", "img/m-shoulders.png", "img/m-back.png", "img/m-biceps.png", "img/m-triceps.png", "img/m-forearms.png", "img/m-abs.png", "img/m-quads.png", "img/m-hams.png", "img/m-calves.png", "img/d-push.png", "img/d-pull.png", "img/d-legs.png", "img/d-arms.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
// Réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
