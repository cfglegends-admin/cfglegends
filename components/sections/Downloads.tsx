import { Download } from "lucide-react";

export function Downloads() {
  return (
    <div>
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Downloads
        </h2>
      </header>

      <div className="mx-auto max-w-2xl">
        <article className="bg-muted border-border flex flex-col gap-4 rounded-lg border p-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-foreground text-xl font-semibold tracking-wide">
              Regelwerk (PDF)
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Die vollständigen Spielregeln zum Nachlesen und Ausdrucken.
            </p>
          </div>
          <a
            href="/docs/regelwerk.pdf"
            download
            className="border-gold text-gold hover:bg-gold hover:text-background font-display inline-flex shrink-0 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Herunterladen
          </a>
        </article>
      </div>
    </div>
  );
}
