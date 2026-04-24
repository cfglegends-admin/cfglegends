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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (activated) {
    return <CardTilt className={className} maxTilt={maxTilt}>{children}</CardTilt>
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
