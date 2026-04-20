import type { Variants } from "framer-motion"

export const easings = {
  cinematic: [0.22, 1, 0.36, 1] as const,
  heavy: [0.16, 1, 0.3, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
}

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  epic: 1.6,
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.cinematic, ease: easings.cinematic },
  },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: durations.slow, ease: easings.cinematic },
  },
}

export const heroLogoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: durations.epic, ease: easings.heavy },
  },
}

export const viewportConfig = {
  once: true,
  margin: "-100px 0px -100px 0px" as const,
}

export function getDangerLevel(score: number): "safe" | "warn" | "critical" | "dead" {
  if (score <= 0) return "dead"
  if (score <= 4) return "critical"
  if (score <= 9) return "warn"
  return "safe"
}
