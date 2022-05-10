const cacheName = "my-pwa-sandbox2-v3";
const isLocal = location.hostname === "localhost";
const prefix = isLocal ? "/" : "/my-pwa-sandbox2/";

function toResource(path) {
  return `${prefix}${path}`;
}

self.addEventListener("install", async (event) => {
  console.log("===========Service worker installed===========", event);

  const resources = [
    ``,
    `icon-192x192.png`,
    `icon-256x256.png`,
    `icon-384x384.png`,
    `icon-512x512.png`,
    `index.html`,
    `manifest.json`,
    `script.js`,
  ].map(toResource);

  console.log("resources", resources);

  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(resources);
    })()
  );
});

self.addEventListener("activate", async (event) => {
  console.log("===========Service worker activated===========", event);

  event.waitUntil(
    (async () => {
      //ここには今キャッシュにあるやつのkeyList
      //つまり古いやつ？
      const keyList = await caches.keys();
      console.log("keyList", keyList);
      const promises = keyList
        .filter((key) => {
          if (!key.startsWith("my-pwa-sandbox2")) {
            console.log(key);
            return false;
          }

          return cacheName !== key;
        })
        .map((key) => caches.delete(key));

      return Promise.all(promises);
    })()
  );
});

self.addEventListener("fetch", async (event) => {
  event.respondWith(
    (async () => {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    })()
  );
});

self.addEventListener("message", (event) => {
  console.log("message", event);
  const data = event.data;
  if (data.type === "fireSkipWaiting") {
    self.skipWaiting();
  }
});
