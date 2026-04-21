"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/hooks/use-focus-trap";
import { CardTilt } from "@/components/motion/CardTilt";
import { type Card } from "@/lib/db/schema";

const typeLabels: Record<string, string> = {
  lehrer: "Lehrer",
  ereignis: "Ereignis",
  falle: "Falle",
};

const typeBadgeStyles: Record<string, string> = {
  lehrer: "bg-gold/15 text-gold border-gold/30",
  ereignis: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  falle: "bg-red-500/15 text-red-300 border-red-500/30",
};

const EASE = [0.22, 1, 0.36, 1] as const;

interface CardDetailModalProps {
  card: Card | null;
  onClose: () => void;
}

export function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const focusTrapRef = useFocusTrap(!!card);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (card) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [card]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && card) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {card && (
        <div
          ref={focusTrapRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Karte: ${card.name}`}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-8"
          style={{ zIndex: 9999, isolation: "isolate" }}
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
            onClick={onClose}
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(24px) saturate(1.2)",
              WebkitBackdropFilter: "blur(24px) saturate(1.2)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />

          {/* Desktop: Split-Layout */}
          <div
            className="relative hidden md:flex w-full max-w-4xl items-stretch justify-center gap-6"
            style={{ zIndex: 1, height: "min(80vh, 700px)" }}
          >
            {/* LEFT: Karte — explizite Breite via calc(), Safari-safe */}
            <m.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{
                opacity: 1, x: 0, scale: 1,
                transition: { duration: 0.4, ease: EASE },
              }}
              exit={{
                opacity: 0, x: -40, scale: 0.9,
                transition: { duration: 0.3, ease: EASE },
              }}
              className="shrink-0 self-stretch"
              style={{ width: "calc(min(80vh, 700px) * 59 / 86)" }}
            >
              <CardTilt maxTilt={14} className="h-full">
                <div
                  className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 border border-gold/20"
                  style={{ aspectRatio: "59 / 86" }}
                >
                  <Image
                    src={card.imageUrl}
                    alt={`Karte ${card.name}`}
                    fill
                    sizes="(max-width: 1280px) 35vw, 480px"
                    quality={90}
                    draggable={false}
                    className="object-cover select-none pointer-events-none"
                  />
                </div>
              </CardTilt>
            </m.div>

            {/* RIGHT: Liquid-Glass Info-Box */}
            <m.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{
                opacity: 1, x: 0, scale: 1,
                transition: { duration: 0.4, ease: EASE },
              }}
              exit={{
                opacity: 0, x: 40, scale: 0.95,
                transition: { duration: 0.3, ease: EASE },
              }}
              className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 min-w-0"
              style={{
                maxWidth: 480,
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Gold-Akzent-Linie oben */}
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent shrink-0" aria-hidden />

              {/* Close-Button */}
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="absolute right-3 top-3 z-10 rounded-full p-2 text-muted-foreground hover:text-gold hover:bg-white/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="mb-2 text-xs font-mono text-muted-foreground/80 uppercase tracking-[0.2em]">
                  #{card.cardNumber.toString().padStart(3, "0")}
                </div>

                <h2 className="font-display text-2xl lg:text-3xl font-semibold text-gold-metallic mb-4 pr-8 leading-tight">
                  {card.name}
                </h2>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-sm",
                      typeBadgeStyles[card.type] || "border-border text-muted-foreground"
                    )}
                  >
                    {typeLabels[card.type] || card.type}
                  </span>
                  {card.rarity && card.rarity !== "normal" && (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gold/10 text-gold border border-gold/30 backdrop-blur-sm">
                      {card.rarity === "golden" ? "Goldene Legende" : "Limitiert"}
                    </span>
                  )}
                </div>

                {card.type === "lehrer" && (card.ansage !== null || card.chill !== null) && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {card.ansage !== null && (
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Ansage</div>
                        <div className="font-mono text-xl font-semibold text-gold">{card.ansage}</div>
                      </div>
                    )}
                    {card.chill !== null && (
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Chill</div>
                        <div className="font-mono text-xl font-semibold text-gold">{card.chill}</div>
                      </div>
                    )}
                  </div>
                )}

                {(card.archetype || (card.dienstjahre !== null && card.dienstjahre !== undefined)) && (
                  <div className="mb-4 space-y-1.5">
                    {card.archetype && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Archetyp: </span>
                        <span className="text-foreground font-medium">{card.archetype}</span>
                      </div>
                    )}
                    {card.dienstjahre !== null && card.dienstjahre !== undefined && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Dienstjahre: </span>
                        <span className="text-foreground font-medium">{card.dienstjahre}</span>
                      </div>
                    )}
                  </div>
                )}

                {card.subjects && card.subjects.trim() && (
                  <div className="mb-4">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Fächer</div>
                    <div className="flex flex-wrap gap-1.5">
                      {card.subjects.split(",").map((subject) => (
                        <span
                          key={subject.trim()}
                          className="inline-flex items-center rounded-md px-2 py-0.5 text-xs bg-white/5 border border-white/10 text-foreground backdrop-blur-sm"
                        >
                          {subject.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {card.effect && card.effect.trim() && (
                  <div className="rounded-lg bg-white/5 border-l-2 border-gold p-3 text-sm leading-relaxed text-foreground/90 backdrop-blur-sm">
                    {card.effect}
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Mobile: scrollbares vertikales Layout */}
          <div
            className="relative flex md:hidden w-full flex-col"
            style={{ zIndex: 1, height: "100dvh" }}
          >
            {/* Close-Button — fixed oben rechts, immer sichtbar */}
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="fixed z-20 rounded-full bg-black/50 p-2.5 text-white/70 backdrop-blur-sm transition-colors hover:text-gold active:scale-95"
              style={{ zIndex: 10000, top: "max(1rem, env(safe-area-inset-top, 1rem))", right: "max(1rem, env(safe-area-inset-right, 1rem))" }}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollbarer Content-Bereich */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-12"
              style={{ WebkitOverflowScrolling: "touch", paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))" }}
            >
              {/* Karten-Bild */}
              <m.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 0.35, ease: EASE },
                }}
                exit={{
                  opacity: 0, y: -10, scale: 0.95,
                  transition: { duration: 0.3, ease: EASE },
                }}
                className="mx-auto mb-5 w-56"
              >
                <div
                  className="relative w-full overflow-hidden rounded-2xl shadow-xl shadow-black/50 border border-gold/20"
                  style={{ aspectRatio: "59 / 86" }}
                >
                  <Image
                    src={card.imageUrl}
                    alt={`Karte ${card.name}`}
                    fill
                    sizes="224px"
                    quality={85}
                    draggable={false}
                    className="object-cover select-none pointer-events-none"
                  />
                </div>
              </m.div>

              {/* Info-Box */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1, y: 0,
                  transition: { duration: 0.35, ease: EASE, delay: 0.08 },
                }}
                exit={{
                  opacity: 0, y: 20,
                  transition: { duration: 0.3, ease: EASE },
                }}
                className="relative rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent shrink-0" aria-hidden />

                <div className="p-5">
                  <div className="mb-2 text-xs font-mono text-muted-foreground/80 uppercase tracking-[0.2em]">
                    #{card.cardNumber.toString().padStart(3, "0")}
                  </div>

                  <h2 className="font-display text-2xl font-semibold text-gold-metallic mb-4 leading-tight">
                    {card.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-sm",
                        typeBadgeStyles[card.type] || "border-border text-muted-foreground"
                      )}
                    >
                      {typeLabels[card.type] || card.type}
                    </span>
                    {card.rarity && card.rarity !== "normal" && (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gold/10 text-gold border border-gold/30 backdrop-blur-sm">
                        {card.rarity === "golden" ? "Goldene Legende" : "Limitiert"}
                      </span>
                    )}
                  </div>

                  {card.type === "lehrer" && (card.ansage !== null || card.chill !== null) && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {card.ansage !== null && (
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Ansage</div>
                          <div className="font-mono text-xl font-semibold text-gold">{card.ansage}</div>
                        </div>
                      )}
                      {card.chill !== null && (
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Chill</div>
                          <div className="font-mono text-xl font-semibold text-gold">{card.chill}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {(card.archetype || (card.dienstjahre !== null && card.dienstjahre !== undefined)) && (
                    <div className="mb-4 space-y-1.5">
                      {card.archetype && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Archetyp: </span>
                          <span className="text-foreground font-medium">{card.archetype}</span>
                        </div>
                      )}
                      {card.dienstjahre !== null && card.dienstjahre !== undefined && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Dienstjahre: </span>
                          <span className="text-foreground font-medium">{card.dienstjahre}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {card.subjects && card.subjects.trim() && (
                    <div className="mb-4">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Fächer</div>
                      <div className="flex flex-wrap gap-1.5">
                        {card.subjects.split(",").map((subject) => (
                          <span
                            key={subject.trim()}
                            className="inline-flex items-center rounded-md px-2 py-0.5 text-xs bg-white/5 border border-white/10 text-foreground backdrop-blur-sm"
                          >
                            {subject.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.effect && card.effect.trim() && (
                    <div className="rounded-lg bg-white/5 border-l-2 border-gold p-3 text-sm leading-relaxed text-foreground/90 backdrop-blur-sm">
                      {card.effect}
                    </div>
                  )}
                </div>
              </m.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
