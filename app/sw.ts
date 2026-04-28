import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, NetworkFirst, CacheFirst, StaleWhileRevalidate } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

// Chrome 127+ throws when skipWaiting() is called outside an install event.
self.addEventListener("install", () => self.skipWaiting());

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /\/_next\/static\/.*/i,
      handler: new CacheFirst({
        cacheName: "next-static",
        plugins: [{ cacheWillUpdate: async () => null }],
      }),
    },
    {
      matcher: /\/_next\/image\?.*/i,
      handler: new StaleWhileRevalidate({
        cacheName: "next-image-cache",
      }),
    },
    {
      matcher: /\/cards\/[^/]+\.(png|webp|avif|jpg|jpeg)$/i,
      handler: new CacheFirst({
        cacheName: "card-images",
      }),
    },
    {
      matcher: /^https:\/\/[^/]+\.blob\.vercel-storage\.com\/.*/i,
      handler: new StaleWhileRevalidate({
        cacheName: "blob-images",
      }),
    },
    {
      matcher: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: new StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
      }),
    },
    {
      matcher: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: new CacheFirst({
        cacheName: "google-fonts-webfonts",
      }),
    },
    {
      matcher: /\.(svg|ico|pdf)$/i,
      handler: new CacheFirst({
        cacheName: "static-assets",
      }),
    },
    {
      matcher: /\/api\/sync$/i,
      handler: new NetworkFirst({
        cacheName: "sync-api",
        networkTimeoutSeconds: 5,
      }),
    },
    {
      matcher: ({ url, sameOrigin }: { url: URL; sameOrigin: boolean }) =>
        sameOrigin && !url.pathname.startsWith("/api") && !url.pathname.startsWith("/admin") && !url.pathname.startsWith("/_next"),
      handler: new NetworkFirst({
        cacheName: "pages",
        networkTimeoutSeconds: 3,
        plugins: [
          // Next.js sends Cache-Control: no-store on dynamic pages; force-cache 200 responses anyway
          { cacheWillUpdate: async ({ response }: { response: Response }) => response.status === 200 ? response : null },
          { handlerDidError: async () => caches.match("/offline") },
        ],
      }),
    },
  ],
});

serwist.addEventListeners();
