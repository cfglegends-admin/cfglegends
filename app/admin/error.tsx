"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ reset }: ErrorProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-foreground text-2xl font-semibold tracking-wide">
        Admin-Fehler
      </h1>
      <p className="font-body text-muted-foreground mt-3 max-w-md text-sm">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut oder lade die Seite neu.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-gold px-5 py-2.5 font-body text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
