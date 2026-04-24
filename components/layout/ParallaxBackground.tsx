"use client"

import { useReducedMotion, useScroll, useTransform, m } from "framer-motion"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  createdAt: number
  size: number
}

const ALLOWED_PATHS = ["/", "/karten", "/regeln", "/impressum", "/datenschutz"]

function isAllowed(pathname: string): boolean {
  if (pathname.startsWith("/admin")) return false
  if (pathname.startsWith("/rechner")) return false
  if (ALLOWED_PATHS.includes(pathname)) return true
  if (pathname.startsWith("/karten/")) return true
  return false
}

export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const patternRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const [isPointerFine, setIsPointerFine] = useState(true)
  const particlesRef = useRef<Particle[]>([])
  const particlePoolRef = useRef<HTMLDivElement[]>([])

  // Track scroll-based parallax offset (written by framer-motion, read by rAF)
  const scrollOffset = useRef({ x: 0, y: 0 })

  const patternScrollX = useTransform(scrollY, [0, 6000], [0, -260])
  const patternScrollY = useTransform(scrollY, [0, 6000], [0, -520])

  // Sync scroll parallax values into ref (no re-renders)
  useEffect(() => {
    const unsubX = patternScrollX.on("change", (v) => { scrollOffset.current.x = v })
    const unsubY = patternScrollY.on("change", (v) => { scrollOffset.current.y = v })
    return () => { unsubX(); unsubY() }
  }, [patternScrollX, patternScrollY])

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 1], [0.1, 0.18, 0.14, 0.2])
  const yDeep = useTransform(scrollYProgress, [0, 1], [0, -950])

  // Check pointer device
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setIsPointerFine(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Drift start time — stable across effect re-runs
  const driftStart = useRef(performance.now())

  // Set background-position on both pattern elements (called from rAF or scroll)
  const applyPatternPosition = useCallback((now: number) => {
    const drift = prefersReducedMotion ? 0 : ((now - driftStart.current) / 28000) * 200
    const x = scrollOffset.current.x + drift
    const y = scrollOffset.current.y + drift
    const tx = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    if (patternRef.current) patternRef.current.style.transform = tx
    if (glowRef.current) glowRef.current.style.transform = tx
  }, [prefersReducedMotion])

  // Main effect: glow, particles, and pattern drift in one rAF loop
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cursorActive = isAllowed(pathname) && isPointerFine && !prefersReducedMotion

    const transparentMask =
      "radial-gradient(1px 1px at 0 0, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)"

    type TrailPoint = { x: number; y: number; t: number; dampingZone: "none" | "tilt" | "subject" }
    const trail: TrailPoint[] = []
    let particleId = 0
    let lastSpawnTime = 0
    let lastPos = { x: 0, y: 0 }
    let alive = true
    let raf = 0

    let cursorX = 0
    let cursorY = 0
    let lastMoveTime = 0
    let glowOpacity = 0
    let dampingZone: "none" | "tilt" | "subject" = "none"

    const IDLE_DELAY = 400
    const FADE_IN_RATE = 0.14
    const FADE_OUT_RATE = 0.04
    const TRAIL_MAX_AGE = 800
    const MAX_OPACITY = 0.22

    const tick = () => {
      if (!alive) return
      const now = performance.now()

      // Pattern drift (always runs, even without cursor)
      applyPatternPosition(now)

      if (!cursorActive) {
        raf = requestAnimationFrame(tick)
        return
      }

      // Glow opacity: fade in fast, fade out slow after idle
      const timeSinceMove = now - lastMoveTime
      const target = lastMoveTime > 0 && timeSinceMove < IDLE_DELAY ? MAX_OPACITY : 0
      const diff = target - glowOpacity

      if (Math.abs(diff) > 0.001) {
        glowOpacity += diff * (diff > 0 ? FADE_IN_RATE : FADE_OUT_RATE)
      } else {
        glowOpacity = target
      }

      el.style.setProperty("--glowOpacity", glowOpacity.toFixed(4))

      // Glow trail mask
      if (glowOpacity > 0.005) {
        trail.push({ x: cursorX, y: cursorY, t: now, dampingZone })
        while (trail.length > 30) trail.shift()

        const recent = trail.filter((p) => now - p.t <= TRAIL_MAX_AGE).slice(-10)
        const dm = dampingZone === "subject" ? 0.2 : dampingZone === "tilt" ? 0.4 : 1

        const stops = recent.map((p, idx) => {
          const age = now - p.t
          const a = Math.max(0, 1 - age / TRAIL_MAX_AGE)
          const isNewest = idx === recent.length - 1
          const strength = (isNewest ? 1 : 0.6) * a * dm * (glowOpacity / MAX_OPACITY)
          const r1 = 48
          const r2 = 120
          return `radial-gradient(${r2}px ${r2}px at ${p.x}px ${p.y}px, rgba(212,175,55,${strength.toFixed(3)}) 0%, rgba(212,175,55,${(strength * 0.55).toFixed(3)}) ${r1}px, rgba(212,175,55,0) ${r2}px)`
        })

        el.style.setProperty("--glowMask", stops.length ? stops.join(",") : transparentMask)
      } else {
        el.style.setProperty("--glowMask", transparentMask)
      }

      // Particle movement and cleanup — direct DOM, no React state
      const parts = particlesRef.current
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        if (now - p.createdAt > 1500) {
          parts.splice(i, 1)
        } else {
          p.x += p.vx * 16.67 / 1000
          p.y += p.vy * 16.67 / 1000
        }
      }

      // Update pooled DOM elements
      const pool = particlePoolRef.current
      for (let i = 0; i < pool.length; i++) {
        const el = pool[i]
        const p = parts[i]
        if (!p) {
          el.style.display = "none"
          continue
        }
        el.style.display = ""
        const age = now - p.createdAt
        const life = age / 1500
        const pOpacity = Math.sin(life * Math.PI) * 0.7
        const pScale = 0.6 + Math.sin(life * Math.PI) * 0.4
        el.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0) scale(${pScale})`
        el.style.opacity = String(pOpacity)
        el.style.width = `${p.size}px`
        el.style.height = `${p.size}px`
      }

      raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (!cursorActive) return
      const target = event.target as Element | null
      const now = performance.now()

      cursorX = event.clientX
      cursorY = event.clientY
      lastMoveTime = now

      if (target?.closest("[data-subjects-grid-item]")) {
        dampingZone = "subject"
      } else if (target?.closest("[data-card-tilt]")) {
        dampingZone = "tilt"
      } else {
        dampingZone = "none"
      }

      // Particle spawning
      const timeSinceLastSpawn = now - lastSpawnTime
      const spawnDelay = dampingZone === "tilt" ? 90 : dampingZone === "subject" ? Infinity : 45

      if (timeSinceLastSpawn > spawnDelay) {
        const dx = event.clientX - lastPos.x
        const dy = event.clientY - lastPos.y
        const speed = Math.hypot(dx, dy)

        if (speed > 2 && dampingZone !== "subject") {
          const angle = Math.atan2(-dy, -dx) + (Math.random() - 0.5) * 0.6
          const velocity = 20 + Math.random() * 30
          const size = dampingZone === "tilt" ? 1.5 + Math.random() * 1.5 : 2 + Math.random() * 2

          const parts = particlesRef.current
          if (parts.length >= 20) parts.shift()
          parts.push({
            id: particleId++,
            x: event.clientX + (Math.random() - 0.5) * 8,
            y: event.clientY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            createdAt: now,
            size,
          })
          lastSpawnTime = now
        }
      }

      lastPos = { x: event.clientX, y: event.clientY }
    }

    if (cursorActive) {
      window.addEventListener("pointermove", onMove, { passive: true })
    }

    // Pause rAF when tab is hidden to save CPU/battery
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        driftStart.current = performance.now() - ((scrollOffset.current.x) / 200 * 28000)
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    raf = requestAnimationFrame(tick)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("visibilitychange", onVisibility)
      el.style.setProperty("--glowOpacity", "0")
      el.style.setProperty("--glowMask", transparentMask)
    }
  }, [prefersReducedMotion, pathname, isPointerFine, applyPatternPosition])

  const POOL_SIZE = 20
  const particlePool = useMemo(() =>
    Array.from({ length: POOL_SIZE }, (_, i) => (
      <div
        key={i}
        ref={(el) => { if (el) particlePoolRef.current[i] = el }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          display: 'none',
          willChange: 'transform, opacity',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,235,180,0.95) 0%, rgba(212,175,55,0.6) 60%, transparent 100%)',
          boxShadow: '0 0 6px rgba(212,175,55,0.5)',
          pointerEvents: 'none' as const,
        }}
      />
    )), [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 0: Deep background — slowest parallax */}
      <m.div
        style={{ y: yDeep, opacity: 0.04 }}
        className="absolute -top-[80%] left-0 h-[420%] w-full"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(212,175,55,0.2) 0%, transparent 40%)",
          }}
        />
      </m.div>

      {/* Layer 1: Main pattern — drift + scroll parallax via GPU transform */}
      <m.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity }}
      >
        <div
          ref={patternRef}
          className="absolute -inset-[600px] will-change-transform"
          style={{
            backgroundImage: "url('/assets/patterns/bg.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </m.div>

      {/* Metallic specular sweeps (cinematic light shimmer on gold) */}
      <m.div
        className="absolute -inset-[20%]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["-22%", "22%", "-22%"],
                opacity: [0.06, 0.13, 0.06],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.14) 42%, rgba(212,175,55,0.10) 55%, transparent 72%)",
          transform: "rotate(-8deg)",
          mixBlendMode: "screen",
        }}
      />

      <m.div
        className="absolute -inset-[25%]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["18%", "-18%", "18%"],
                opacity: [0.03, 0.08, 0.03],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{
          background:
            "linear-gradient(70deg, transparent 0%, rgba(212,175,55,0.10) 38%, rgba(255,255,255,0.10) 50%, transparent 66%)",
          transform: "rotate(10deg)",
          mixBlendMode: "screen",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 45%, transparent 72%)",
        }}
      />

      {/* Side vignette + center depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 35%, rgba(10,10,10,0.55) 100%), linear-gradient(90deg, rgba(10,10,10,0.50) 0%, transparent 18%, transparent 82%, rgba(10,10,10,0.50) 100%)",
        }}
      />

      {/* Cursor glow (pattern only) — keep above vignette so it reads clearly */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: prefersReducedMotion || !isAllowed(pathname) || !isPointerFine ? 0.12 : "var(--glowOpacity, 0)",
          filter: "brightness(1.25) saturate(1.3) contrast(1.04)",
          mixBlendMode: "screen",
          WebkitMaskImage:
            "var(--glowMask, radial-gradient(1px 1px at 0 0, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%))",
          maskImage:
            "var(--glowMask, radial-gradient(1px 1px at 0 0, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%))",
        }}
      >
        <div
          ref={glowRef}
          className="absolute -inset-[600px] will-change-transform"
          style={{
            backgroundImage: "url('/assets/patterns/bg.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Particle pool — pre-created DOM elements, updated via ref in rAF */}
      {!prefersReducedMotion && isAllowed(pathname) && isPointerFine && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          {particlePool}
        </div>
      )}
    </div>
  )
}
