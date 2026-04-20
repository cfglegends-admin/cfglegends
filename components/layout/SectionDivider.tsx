"use client"

import { m } from "framer-motion"

export function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden>
      <div className="relative h-px">
        <m.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.98, 1, 0.98] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
