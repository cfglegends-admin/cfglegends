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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(24px) saturate(1.2)",
              WebkitBackdropFilter: "blur(24px) saturate(1.2)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />

          {/* Desktop: Split-Layout — feste Höhe, beide Kinder füllen sie */}
          <div
            className="relative hidden md:flex w-full max-w-4xl items-stretch justify-center gap-6"
            style={{ zIndex: 1, height: "min(80vh, 700px)" }}
          >
            {/* LEFT: Karte — Höhe vom Container, Breite aus aspectRatio */}
            <m.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="shrink-0 self-stretch"
            >
              <CardTilt maxTilt={14} className="h-full">
                <div
                  className="relative h-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 border border-gold/20"
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

            {/* RIGHT: Liquid-Glass Info-Box — füllt restliche Breite + volle Höhe */}
            <m.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10"
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

                {/* Type + Rarity Badges */}
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

                {/* Lehrer-Stats */}
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

                {/* Dienstjahre + Archetype */}
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

                {/* Subjects */}
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

                {/* Effect Text */}
                {card.effect && card.effect.trim() && (
                  <div className="rounded-lg bg-white/5 border-l-2 border-gold p-3 text-sm leading-relaxed text-foreground/90 backdrop-blur-sm">
                    {card.effect}
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Mobile: gestapeltes Layout */}
          <div
            className="relative flex flex-col md:hidden w-full max-w-md gap-4"
            style={{ zIndex: 1 }}
          >
            {/* Close-Button mobile */}
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="absolute -top-1 right-0 z-10 rounded-full p-2 text-muted-foreground hover:text-gold hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-center px-4 pt-4">
              <div
                className="relative w-48 overflow-hidden rounded-2xl shadow-lg border border-gold/20"
                style={{ aspectRatio: "59 / 86" }}
              >
                <Image
                  src={card.imageUrl}
                  alt={`Karte ${card.name}`}
                  fill
                  sizes="192px"
                  quality={85}
                  draggable={false}
                  className="object-cover select-none pointer-events-none"
                />
              </div>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/10 mx-4 mb-4 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                maxHeight: "60vh",
              }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent shrink-0" aria-hidden />

              <div className="overflow-y-auto p-4 pt-5">
                <div className="mb-2 text-xs font-mono text-muted-foreground/80 uppercase tracking-[0.2em]">
                  #{card.cardNumber.toString().padStart(3, "0")}
                </div>

                <h2 className="font-display text-2xl font-semibold text-gold-metallic mb-4 pr-8 leading-tight">
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
      )}
    </AnimatePresence>,
    document.body
  );
}
