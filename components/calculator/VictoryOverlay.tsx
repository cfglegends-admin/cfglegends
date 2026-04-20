"use client"

import { AnimatePresence, m } from "framer-motion"
import { useEffect } from "react"

interface Props {
  winnerName: string | null
  onDismiss: () => void
}

export function VictoryOverlay({ winnerName, onDismiss }: Props) {
  useEffect(() => {
    if (winnerName) {
      const t = window.setTimeout(onDismiss, 2500)
      return () => window.clearTimeout(t)
    }
  }, [winnerName, onDismiss])

  return (
    <AnimatePresence>
      {winnerName && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <m.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-center"
          >
            <div className="font-display mb-2 text-sm tracking-[0.3em] text-gold/70 uppercase">
              Sieg
            </div>
            <div className="font-display text-gold-metallic text-5xl font-bold tracking-wide md:text-7xl">
              {winnerName}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

