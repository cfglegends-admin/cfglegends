import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-gold text-7xl font-bold md:text-9xl">404</p>
      <h1 className="font-display text-foreground mt-4 text-2xl font-semibold tracking-wide md:text-3xl">
        Seite nicht gefunden
      </h1>
      <p className="font-body text-muted-foreground mt-3 max-w-md text-sm md:text-base">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="btn-gold mt-8 inline-flex items-center rounded-lg bg-gold px-6 py-3 font-body text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
