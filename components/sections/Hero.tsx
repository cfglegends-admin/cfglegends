"use client"

import { m } from "framer-motion"
import Link from "next/link"
import { durations, easings } from "@/lib/motion"
import { HeroLogo } from "./HeroLogo"

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <h1 className="sr-only">CFG Legends — Das Kartenspiel für die große Pause</h1>

        <HeroLogo />

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, delay: 0.7, ease: easings.cinematic }}
          className="max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          Das Kartenspiel für die große Pause
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, delay: 1.0, ease: easings.cinematic }}
        >
          <Link
            href="/regeln"
            className="btn-gold group relative inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 font-display font-semibold text-background transition-colors hover:bg-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            Regeln entdecken
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </m.div>
      </div>
    </section>
  )
}
