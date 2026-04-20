"use client"

import { useScroll, useTransform, m } from "framer-motion"
import { useRef } from "react"

export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 4000], [0, -2400])
  const opacity = useTransform(scrollY, [0, 500, 2000, 4000], [0.1, 0.14, 0.12, 0.16])

  const yDeep = useTransform(scrollY, [0, 4000], [0, -800])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 0: Deep background — slowest parallax */}
      <m.div
        style={{ y: yDeep, opacity: 0.04 }}
        className="absolute -top-[30%] left-0 h-[200%] w-full"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(212,175,55,0.2) 0%, transparent 40%)",
          }}
        />
      </m.div>

      {/* Layer 1: Main pattern */}
      <m.div
        style={{ y, opacity }}
        className="absolute -top-[50%] left-0 h-[250%] w-full"
      >
        <div
          className="h-full w-full animate-bg-drift"
          style={{
            backgroundImage: "url('/assets/patterns/bg.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "320px 320px",
          }}
        />
      </m.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(10,10,10,0.4) 100%)",
        }}
      />
    </div>
  )
}
