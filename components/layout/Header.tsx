"use client"

import Image from "next/image"
import Link from "next/link"
import { useScroll, useMotionValueEvent, m } from "framer-motion"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { MobileNav } from "@/components/layout/MobileNav"

const navItems = [
  { label: "Regeln", href: "/regeln" },
  { label: "Karten", href: "/karten" },
  { label: "Rechner", href: "/rechner" },
  { label: "News", href: "/#news" },
  { label: "Download", href: "/#download" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <m.header
      animate={{
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 0.4)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        borderBottomColor: scrolled ? "rgba(63, 63, 70, 1)" : "rgba(63, 63, 70, 0)",
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CFG Legends — Startseite">
          <Image
            src="/assets/logo-static-sm.png"
            alt=""
            width={56}
            height={56}
            quality={80}
            sizes="56px"
            className="h-12 w-12 md:h-14 md:w-14"
          />
          <span className="font-display text-foreground text-base font-semibold tracking-wide md:text-lg">
            CFG Legends
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:flex">
          <ul className="flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link font-body text-muted-foreground hover:text-gold text-sm font-medium md:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </m.header>
  )
}
