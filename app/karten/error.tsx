"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function KartenError({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-foreground text-2xl font-semibold tracking-wide md:text-3xl">
        Galerie konnte nicht geladen werden
      </h1>
      <p className="font-body text-muted-foreground mt-3 max-w-md text-sm md:text-base">
        Die Karten-Daten sind gerade nicht erreichbar. Bitte versuche es in wenigen Sekunden erneut.
      </p>
      <button
        onClick={reset}
        className="btn-gold mt-8 inline-flex items-center rounded-lg bg-gold px-6 py-3 font-body text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
      >
        Erneut laden
      </button>
    </div>
  );
}
