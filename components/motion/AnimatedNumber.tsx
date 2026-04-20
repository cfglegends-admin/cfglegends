"use client"

import { useSpring, useTransform, m, useMotionValue } from "framer-motion"
import { useEffect } from "react"

interface AnimatedNumberProps {
  value: number
  className?: string
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 25, mass: 1 })
  const display = useTransform(spring, (latest) => Math.round(latest).toString())

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <m.span className={className}>{display}</m.span>
}
