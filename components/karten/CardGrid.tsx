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
                className="group block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              >
                <CardTilt className="relative">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl border border-transparent shadow-lg shadow-black/50 transition-all duration-500 ease-out group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-gold/15 group-hover:-translate-y-1"
                    style={{ aspectRatio: "59 / 86" }}
                  >
                    <FadeImage
                      src={card.imageUrl}
                      alt={`Karte ${card.name}`}
                      fill
                      draggable={false}
                      quality={85}
                      sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                      className="object-cover select-none pointer-events-none"
                    />
                  </div>
                </CardTilt>

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

      <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
}
