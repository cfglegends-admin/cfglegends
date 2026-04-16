import Image from "next/image";
import { exampleCards, type ExampleCard } from "@/lib/config";
import { cn } from "@/lib/utils";

const typeLabels: Record<ExampleCard["type"], string> = {
  lehrer: "Lehrer",
  ereignis: "Ereignis",
  falle: "Falle",
};

const typeBadgeStyles: Record<ExampleCard["type"], string> = {
  lehrer: "bg-gold/15 text-gold border-gold/40",
  ereignis: "bg-event/30 text-foreground border-event/60",
  falle: "bg-trap/30 text-foreground border-trap/60",
};

export function CardShowcase() {
  return (
    <div>
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Karten
        </h2>
        <p className="font-body text-foreground/85 mt-6 text-base md:text-lg">
          Über 100 einzigartige Karten — Lehrer, Ereignisse und Fallen.
        </p>
      </header>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6 md:mx-0 md:justify-center md:gap-8 md:overflow-visible md:px-0">
        {exampleCards.map((card) => (
          <li
            key={card.id}
            className="flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col gap-4 md:w-[280px]"
          >
            <div className="bg-muted relative aspect-[924/1316] w-full overflow-hidden rounded-lg shadow-lg shadow-black/50 select-none [pointer-events:none]">
              <Image
                src={card.image}
                alt={`Karte ${card.name}`}
                fill
                draggable={false}
                quality={85}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-foreground text-base font-semibold tracking-wide">
                {card.name}
              </span>
              <span
                className={cn(
                  "font-body inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  typeBadgeStyles[card.type]
                )}
              >
                {typeLabels[card.type]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
