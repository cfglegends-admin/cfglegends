"use client"

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { type Card } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { CardDetailModal } from "./CardDetailModal";
import { CardTilt } from "@/components/motion/CardTilt";
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

  return (
    <>
      <div className="font-body text-muted-foreground mb-6 text-sm">
        <strong className="text-foreground">{cards.length}</strong> Karten gefunden
      </div>

      <m.ul layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <m.li
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setSelectedCard(card)}
                className="group w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
              >
                <div className="flex flex-col gap-3 rounded-xl transition-all duration-300">
                  <CardTilt className="relative">
                    <div className="bg-muted relative aspect-[924/1316] w-full overflow-hidden rounded-lg shadow-lg shadow-black/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-gold/20 group-hover:shadow-xl group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                      <div className="absolute inset-0 z-10 border-2 border-transparent transition-colors duration-300 group-hover:border-gold/50 rounded-lg pointer-events-none" />
                      <FadeImage
                        src={card.imageUrl}
                        alt={`Karte ${card.name}`}
                        fill
                        draggable={false}
                        quality={85}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover select-none pointer-events-none"
                      />
                    </div>
                  </CardTilt>

                  <div className="px-1">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-display text-foreground text-sm md:text-base font-semibold tracking-wide line-clamp-1 group-hover:text-gold transition-colors">
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
                </div>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
}
