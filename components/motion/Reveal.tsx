"use client"

import { m, type Variants } from "framer-motion"
import { type ReactNode } from "react"
import { fadeUpVariants, viewportConfig, staggerContainerVariants, staggerItemVariants } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
}

export function Reveal({ children, className, delay = 0, variants = fadeUpVariants }: RevealProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  )
}

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </m.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div variants={staggerItemVariants} className={className}>
      {children}
    </m.div>
  )
}
