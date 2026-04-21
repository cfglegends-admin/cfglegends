# CFG Legends — Website

## Projekt-Kontext
Website für das schulische Kartenspiel "CFG Legends". 
Zielgruppe: Schüler:innen der Schule, die das Spiel kaufen und spielen.
Ton: edel, prestigeträchtig (Art Deco, Wappen-Ästhetik), nicht spielerisch-bunt.

## Launch
- **Deadline:** Donnerstag, 23.04.2026 (erster Karten-Verkauf in der Schule)
- **Hosting:** Vercel (vercel.app-URL im Launch, Custom Domain später)
- **Phase 1 Scope:** Statisch, keine DB, kein Admin-Dashboard, keine Uploads
- **noindex** in Metadata bis zur offiziellen Öffentlichkeits-Freigabe

## Tech Stack (verbindlich)
- Next.js 15 (App Router — NIEMALS Pages Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-based config via @theme in globals.css — KEINE tailwind.config.js)
- shadcn/ui (new-york style)
- lucide-react (Icons)
- next/font/google (Fonts)
- next/image (Bilder — NIEMALS <img>)
- MDX (@next/mdx) für Regelwerk-Content

## Stack-Fallen (oft falsch gemacht)
- Server Components sind Default. `"use client"` nur, wenn Hooks, Events oder Browser-APIs.
- Kein `getServerSideProps`, `getStaticProps`, `_app.tsx`, `pages/` — veraltete Patterns.
- Tailwind v4: Farben als `@theme { --color-gold: ... }` in globals.css, nicht config.
- `next/image`: IMMER `sizes` setzen, `priority` nur für Hero.
- Metadata über `export const metadata` in layout/page, nicht `<head>`.

## Projektstruktur
app/
├── layout.tsx                Root-Layout (Fonts, Metadata, noindex, Manifest)
├── page.tsx                  Landing Page (+ JSON-LD)
├── not-found.tsx             Custom 404
├── error.tsx                 Globale Error Boundary
├── sitemap.ts                XML-Sitemap
├── regeln/page.tsx           Regelwerk (MDX)
├── karten/
│   ├── page.tsx              Galerie
│   ├── loading.tsx           Skeleton Loading
│   └── error.tsx             Galerie Error Boundary
├── admin/
│   └── error.tsx             Admin Error Boundary
├── impressum/page.tsx
├── datenschutz/page.tsx
└── globals.css               Tailwind v4 @theme, Design-Tokens

components/
├── sections/                 Landing-Sections (Hero, Rules, Calculator, Subjects, Limits, Cards, Footer)
├── ui/                       shadcn/ui
└── calculator/               Score Tracker (Client Component)

lib/
├── config.ts                 Fachsymbole, Limitierungsliste, Beispielkarten
├── hooks/use-focus-trap.ts   Focus-Trap-Hook für Modals
└── utils.ts                  cn() helper

public/
├── manifest.json             PWA Web App Manifest
└── robots.txt                Crawler-Regeln

content/
└── regelwerk.mdx

public/
├── assets/
│   ├── logo.png              Upscaled Hero-Logo
│   ├── logo-header.png       Kleinere Variante für Navbar
│   └── patterns/bg.svg       Hintergrund-Muster
├── cards/                    Beispielkarten (webp)
├── docs/regelwerk.pdf
└── favicons/

## Design-System

### Farben (in globals.css als @theme-Tokens)
--color-background: #0A0A0A
--color-foreground: #F5F5F4
--color-gold: #D4AF37
--color-gold-bright: #E5C158
--color-event: #1E3A8A    (Blau für Ereigniskarten-Bezüge)
--color-trap: #991B1B     (Rot für Fallenkarten-Bezüge)
--color-muted: #27272A
--color-border: #3F3F46

### Typografie
- Display/Headings: Cinzel (via next/font/google, weights 400/600/700)
- Body: Inter (via next/font/google, weights 400/500/600)
- Monospace: Geist Mono (für Zahlen im Calculator)

### Spacing
- Content max-width: 1200px
- Section padding: py-24 md:py-32 (großzügig, Seite soll atmen)
- Grid-gaps: gap-6 md:gap-8

## Code-Konventionen
- Named exports für Components, default nur wo Next.js es verlangt (page.tsx, layout.tsx).
- Keine `any`, keine `as unknown as`. Echte Types oder `unknown` mit Narrowing.
- Conditional Classes via `cn()` aus lib/utils.
- Keine inline `style={{}}` außer für dynamische Werte ohne Tailwind-Äquivalent.
- Semantic HTML: <main>, <section>, <article>, <nav>, <button> (kein <div onClick>).

## Performance
- Bilder: next/image mit sizes, quality={90} für Hero-Assets, quality={80} Standard.
- Fonts: next/font/google mit display: 'swap'.
- Keine Client-Libraries, wenn Server-Component-Alternative existiert.
- Ziel: Lighthouse ≥ 90 in allen Kategorien.

## Do / Don't
✅ Mobile-first (sm: → md: → lg:)
✅ ARIA-Labels für Icon-Buttons
✅ Tastatur-Navigation berücksichtigen (Focus-States sichtbar)
✅ Dark-Theme als Default (Seite ist durchgehend dunkel)

❌ Pages Router, getServerSideProps, _app.tsx
❌ Hardcoded Farben (#fff) — nur Design-Tokens
❌ Tailwind v3-Syntax in globals.css
❌ console.log in ausgelieferten Code
❌ Kommentare, die erklären WAS der Code macht (nur WARUM, wenn nicht-offensichtlich)

## Aktueller Stand
Phase: Senior Frontend Animation-Pass abgeschlossen
Erledigt:
- Fachsymbole auf Inline-SVGs (currentColor) umgestellt
- Vollständige Karten-Galerie mit Datenbankanbindung, Bulk-Import und öffentlicher Galerie `/karten`
- Galerie: Getestet und funktionsfähig (Filter, Suche, Sortierung, Detail-Modal, Admin CRUD)
- framer-motion + LazyMotion, zentrale Motion-Primitives (lib/motion.ts)
Animationen:
- Hero: Logo mit Entry-Animation (1.6s epic) + konstantem Float (8s), staggered Untertitel/CTA
- Hintergrund: 3-Ebenen-Parallax (deep gold spots + main pattern + drift 90s) + Opacity-Atmung + Gold-Vignette, Pattern-Layer GPU-promoted via translateZ(0) + will-change für flüssigere Repaints
- Sections: Keine eigenen Hintergründe mehr → durchgehendes Parallax-Pattern, SectionDivider als dezente Gold-Gradient-Trennung
- Karten-Galerie + Landing-Karten: 3D-Tilt mit Spring-Physics + Cursor-folgender Gold-Shine, FLIP-Layout bei Filter-Änderung
- Karten-Detail-Modal: Split-Layout (Karte links freistehend mit 3D-Tilt, Info rechts) via Portal + framer-motion
- Calculator: Animierter Number-Counter + Scale-Pulse bei Score-Änderung + Button-Tap-Feedback
- ConfirmDialog-Komponente (Portal + framer-motion, ersetzt window.confirm im Calculator)
- Motion-Timings cinematisch (durations.cinematic 1.2s, durations.epic 1.6s, ease: [0.22,1,0.36,1])
- Header: Scroll-aware Opacity + Blur (0.5s transition)
- Nav-Links: Gold-Underline-Slide on Hover
- Buttons: Shine-Sweep on Hover (btn-gold Klasse, 1.2s)
- Bilder: FadeImage Lazy-Fade bei Load
- CardTilt: hover-detection für Touch-Devices (canHover), maxTilt 12°, stiffness 150, mass 0.8
- Reduced-Motion respektiert über MotionConfig + CSS-Fallback
Fixes: Karten-Klick in Galerie repariert (lifted state: CardGrid verwaltet selectedCard, ein einzelnes Modal statt je eines pro Karte), Section-Abstand mobil/desktop ausbalanciert (py-24 / md:py-36 / lg:py-48), Fachsymbole verlinken zu /karten?fach=..., Parallax-Pattern durchgehend sichtbar, Modal-Z-Index via inline style={zIndex:9999, isolation:"isolate"} (Tailwind v4 arbitrary z-[100] unzuverlässig), main z-index:1 statt z-10 (verhindert Stacking-Context-Konflikte mit Portals), Liquid-Glass-Ästhetik auf Modal (backdrop-filter blur + semi-transparente Gradients), Blob-Bild-Render-Fix über Next remotePatterns + bessere Upload-Fehlertexte
Client Components: MotionProvider, ParallaxBackground, Reveal, StaggerContainer, StaggerItem, CardTilt, AnimatedNumber, FadeImage, Header, ConfirmDialog, SectionDivider
Admin-Seiten: Dashboard, Limitierungen, News, Downloads, Karten, Admin-Konten, Änderungslog
Admin-Auth: Mehrere Admin-Accounts via E-Mail + Passwort, Master-Admin-Rolle, Session-Ende beim Tab-Schließen (pagehide/beacon)
Admin-Accounts: Master-Admin kann bestehende Accounts bearbeiten (E-Mail, Rolle, Passwort-Reset) mit Self-Lockout-Schutz
Admin-Usability: Footer und öffentlicher Header auf `/admin` ausgeblendet, responsive Tab-Navigation mit horizontalem Scroll auf Mobile
Admin-Audit: Login/Logout + CRUD-Änderungen in Karten, Limits, News, Downloads werden mit Account-Zuordnung geloggt
Karten-Upload: Direktes Bild-Upload im Admin-Kartenformular via Vercel Blob (ohne GitHub-Zugriff), URL wird automatisch gesetzt
Karten-Workflow: Nächste Kartennummer wird bei "Neue Karte" automatisch vorgeschlagen; Upload-Dateiname basiert auf Kartennummer (`cards/{nummer}.{ext}`) mit Nummern-Kollision-Check
Layout: Footer zusätzlich auf `/rechner` ausgeblendet
Mobile/Animation-Pass: Card-Modal mobile spacing verbessert, Rechner-Controls mit größeren Touch-Targets, SectionDivider mit subtiler cinematic Pulse-Animation, Parallax-Layer über gesamte Scroll-Höhe erweitert (inkl. sanfter Opacity/Scale-Atmung)
Rechner-Polish: Lead-Glow, Ambient Lighting (Score-Farbe), Low-Score-Puls (warn/critical/dead), Name-Badge-Feedback, Victory-Overlay bei 0 Punkten mit Gold-Metallic-Titel, Konfetti-Regen (canvas-confetti), Swipe-Gestures auf Mobile (Swipe-Up/Down ±1/±5). Alle Effekte respektieren prefers-reduced-motion.
Cursor-Trail: Goldener Schweif + dezente Partikel die bei Cursor-Bewegung erscheinen und nach 1.5s Stillstand gemächlich verblassen. Cursor-Glow zeigt metallisch-helles BG-Pattern im Radius um den Cursor mit kurzem Schweif (10 Trail-Punkte, 800ms max age), gleichgeschaltet mit Partikeln (400ms idle-delay + schneller Fade-Out synchron mit Partikel-Lebensdauer). Einzelner rAF-Loop für Glow + Partikel-Cleanup + Partikel-Position-Updates (erzwingt Re-Render für flüssige Interpolation). Nur auf Landing/Galerie/Regeln/Impressum/Datenschutz aktiv, nicht auf Rechner oder Admin. Gedämpft über CardTilt-Zonen (opacity *0.4), stark reduziert über SubjectsGrid-Items (opacity *0.2) für Lesbarkeit. Respektiert prefers-reduced-motion und Touch-Devices.
Neue Komponenten: VictoryOverlay, CursorTrail, CursorTrailGate, HeroLogo
Neue Dependency: canvas-confetti
Hero-Logo: Cinematic 2.5D-Animation mit 4 Layern (logo-icons-left/right hinten, logo-main Mitte, logo-crown vorne). Multi-Layer Mouse-Parallax mit unterschiedlicher Z-Tiefe, Container-Tilt (rotateX/Y ±5°), Depth-Shadow-Stacking, einmaliger Shine-Sweep beim Laden (1.2s Delay), Idle-Animation (Float + Mikro-Rotation + Scale-Puls), Scroll-Reaktion (scale 1→0.88, opacity 1→0.4 über 600px). Respektiert prefers-reduced-motion (zeigt statisches logo-static.png).
Neue Assets: public/assets/logo-static.png, logo-main.png, logo-crown.png, logo-icons-left.png, logo-icons-right.png
Error Handling: Custom 404-Seite, globale + Galerie- + Admin-spezifische Error Boundaries, Skeleton Loading für Galerie
Accessibility: Focus-Trap in CardDetailModal + ConfirmDialog (lib/hooks/use-focus-trap.ts), role="dialog" + aria-modal, aria-expanded auf MobileNav
SEO: JSON-LD (WebSite) auf Landing Page, XML-Sitemap (app/sitemap.ts), robots.txt (/admin + /api blockiert)
PWA: Web App Manifest (manifest.json) mit Theme-Color Gold, Standalone-Display
Performance: BG-Pattern SVG via SVGO optimiert (180KB → 140KB, -22.5%), Pattern-Layer GPU-promoted (translateZ(0) + will-change)
Öffentliche Seiten: Landing Page, /regeln, /rechner, /karten, /impressum, /datenschutz
DB-Tabellen: limitedCards, news, downloads, cards, adminUsers, adminAuditLogs
Karten-Galerie Final:
- PNGs normalisiert via ImageMagick (trim + resize 1742×2539, keine transparenten Ränder)
- Grid-Cards: rounded-2xl + aspectRatio 59/86 + object-cover, dezenter gold Hover-Border, shadow-gold/15 Hover-Glow
- Modal Desktop: Karte links + Liquid-Glass Info-Box rechts, beide aspectRatio 59/86 + width 340px → exakt gleich hoch
- Info-Box asymmetrisch gerundet (rechts rund, links scharf), backdrop-filter blur(24px) saturate(180%)
- Conditional Rendering: Stats nur wenn vorhanden, Fächer nur wenn gesetzt, Effect nur wenn nicht leer
- Mobile: gestapeltes Layout, Info-Box scrollt intern mit maxHeight 60vh
Neue Dateien: scripts/normalize-cards.sh
Backup: public/cards-backup/ (Originale)
Fix (Cross-Browser): CardDetailModal Desktop-Layout nutzt calc()-basierte Kartenbreite (calc(min(80vh,700px)*59/86)) statt implizite aspect-ratio-Breite — behebt Safari WebKit Flex + aspect-ratio Bug.
Fix (Animation): Exit-Animationen in Modal getrennt von Enter-Transitions — Delays nur für Enter-Stagger, Exit immer synchron (0.3s ohne Delay).
Fix (CardTilt): translateZ(30px) entfernt + Gold-Glow-Overlay nach children verschoben — behebt Safari 3D-Rendering und macht Shimmer sichtbar.
Nächster Schritt: Domain + produktive Blob-Konfiguration
