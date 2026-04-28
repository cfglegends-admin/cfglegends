# PWA Offline-Implementierung — Abgeschlossen

## Stand: 27.04.2026 — Alle Phasen vollständig implementiert und getestet

### Phasen-Überblick

| Phase | Status |
|-------|--------|
| Phase 1 — PWA Shell + Service Worker + Asset-Caching | ✅ FERTIG |
| Phase 2 — Data Sync Layer (Postgres → IndexedDB) | ✅ FERTIG |
| Phase 3 — Polish (Quota, Offline-Indikator, Timestamps) | ✅ FERTIG |

---

## Dateien

| Datei | Funktion |
|-------|----------|
| `app/sw.ts` | Service Worker Entry — Precache-Manifest, Runtime-Caching via `matcher`-API (serwist v9), `handlerDidError`-Plugin für Offline-Fallback |
| `app/api/sync/route.ts` | Sync-Endpoint — liefert alle publizierten Karten (121), News, Limits, Downloads als JSON |
| `app/offline/page.tsx` | Offline-Fallback-Seite — IndexedDB-basierte Karten-Galerie (wird serviert wenn gecachte Seite fehlt) |
| `lib/offline/db.ts` | IndexedDB-Setup via `idb` — Stores für cards, news, limits, downloads, meta |
| `lib/offline/sync.ts` | Sync-Logik — fetcht `/api/sync`, schreibt atomisch in IndexedDB, prefetcht alle Kartenbilder mit `cache: 'no-store'` (erzwingt 200-Response für SW-Cache) |
| `components/pwa/PwaManager.tsx` | SW-Registration + `navigator.storage.persist()` + Sync + Page-Cache-Warming für /, /karten, /regeln, /rechner |
| `components/karten/OfflineCardGallery.tsx` | Client-seitige Galerie aus IndexedDB |
| `tsconfig.sw.json` | Separate tsconfig für SW mit `webworker`-Lib |
| `public/sw.js` | Generierter SW (wird bei jedem Build neu erzeugt) |

---

## Architektur

```
Benutzer öffnet App (online)
  → SW registriert sich
  → navigator.storage.persist() angefordert
  → PwaManager:
      1. fetch(/api/sync) → 121 Karten + News + Limits → IndexedDB
      2. Prefetch aller Kartenbilder (cache: no-store → 200 → SW cached sie)
      3. fetch(/, /karten, /regeln, /rechner) → SW cached als HTML-Seiten

Benutzer öffnet App (offline)
  → SW interceptet Navigation
  → pages-Cache vorhanden? → HTML aus Cache servieren (NetworkFirst)
  → pages-Cache leer? → handlerDidError → /offline (IndexedDB-Galerie)
```

## SW Runtime-Caching (serwist v9 `matcher`-API)

| Cache | Strategie | Was |
|-------|-----------|-----|
| `serwist-precache-v2` | Precache | `/_next/static/*`, `/offline` HTML |
| `next-image-cache` | StaleWhileRevalidate | `/_next/image?*` |
| `card-images` | CacheFirst | `/cards/*.png` (direkte URLs) |
| `blob-images` | StaleWhileRevalidate | `*.blob.vercel-storage.com` |
| `google-fonts-*` | CacheFirst/SWR | Google Fonts |
| `static-assets` | CacheFirst | SVGs, Icons, PDFs |
| `sync-api` | NetworkFirst (5s) | `/api/sync` |
| `pages` | NetworkFirst (3s) + handlerDidError→/offline | Same-origin Navigationen |

---

## Kritische Bugs die behoben wurden

1. **`urlPattern` → `matcher`**: serwist v9 `RuntimeCaching`-Interface nutzt `matcher`, nicht `urlPattern`. Mit `urlPattern` war `entry.matcher === undefined` → `parseRoute` warf `unsupported-route-type`.

2. **`navigateFallback` in `precacheOptions`**: Muss in `precacheOptions: { navigateFallback, navigateFallbackAllowlist }` statt als Top-Level-Option. Sonst wird es ignoriert.

3. **NavigationRoute überschreibt runtimeCaching**: Die NavigationRoute (navigateFallback) wird vor runtimeCaching-Routen registriert und fängt ALLE Navigationen ab — auch wenn gecachte Seiten verfügbar wären. Fix: `navigateFallback` entfernt, stattdessen `handlerDidError`-Plugin an der `pages`-Route.

4. **304-Responses werden nicht gecacht**: Browser-HTTP-Cache gibt 304 zurück → SW hat keinen Body zum Cachen. Fix: `cache: 'no-store'` im Image-Prefetch erzwingt 200-Responses.

5. **Exclude-Patterns ineffektiv**: Regex-Patterns `/\/cards\//` matchten nicht auf webpack-Asset-Pfade. Fix: Funktion `({ asset }) => asset.name.includes('cards/')` verwenden.

---

## Phase 4 — 100 % Offline-Coverage (2026-04-28)

Alle verbleibenden Lücken geschlossen:

| Was | Fix |
|-----|-----|
| `/impressum`, `/datenschutz` nicht vorgewärmt | `PAGES_TO_PRECACHE` erweitert |
| Modal-Bilder fehlten (`w=640/828/1080 q=90`) | `prefetchAssets` cacht jetzt 4 Größen pro Karte |
| Hero-Logo-Varianten (4 × 2 Sizes + Static) | In Prefetch-Loop aufgenommen |
| `regelwerk.pdf` + `bg.svg` | Direkter Prefetch in `STATIC_ASSETS` |
| Next.js `Cache-Control: no-store` verhinderte Pages-Caching | `cacheWillUpdate`-Plugin im `pages`-Handler erzwingt Caching von 200-Responses |

### Finale Cache-Zählungen (verifiziert via Chrome DevTools MCP, offline)

| Cache | Einträge |
|-------|----------|
| `serwist-precache-v2` | 87 |
| `next-image-cache` | 499 (121 Karten × 4 Größen + Hero-Logos) |
| `static-assets` | 2 (`regelwerk.pdf`, `bg.svg`) |
| `pages` | 8 (alle 6 Routen gecacht) |
| `sync-api` | 1 |

### Offline-Verifikation (alle Routen)

| Route | Ergebnis |
|-------|----------|
| `/` | ✅ Korrekt gerendert |
| `/karten` | ✅ 121 Karten + Modal-Bild aus Cache geladen |
| `/rechner` | ✅ Score-Tracker funktional |
| `/regeln` | ✅ MDX + PDF-Link (200 aus `static-assets`) |
| `/impressum` | ✅ Korrekt gerendert |
| `/datenschutz` | ✅ Korrekt gerendert |

Konsole offline: nur erwartete Vercel-Analytics-404s, keine weiteren Fehler.

## Einschränkungen

- SW funktioniert nur im Production Build (`npm run build && npm start`)
- Vercel Analytics/SpeedInsights 404 lokal — OK auf Vercel
- Admin-Seiten absichtlich NICHT offline-fähig
