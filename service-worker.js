const CACHE_VERSION = "687-japan-v1855";
const APP_URL = "/";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.startsWith("687-japan-") && k !== CACHE_VERSION).map(k => caches.delete(k)));
    } catch (_) {}
    await self.clients.claim();
  })());
});

self.addEventListener("push", event => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (_) {
    payload = { body: event.data ? event.data.text() : "" };
  }

  const title = payload.title || "687 Trip Guardian";
  const target = ["today","now","prevent","guardian","signals","rescue"].includes(String(payload.target || "").toLowerCase())
    ? String(payload.target).toLowerCase()
    : "guardian";
  const options = {
    body: payload.body || "An important change may affect your day.",
    tag: payload.tag || "687-guardian",
    renotify: !!payload.renotify,
    icon: payload.icon || "/favicon.png",
    badge: payload.badge || "/favicon.png",
    data: {
      url: payload.url || `/?guardian=${encodeURIComponent(target)}`,
      target
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = String(event.notification?.data?.target || "guardian").toLowerCase();
  const desiredUrl = event.notification?.data?.url || `/?guardian=${encodeURIComponent(target)}`;

  event.waitUntil((async () => {
    const windowClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    for (const client of windowClients) {
      try {
        const u = new URL(client.url);
        if (u.origin === self.location.origin) {
          await client.focus();
          client.postMessage({ type: "687-guardian-open", target });
          return;
        }
      } catch (_) {}
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow(desiredUrl);
    }
  })());
});
