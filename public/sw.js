// Aliança com Deus — Service Worker
// Handles background notifications and PWA caching

const CACHE_NAME = "alianca-v1";

// ─── Install ────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(["/", "/logo.png"])
        ).catch(() => {/* ignore cache errors */ })
    );
    self.skipWaiting();
});

// ─── Activate ───────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// ─── Notification messages from page ────────────────────────────────────────
self.addEventListener("message", (event) => {
    if (!event.data) return;

    if (event.data.type === "SHOW_NOTIFICATION") {
        const { title, body, icon } = event.data;
        event.waitUntil(
            self.registration.showNotification(title || "Aliança com Deus", {
                body: body || "Que tal um momento com Deus hoje?",
                icon: icon || "/logo.png",
                badge: "/logo.png",
                vibrate: [200, 100, 200],
                tag: "alianca-daily",           // Replaces previous notification with same tag
                renotify: false,
                requireInteraction: false,
                data: { url: "/" },
            })
        );
    }

    // Schedule: page asks SW to send a notification at a specific timestamp
    if (event.data.type === "SCHEDULE_NOTIFICATION") {
        const { title, body, timestamp } = event.data;
        const delay = timestamp - Date.now();
        if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                self.registration.showNotification(title || "Aliança com Deus", {
                    body: body || "Que tal um momento com Deus hoje?",
                    icon: "/logo.png",
                    badge: "/logo.png",
                    vibrate: [200, 100, 200],
                    tag: "alianca-daily",
                    data: { url: "/" },
                });
            }, delay);
        }
    }
});

// ─── Notification click — open / focus app ──────────────────────────────────
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/";

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
            // Focus existing window if already open
            for (const client of clients) {
                if (client.url.includes(self.location.origin) && "focus" in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl);
            }
        })
    );
});

// ─── Push events (future server-side push support) ──────────────────────────
self.addEventListener("push", (event) => {
    let data = { title: "Aliança com Deus", body: "Você tem uma nova mensagem de Deus 🙏" };
    try {
        data = event.data?.json() || data;
    } catch {
        data.body = event.data?.text() || data.body;
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/logo.png",
            badge: "/logo.png",
            vibrate: [200, 100, 200],
            tag: "alianca-daily",
            data: { url: "/" },
        })
    );
});
