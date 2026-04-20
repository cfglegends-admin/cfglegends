"use client"

import { m, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type ReactNode, useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CardTiltProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function CardTilt({ children, className, maxTilt = 12 }: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setCanHover(mq.matches)
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt])

  const glowBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) => {
      const pctX = ((x + 0.5) * 100).toFixed(1)
      const pctY = ((y + 0.5) * 100).toFixed(1)
      return `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(212,175,55,0.22), transparent 55%)`
    }
  )

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !canHover) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (!canHover) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={cn("group", className)}
      data-card-tilt=""
    >
      <div className="h-full" style={{ transform: "translateZ(30px)" }}>{children}</div>

      <m.div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
    </m.div>
  )
}
