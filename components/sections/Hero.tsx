"use client"

import { m } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { durations, easings } from "@/lib/motion"

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

        <m.div
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: durations.epic, ease: easings.heavy }}
        >
          <m.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src="/assets/logo.png"
              alt="CFG Legends Wappen"
              width={600}
              height={600}
              priority
              quality={90}
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 448px"
              className="h-72 w-72 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]"
            />
          </m.div>
        </m.div>

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
