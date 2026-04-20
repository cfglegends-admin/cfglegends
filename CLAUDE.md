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
├── layout.tsx                Root-Layout (Fonts, Metadata, noindex)
├── page.tsx                  Landing Page
├── regeln/page.tsx           Regelwerk (MDX)
├── impressum/page.tsx
├── datenschutz/page.tsx
└── globals.css               Tailwind v4 @theme, Design-Tokens

components/
├── sections/                 Landing-Sections (Hero, Rules, Calculator, Subjects, Limits, Cards, Footer)
├── ui/                       shadcn/ui
└── calculator/               Score Tracker (Client Component)

lib/
├── config.ts                 Fachsymbole, Limitierungsliste, Beispielkarten
└── utils.ts                  cn() helper

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
- Hintergrund: 3-Ebenen-Parallax (deep gold spots + main pattern + drift 120s) + Opacity-Atmung + Gold-Vignette
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
Fixes: Karten-Klick in Galerie repariert (lifted state: CardGrid verwaltet selectedCard, ein einzelnes Modal statt je eines pro Karte), Section-Abstand py-40 md:py-56, Fachsymbole verlinken zu /karten?fach=..., Parallax-Pattern durchgehend sichtbar (bg-background von /karten entfernt, Footer halbtransparent), Modal-Z-Index via inline style={zIndex:9999, isolation:"isolate"} (Tailwind v4 arbitrary z-[100] unzuverlässig), main z-index:1 statt z-10 (verhindert Stacking-Context-Konflikte mit Portals), Liquid-Glass-Ästhetik auf Modal (backdrop-filter blur + semi-transparente Gradients)
Client Components: MotionProvider, ParallaxBackground, Reveal, StaggerContainer, StaggerItem, CardTilt, AnimatedNumber, FadeImage, Header, ConfirmDialog, SectionDivider
Admin-Seiten: Dashboard, Limitierungen, News, Downloads, Karten
Öffentliche Seiten: Landing Page, /regeln, /rechner, /karten, /impressum, /datenschutz
DB-Tabellen: limitedCards, news, downloads, cards
Nächster Schritt: Vercel Blob Storage, Domain
