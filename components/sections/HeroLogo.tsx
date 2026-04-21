"use client"

import { m, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { easings } from "@/lib/motion"

const LOGO_SIZES = "(max-width: 768px) 384px, (max-width: 1024px) 520px, 640px"

const BLUR = {
  static: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAKlBMVEVMaXG5iTq4gymnizeseC6yei+qcyO+hi2oaxvTo0WYXReDURiqcSLJlTpZkZRqAAAADXRSTlMAHTYLjHBk9+iE3YDGqtU5sQAAAAlwSFlzAAAomgAAKJoBFzohsgAAADVJREFUeJxNy7kNACAMBMHz/4D7bxeJBDaZaIEvkQt5lRFAFjNpBNY90coQzZhWAdjXcn7vAR1AAOuyhdrnAAAAAElFTkSuQmCC",
  main: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAHlBMVEXCjz6wdi3EjjmqcyS5fynLkCqDURihaB2dYhjKljoPIe4GAAAACXRSTlMBU0Zq9jaA1OyO66DwAAAACXBIWXMAACiaAAAomgEXOiGyAAAALklEQVR4nG2LMRIAMAiDoonV/P/DPacuZYEF4ENm5jpkKzba6g2OPARQPIf1ngsOYQCBEU5nfQAAAABJRU5ErkJggg==",
  crown: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAACVBMVEVMaXHFmEDQp0FoLawvAAAAA3RSTlMAHDwzbuUEAAAACXBIWXMAACiaAAAomgEXOiGyAAAAFUlEQVR4nGNgQAKMjFCaiQnKIhoAAAHmAAlx5MymAAAAAElFTkSuQmCC",
  iconsLeft: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAABlBMVEVMaXGsfjY0OMT4AAAAAnRSTlMAKTQhVVQAAAAJcEhZcwAAKJoAACiaARc6IbIAAAAUSURBVHicY2DADRgZ0RkMcAY6AAAA/QAGaNgAVAAAAABJRU5ErkJggg==",
  iconsRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAABlBMVEVMaXGicixvcV+EAAAAAnRSTlMAKEMmZcIAAAAJcEhZcwAAKJoAACiaARc6IbIAAAASSURBVHicY2AgBBgZMRhYlAEAAOAABi0gwioAAAAASUVORK5CYII=",
} as const

export function HeroLogo() {
  const prefersReduced = useReducedMotion()
  const [canHover, setCanHover] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 60, damping: 20, mass: 1 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5])

  const crownX = useTransform(smoothX, [-0.5, 0.5], [-28, 28])
  const crownY = useTransform(smoothY, [-0.5, 0.5], [-22, 22])

  const mainX = useTransform(smoothX, [-0.5, 0.5], [-14, 14])
  const mainY = useTransform(smoothY, [-0.5, 0.5], [-10, 10])

  const iconsLeftX = useTransform(smoothX, [-0.5, 0.5], [-6, 6])
  const iconsLeftY = useTransform(smoothY, [-0.5, 0.5], [-5, 5])

  const iconsRightX = useTransform(smoothX, [-0.5, 0.5], [-6, 6])
  const iconsRightY = useTransform(smoothY, [-0.5, 0.5], [-5, 5])

  const { scrollY } = useScroll()
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.88])
  const scrollOpacity = useTransform(scrollY, [0, 400, 700], [1, 0.85, 0.4])
  const scrollY_transform = useTransform(scrollY, [0, 600], [0, -40])

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setCanHover(mq.matches)
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!canHover || prefersReduced) return

    function onMouseMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [canHover, prefersReduced, mouseX, mouseY])

  if (prefersReduced) {
    return (
      <div className="relative flex items-center justify-center">
        <Image
          src="/assets/logo-static.png"
          alt="CFG Legends"
          width={640}
          height={640}
          priority
          quality={90}
          sizes={LOGO_SIZES}
          placeholder="blur"
          blurDataURL={BLUR.static}
          className="h-96 w-96 md:h-[32rem] md:w-[32rem] lg:h-[40rem] lg:w-[40rem]"
        />
      </div>
    )
  }

  return (
    <m.div
      style={{
        scale: scrollScale,
        opacity: scrollOpacity,
        y: scrollY_transform,
      }}
      className="relative"
    >
      {/* Container mit Tilt */}
      <m.div
        style={{ rotateX, rotateY }}
        className="relative"
      >
        {/* Idle-Animation Wrapper */}
        <m.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 0.6, 0, -0.6, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            y: { duration: 8, ease: "easeInOut", repeat: Infinity },
            rotate: { duration: 14, ease: "easeInOut", repeat: Infinity },
            scale: { duration: 6, ease: "easeInOut", repeat: Infinity },
          }}
          className="relative"
        >
          <div className="relative h-96 w-96 md:h-[32rem] md:w-[32rem] lg:h-[40rem] lg:w-[40rem]">

            {/* Layer 1 (hinterste): Fächersymbole links */}
            <m.div
              style={{ x: iconsLeftX, y: iconsLeftY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.2, ease: easings.cinematic }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/logo-icons-left.png"
                alt=""
                fill
                priority
                quality={90}
                sizes={LOGO_SIZES}
                placeholder="blur"
                blurDataURL={BLUR.iconsLeft}
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </m.div>

            {/* Layer 1 (hinterste): Fächersymbole rechts */}
            <m.div
              style={{ x: iconsRightX, y: iconsRightY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.2, ease: easings.cinematic }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/logo-icons-right.png"
                alt=""
                fill
                priority
                quality={90}
                sizes={LOGO_SIZES}
                placeholder="blur"
                blurDataURL={BLUR.iconsRight}
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </m.div>

            {/* Layer 2 (mittlere): Hauptwappen */}
            <m.div
              style={{
                x: mainX,
                y: mainY,
                filter: "drop-shadow(0 0 30px rgba(212,175,55,0.25)) drop-shadow(0 20px 40px rgba(0,0,0,0.55))",
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: easings.cinematic }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/logo-main.png"
                alt="CFG Legends"
                fill
                priority
                quality={90}
                sizes={LOGO_SIZES}
                placeholder="blur"
                blurDataURL={BLUR.main}
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </m.div>

            {/* Layer 3 (vorderste): Schullogo oben */}
            <m.div
              style={{
                x: crownX,
                y: crownY,
                filter: "drop-shadow(0 0 20px rgba(212,175,55,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
              }}
              initial={{ opacity: 0, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.35, ease: easings.cinematic }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/logo-crown.png"
                alt=""
                fill
                priority
                quality={90}
                sizes={LOGO_SIZES}
                placeholder="blur"
                blurDataURL={BLUR.crown}
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </m.div>

            {/* Einmaliger Shine-Sweep beim Laden */}
            <m.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "120%", opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.2, delay: 1.2, ease: easings.cinematic, times: [0, 0.5, 1] }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ mixBlendMode: "screen" }}
              aria-hidden
            >
              <div
                className="absolute inset-y-0 w-1/3 -skew-x-12"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,235,180,0.4) 50%, transparent 100%)",
                }}
              />
            </m.div>
          </div>
        </m.div>
      </m.div>
    </m.div>
  )
}
