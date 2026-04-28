import { getOfflineDB, type OfflineCard } from "./db";

interface SyncPayload {
  cards: OfflineCard[];
  news: Array<{ id: number; title: string; content: string; createdAt: string; updatedAt: string }>;
  limits: Array<{ id: number; name: string; maxCopies: number; reason: string | null; updatedAt: string }>;
  downloads: Array<{
    id: number;
    name: string;
    description: string | null;
    fileUrl: string;
    fileType: string | null;
    fileSize: number | null;
    createdAt: string;
  }>;
  syncedAt: string;
}

async function persistSyncData(data: SyncPayload): Promise<void> {
  const db = await getOfflineDB();

  const tx = db.transaction(["cards", "news", "limits", "downloads", "meta"], "readwrite");

  await Promise.all([
    tx.objectStore("cards").clear(),
    tx.objectStore("news").clear(),
    tx.objectStore("limits").clear(),
    tx.objectStore("downloads").clear(),
  ]);

  await Promise.all([
    ...data.cards.map((c) => tx.objectStore("cards").add(c)),
    ...data.news.map((n) => tx.objectStore("news").add(n)),
    ...data.limits.map((l) => tx.objectStore("limits").add(l)),
    ...data.downloads.map((d) => tx.objectStore("downloads").add(d)),
    tx.objectStore("meta").put({ key: "syncedAt", value: data.syncedAt }),
  ]);

  await tx.done;
}

const HERO_ASSETS = [
  "/assets/logo-main.png",
  "/assets/logo-crown.png",
  "/assets/logo-icons-left.png",
  "/assets/logo-icons-right.png",
  "/assets/logo-static.png",
];
const HERO_SIZES: Array<[number, number]> = [[640, 90], [828, 90]];

const STATIC_ASSETS = ["/docs/regelwerk.pdf", "/assets/patterns/bg.svg"];

// Prefetches all offline-critical assets through next/image and the SW cache.
// cache: 'no-store' bypasses browser HTTP cache so the SW gets a 200 response it can store.
async function prefetchAssets(data: SyncPayload): Promise<void> {
  if (typeof window === "undefined") return;

  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    const available = (estimate.quota ?? 0) - (estimate.usage ?? 0);
    if (available < 50 * 1024 * 1024) return;
  }

  // Card images: grid thumbnail (384/q85) + modal at common DPR/viewport combos (q90)
  const CARD_SIZES: Array<[number, number]> = [[384, 85], [640, 90], [750, 90], [828, 90], [1080, 90]];
  const cardQueue = data.cards.flatMap((card) =>
    CARD_SIZES.map(([w, q]) => async () => {
      try {
        await fetch(
          `/_next/image?url=${encodeURIComponent(card.imageUrl)}&w=${w}&q=${q}`,
          { cache: "no-store", priority: "low" } as RequestInit
        );
      } catch { /* skip */ }
    })
  );

  for (let i = 0; i < cardQueue.length; i += 5) {
    await Promise.all(cardQueue.slice(i, i + 5).map((fn) => fn()));
  }

  // Hero logo variants via next/image
  const heroQueue = HERO_ASSETS.flatMap((asset) =>
    HERO_SIZES.map(([w, q]) => async () => {
      try {
        await fetch(
          `/_next/image?url=${encodeURIComponent(asset)}&w=${w}&q=${q}`,
          { cache: "no-store", priority: "low" } as RequestInit
        );
      } catch { /* skip */ }
    })
  );

  for (let i = 0; i < heroQueue.length; i += 5) {
    await Promise.all(heroQueue.slice(i, i + 5).map((fn) => fn()));
  }

  // Static assets (PDF + SVG) — cached by SW's static-assets CacheFirst handler
  await Promise.allSettled(
    STATIC_ASSETS.map((url) => fetch(url, { cache: "no-store" }))
  );

  // Blob downloads — mode: no-cors because Vercel Blob URLs lack CORS headers;
  // opaque responses are still cached by the SW's blob-images StaleWhileRevalidate handler
  await Promise.allSettled(
    data.downloads.map((d) =>
      fetch(d.fileUrl, { cache: "no-store", mode: "no-cors" })
    )
  );
}

let syncInProgress = false;

export async function runSync(opts: { prefetchImages?: boolean } = {}): Promise<void> {
  if (syncInProgress) return;
  syncInProgress = true;

  try {
    const res = await fetch("/api/sync", { cache: "no-store" });
    if (!res.ok) return;

    const data: SyncPayload = await res.json();
    await persistSyncData(data);

    if (opts.prefetchImages && data.cards.length > 0) {
      prefetchAssets(data).catch(() => {});
    }
  } catch {
    // Network unavailable — existing IndexedDB data is still valid
  } finally {
    syncInProgress = false;
  }
}
