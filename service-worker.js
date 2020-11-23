importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){
    console.log("Workbox berhasil dimuat");
} else {
    console.log("Workbox gagal dimuat");
}

workbox.precaching.precacheAndRoute([
    {
        url: "/",
        revision: '1'
    },
    {
        url: "/index.html",
        revision: '1'
    },
    {
        url: "/team.html",
        revision: '1'
    },
    {
        url: "/pages/standings.html",
        revision: '1'
    },
    {
        url: "/pages/favorite.html",
        revision: '1'
    },
    {
        url: "/css/materialize.min.css",
        revision: '1'
    },
    {
        url: "/css/custom.css",
        revision: '1'
    },
    {
        url: "/css/myCss.css",
        revision: '1'
    },
    {
        url: "/css/vendors/pace-theme-center-atom.css",
        revision: '1'
    },
    {
        url: "/js/api.js",
        revision: '1'
    },
    {
        url: "/js/app.js",
        revision: '1'
    },
    {
        url: "/js/db.js",
        revision: '1'
    },
    {
        url: "/js/init-index.js",
        revision: '1'
    },
    {
        url: "/js/init-team.js",
        revision: '1'
    },
    {
        url: "/js/jquery.min.js",
        revision: '1'
    },
    {
        url: "/js/materialize.min.js",
        revision: '1'
    },
    {
        url: "/js/nav.js",
        revision: '1'
    },
    {
        url: "/js/vendors/idb.js",
        revision: '1'
    },
    {
        url: "/js/vendors/pace.min.js",
        revision: '1'
    },
    {
        url: "/json/nav.json",
        revision: '1'
    },
    {
        url: "/img/logo/logo.png",
        revision: '1'
    },
    {
        url: "/img/icon.png",
        revision: '1'
    },
    {
        url: "/favicon.png",
        revision: '1'
    },
    {
        url: "/maskable-icon-192px.png",
        revision: '1'
    },
    {
        url: "/maskable-icon-512px.png",
        revision: '1'
    },
    {
        url: "/manifest.json",
        revision: '1'
    },
]);


workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/json/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'json'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins : [
            new workbox.expiration.Plugin({
                maxEntrie: 60,
                maxAgeSeconds: 30 * 24 * 60 *60, // 30 Hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('team.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('https://crests.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-styles',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
                maxEntries: 30,
            }),
        ],
    })
);

self.addEventListener('push', event => {
    let body = 'Push message';
    if (event.data) {
        body = event.data.text();
    }

    let options = {
        body: body,
        icon: '/img/icon.png',
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Bundesliga', options)
    );
});