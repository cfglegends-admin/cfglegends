"use client";

import { useEffect } from "react";

// Pages to pre-warm in the SW cache on first install so they're available
// offline even if the user never manually visited them.
const PAGES_TO_PRECACHE = ["/", "/karten", "/regeln", "/rechner", "/impressum", "/datenschutz"];

async function warmPageCache() {
  if (!("caches" in window)) return;
  await Promise.allSettled(
    PAGES_TO_PRECACHE.map((url) =>
      fetch(url, { cache: "no-cache", credentials: "same-origin" })
    )
  );
}

// Registers the service worker and kicks off background data sync + page warming.
// Mounted once in the root layout — no visible UI output.
export function PwaManager() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    }).catch(() => {});

    // Request persistent storage so the browser doesn't evict caches under quota pressure
    if ("storage" in navigator && "persist" in navigator.storage) {
      navigator.storage.persist();
    }

    if (!navigator.onLine) return;

    // Run data sync and image prefetch in the background.
    import("@/lib/offline/sync").then(({ runSync }) => {
      runSync({ prefetchImages: true });
    });

    // Page warming must happen while the SW is controlling the page, otherwise the
    // fetches bypass the SW and never land in the pages cache. On first install the
    // SW activates and calls clientsClaim asynchronously, so we wait for controllerchange.
    if (navigator.serviceWorker.controller) {
      warmPageCache();
    } else {
      navigator.serviceWorker.addEventListener("controllerchange", () => warmPageCache(), { once: true });
    }
  }, []);

  return null;
}
