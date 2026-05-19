"use client"

import { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import dynamic from "next/dynamic";
import { type Card } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { LazyCardTilt } from "@/components/motion/LazyCardTilt";

const INITIAL_COUNT = 25;
const LOAD_STEP = 25;

const CardDetailModal = dynamic(
  () => import("./CardDetailModal").then(mod => ({ default: mod.CardDetailModal })),
  { ssr: false }
);
import { FadeImage } from "@/components/motion/FadeImage";

const typeLabels: Record<string, string> = {
  lehrer: "Lehrer",
  ereignis: "Ereignis",
  falle: "Falle",
};

const typeBadgeStyles: Record<string, string> = {
  lehrer: "bg-gold/15 text-gold border-gold/40",
  ereignis: "bg-event/30 text-foreground border-event/60",
  falle: "bg-trap/30 text-foreground border-trap/60",
};

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Preload modal chunk on mount so first click opens instantly
  useEffect(() => {
    import("./CardDetailModal");
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className="bg-muted/60 border-border flex flex-col items-center justify-center rounded-xl border px-6 py-24 text-center">
        <p className="font-display text-foreground text-xl font-semibold mb-2">
          Keine Karten gefunden
        </p>
        <p className="font-body text-muted-foreground text-sm">
          Deine Suchkriterien ergaben keine Treffer.
        </p>
      </div>
    );
  }

  const visibleCards = cards.slice(0, visibleCount);
  const hasMore = visibleCount < cards.length;

  return (
    <>
      <div className="font-body text-muted-foreground mb-6 text-sm">
        <strong className="text-foreground">{cards.length}</strong> Karten gefunden
      </div>

      <m.ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
        <AnimatePresence mode="popLayout">
          {visibleCards.map((card) => (
            <m.li
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setSelectedCard(card)}
                className="group block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              >
                <LazyCardTilt className="relative">
                  {/* HIER IST DIE ÄNDERUNG: Hover-Effekte auf dem Container */}
                                     <div
                    className="rounded-2xl overflow-hidden border border-transparent shadow-lg shadow-black/50 transition-all duration-800 duration-500 ease-out group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-gold/15"
                    style={{
                      WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <FadeImage
                      src={card.imageUrl}
                      alt={`Karte ${card.name}`}
                      width={590}
                      height={860}
                      unoptimized
                      draggable={false}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="w-full h-auto rounded-2xl block select-none pointer-events-none"
                    />
                  </div>
                </LazyCardTilt>

                <div className="mt-3 px-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-display text-foreground text-sm md:text-base font-semibold tracking-wide line-clamp-1 group-hover:text-gold transition-colors duration-300">
                      {card.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                     <span className="font-mono text-muted-foreground text-xs">
                        #{card.cardNumber.toString().padStart(3, '0')}
                     </span>
                     <span
                      className={cn(
                        "font-body inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] md:text-xs font-medium",
                        typeBadgeStyles[card.type] || "border-border text-muted-foreground bg-background"
                      )}
                    >
                      {typeLabels[card.type] || card.type}
                    </span>
                  </div>
                </div>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-gold/40 bg-gold/5 px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-500 ease-out hover:border-gold hover:bg-gold/15 hover:shadow-lg hover:shadow-gold/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="relative z-10">Mehr laden</span>
            <span className="relative z-10 text-gold/70 transition-colors duration-300 group-hover:text-gold">
              ({cards.length - visibleCount} verbleibend)
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
          </button>
          <span className="font-body text-xs text-muted-foreground">
            {visibleCount} von {cards.length} Karten
          </span>
        </div>
      )}

      <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
}