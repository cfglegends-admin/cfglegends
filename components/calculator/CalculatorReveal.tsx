"use client"

import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { Calculator } from "./Calculator";
import { Reveal } from "@/components/motion/Reveal";

export function CalculatorReveal() {
  return (
    <>
      <Reveal>
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Punkterechner
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-base md:text-lg">
            Behalte den Überblick über eure Lehrkraft-Punkte.
          </p>
          <p className="font-body text-muted-foreground mt-2 text-sm md:text-base">
            Tipp: Öffne den Vollbild-Modus und lege dein Handy flach auf den Tisch.
          </p>
        </header>
      </Reveal>
      <Reveal delay={0.1}>
        <Calculator />
        <div className="mt-8 flex justify-center">
          <Link
            href="/rechner"
            className="text-gold hover:text-gold-bright font-body inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Vollbild-Modus öffnen
          </Link>
        </div>
      </Reveal>
    </>
  );
}
