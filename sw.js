const CACHE_NAME = "v1_cache_degradados_app_vue"
const urlsToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./pages/fallback.html",
    "./img/favicon.png",
    "./img/icono16.png",
    "./img/icono32.png",
    "./img/icono64.png",
    "./img/icono128.png",
    "./img/icono192.png",
    "./img/maskable.png",
    "./img/icono256.png",
    "./img/icono512.png",
    "./img/icono1024.png",
    "./js/main.js",
    "./js/mountApp.js",
    "https://unpkg.com/vue@next",
    "./css/style.css",
    "./pages/css/style.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap",
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhiteList.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if (res) {
                    return res
                }
                return fetch(e.request)
            }).catch(
            () => caches.match("./pages/fallback.html")
        )
    )
})