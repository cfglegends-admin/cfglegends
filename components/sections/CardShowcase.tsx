"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { exampleCards, type ExampleCard } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { CardTilt } from "@/components/motion/CardTilt";

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
      <Reveal>
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Karten
          </h2>
          <p className="font-body text-foreground/85 mt-6 text-base md:text-lg">
            Über 100 einzigartige Karten — Lehrer, Ereignisse und Fallen.
          </p>
        </header>
      </Reveal>

      <StaggerContainer className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6 md:mx-0 md:justify-center md:gap-8 md:overflow-visible md:px-0">
        {exampleCards.map((card) => (
          <StaggerItem
            key={card.id}
            className="flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col gap-4 md:w-[280px]"
          >
            <CardTilt className="relative">
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-transparent shadow-lg shadow-black/50 transition-all duration-500 ease-out group-hover:border-gold/40 group-hover:shadow-xl group-hover:shadow-gold/15"
                style={{ aspectRatio: "59 / 86" }}
              >
                <Image
                  src={card.image}
                  alt={`Karte ${card.name}`}
                  fill
                  draggable={false}
                  quality={85}
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover select-none pointer-events-none"
                />
              </div>
            </CardTilt>
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
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.2}>
        <div className="mt-8 flex justify-center md:mt-12">
          <Link
            href="/karten"
            className="text-gold hover:text-gold-bright font-body inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            Alle Karten ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
