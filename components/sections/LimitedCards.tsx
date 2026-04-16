import { ShieldAlert } from "lucide-react";
import { getLimitedCards } from "@/lib/actions/limits";
import type { LimitedCard } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

async function loadCards(): Promise<LimitedCard[] | null> {
  try {
    return await getLimitedCards();
  } catch {
    return null;
  }
}

export async function LimitedCards() {
  const cards = await loadCards();

  return (
    <div>
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Limitierungsliste
        </h2>
        <p className="font-body text-foreground/85 mt-6 text-base md:text-lg">
          Einige Karten sind so stark, dass sie nur begrenzt ins Deck dürfen.
        </p>
      </header>

      <div className="mx-auto max-w-2xl">
        {cards === null ? (
          <p className="font-body text-muted-foreground py-8 text-center text-base">
            Limitierungsliste wird geladen…
          </p>
        ) : cards.length === 0 ? (
          <p className="font-body text-muted-foreground py-8 text-center text-base">
            Aktuell sind keine Karten limitiert.
          </p>
        ) : (
          <ul className="border-border overflow-hidden rounded-lg border">
            {cards.map((card, index) => (
              <li
                key={card.id}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4",
                  index % 2 === 0 ? "bg-muted" : "bg-muted/60",
                  index !== 0 && "border-border border-t"
                )}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-trap h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="font-display text-foreground text-base font-semibold tracking-wide">
                    {card.name}
                  </span>
                </div>
                <span className="font-body text-muted-foreground text-sm font-medium">
                  Max. {card.maxCopies} pro Deck
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
