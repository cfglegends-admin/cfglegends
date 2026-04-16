import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  robots: {
    index: false,
    follow: false,
  },
};

const placeholderClass =
  "bg-gold/10 text-gold rounded px-1.5 py-0.5 font-mono text-sm";

function Placeholder({ children }: { children: string }) {
  return <span className={placeholderClass}>{children}</span>;
}

export default function ImpressumPage() {
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
        Impressum
      </h1>

      <h2 className="font-display text-gold mt-12 mb-6 text-2xl font-semibold tracking-wide md:text-3xl">
        Angaben gemäß § 5 TMG
      </h2>
      <p className="font-body text-foreground mb-2 text-base leading-relaxed md:text-lg">
        <Placeholder>[Name wird ergänzt]</Placeholder>
      </p>
      <p className="font-body text-foreground mb-2 text-base leading-relaxed md:text-lg">
        <Placeholder>[Adresse wird ergänzt]</Placeholder>
      </p>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        <Placeholder>[PLZ Ort wird ergänzt]</Placeholder>
      </p>

      <h2 className="font-display text-gold mt-12 mb-6 text-2xl font-semibold tracking-wide md:text-3xl">
        Kontakt
      </h2>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        E-Mail: <Placeholder>[wird ergänzt]</Placeholder>
      </p>

      <h2 className="font-display text-gold mt-12 mb-6 text-2xl font-semibold tracking-wide md:text-3xl">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
      </h2>
      <p className="font-body text-foreground mb-2 text-base leading-relaxed md:text-lg">
        <Placeholder>[Name wird ergänzt]</Placeholder>
      </p>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        <Placeholder>[Adresse wird ergänzt]</Placeholder>
      </p>

      <h2 className="font-display text-gold mt-12 mb-6 text-2xl font-semibold tracking-wide md:text-3xl">
        Haftungsausschluss
      </h2>

      <h3 className="font-display text-gold-bright mt-8 mb-4 text-xl font-semibold tracking-wide md:text-2xl">
        Haftung für Inhalte
      </h3>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
      </p>

      <h3 className="font-display text-gold-bright mt-8 mb-4 text-xl font-semibold tracking-wide md:text-2xl">
        Haftung für Links
      </h3>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich.
      </p>

      <h3 className="font-display text-gold-bright mt-8 mb-4 text-xl font-semibold tracking-wide md:text-2xl">
        Urheberrecht
      </h3>
      <p className="font-body text-foreground mb-6 text-base leading-relaxed md:text-lg">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </article>
  );
}
