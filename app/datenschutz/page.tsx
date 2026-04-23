import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: {
    index: false,
    follow: false,
  },
};

const headingTwo =
  "font-display text-gold mt-12 mb-6 text-2xl font-semibold tracking-wide md:text-3xl";
const paragraph =
  "font-body text-foreground mb-6 text-base leading-relaxed md:text-lg";
const paragraphTight =
  "font-body text-foreground mb-2 text-base leading-relaxed md:text-lg";

export default function DatenschutzPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <Link
        href="/"
        className="font-body text-muted-foreground hover:text-gold mb-8 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Zurück
      </Link>

      <h1 className="font-display text-gold border-border mt-4 mb-8 border-b pb-4 text-4xl font-bold tracking-wide md:text-5xl">
        Datenschutzerklärung
      </h1>

      <h2 className={headingTwo}>1. Verantwortlicher</h2>
      <p className={paragraphTight}>{process.env.NEXT_PUBLIC_SITE_OWNER}</p>
      <p className={paragraphTight}>{process.env.NEXT_PUBLIC_SITE_ADDRESS_STREET}</p>
      <p className={paragraphTight}>{process.env.NEXT_PUBLIC_SITE_ADDRESS_CITY}</p>
      <p className={paragraph}>E-Mail: {process.env.NEXT_PUBLIC_SITE_EMAIL}</p>

      <h2 className={headingTwo}>2. Allgemeines zur Datenverarbeitung</h2>
      <p className={paragraph}>
        Diese Website wird auf Vercel (Vercel Inc., San Francisco, USA) gehostet. Beim Besuch der
        Website werden automatisch technische Daten (IP-Adresse, Browsertyp, Uhrzeit) durch den
        Hosting-Provider verarbeitet. Dies ist für den Betrieb der Website technisch erforderlich.
      </p>
      <p className={paragraph}>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
      </p>

      <h2 className={headingTwo}>3. Cookies</h2>
      <p className={paragraph}>Diese Website verwendet keine Cookies.</p>

      <h2 className={headingTwo}>4. Local Storage</h2>
      <p className={paragraph}>
        Der Punkterechner speichert Spielstände lokal in Ihrem Browser (localStorage). Diese Daten
        werden nicht an einen Server übertragen und verbleiben ausschließlich auf Ihrem Gerät. Sie
        können diese Daten jederzeit über die Browser-Einstellungen löschen.
      </p>

      <h2 className={headingTwo}>5. Externe Links</h2>
      <p className={paragraph}>
        Diese Website enthält Links zu Instagram (Meta Platforms Ireland Ltd.). Beim Klick auf den
        Link gelten die Datenschutzbestimmungen von Meta.
      </p>

      <h2 className={headingTwo}>6. Hosting</h2>
      <p className={paragraph}>
        Diese Website wird bei Vercel Inc. gehostet. Vercel verarbeitet Verbindungsdaten
        (IP-Adressen) zum Ausliefern der Website. Weitere Informationen:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-bright underline"
        >
          https://vercel.com/legal/privacy-policy
        </a>
      </p>

      <h2 className={headingTwo}>7. Reichweiten- und Performance-Messung (Vercel)</h2>
      <p className={paragraph}>
        Wir nutzen <strong>Vercel Analytics</strong> zur anonymisierten Auswertung der Website-Zugriffe (z. B. Seitenaufrufe) sowie <strong>Vercel Speed Insights</strong> zur Messung der technischen Performance (z. B. Ladezeiten auf Endgeräten). 
        Dabei werden <strong>keine Cookies</strong> gesetzt und IP-Adressen vor der Speicherung kryptografisch unkenntlich gemacht (Hashing). Ein Rückschluss auf Ihre Person ist ausgeschlossen. 
        Rechtsgrundlage ist unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) an der technischen Optimierung und bedarfsgerechten Gestaltung unserer Website.
      </p>

      <h2 className={headingTwo}>8. Ihre Rechte</h2>
      <p className={paragraph}>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
        Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an die im Impressum genannten
        Kontaktdaten.
      </p>

      <h2 className={headingTwo}>9. Beschwerderecht</h2>
      <p className={paragraph}>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
      </p>
    </article>
  );
}
