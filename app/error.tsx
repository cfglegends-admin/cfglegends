"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-destructive text-5xl font-bold md:text-7xl">Fehler</p>
      <h1 className="font-display text-foreground mt-4 text-2xl font-semibold tracking-wide md:text-3xl">
        Etwas ist schiefgelaufen
      </h1>
      <p className="font-body text-muted-foreground mt-3 max-w-md text-sm md:text-base">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
      </p>
      <button
        onClick={reset}
        className="btn-gold mt-8 inline-flex items-center rounded-lg bg-gold px-6 py-3 font-body text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
