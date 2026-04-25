"use client"

import { type ReactNode, useRef, useState, useEffect } from "react"
import { CardTilt } from "./CardTilt"

interface LazyCardTiltProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function LazyCardTilt({ children, className, maxTilt }: LazyCardTiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activated, setActivated] = useState(false)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setCanHover(mq.matches)
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Smaller margin on mobile — less aggressive pre-loading reduces scroll jank
    const margin = window.innerWidth < 768 ? "50px" : "200px"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (activated && canHover) {
    return <CardTilt className={className} maxTilt={maxTilt}>{children}</CardTilt>
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
