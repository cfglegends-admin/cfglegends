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

const rarityLabels: Record<string, string> = {
  normal: "Normal",
  golden: "Golden",
  limitiert: "Limitiert",
};

const typeLabels: Record<string, string> = {
  lehrer: "Lehrer",
  ereignis: "Ereignis",
  falle: "Falle",
};

const typeBadgeStyles: Record<string, string> = {
  lehrer: "bg-gold/20 text-gold border-gold/40",
  ereignis: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  falle: "bg-red-500/20 text-red-300 border-red-500/40",
};

interface CardDetailModalProps {
  card: Card | null;
  onClose: () => void;
}

export function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const focusTrapRef = useFocusTrap(!!card);
  const isLehrer = card?.type === "lehrer";

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
          aria-label={card ? `Karte: ${card.name}` : undefined}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-8"
          style={{ zIndex: 9999, isolation: "isolate" }}
        >
          {/* Backdrop — heavy blur for depth-of-field effect */}
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

          {/* Split-Layout Container */}
          <div
            className="relative flex w-full max-w-5xl items-stretch gap-3 md:gap-8"
            style={{ zIndex: 1 }}
          >
            {/* LEFT: Floating card with 3D tilt (desktop only) */}
            <m.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="hidden md:flex md:w-[40%] lg:w-[38%] items-stretch"
            >
              <CardTilt maxTilt={14} className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/80">
                <Image
                  src={card.imageUrl}
                  alt={`Karte ${card.name}`}
                  width={924}
                  height={1316}
                  sizes="(max-width: 1024px) 40vw, 320px"
                  quality={90}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </CardTilt>
            </m.div>

            {/* RIGHT: Info box — glass morphism */}
            <m.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[90vh] flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 md:max-h-[85vh] md:rounded-r-2xl md:rounded-l-none"
              style={{
                background: "linear-gradient(135deg, rgba(20, 20, 20, 0.85) 0%, rgba(30, 30, 30, 0.75) 100%)",
                backdropFilter: "blur(40px) saturate(1.3)",
                WebkitBackdropFilter: "blur(40px) saturate(1.3)",
              }}
            >
              {/* Top specular highlight — liquid glass edge */}
              <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white md:right-4 md:top-4"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Mobile: card image inline */}
              <div className="flex justify-center p-4 pb-0 md:hidden">
                <div className="relative w-48 overflow-hidden rounded-xl shadow-lg shadow-black/40">
                  <Image
                    src={card.imageUrl}
                    alt={`Karte ${card.name}`}
                    width={924}
                    height={1316}
                    sizes="192px"
                    quality={85}
                    draggable={false}
                    className="w-full h-auto pointer-events-none select-none"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 pt-5 md:p-10">
                <div className="mb-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  #{card.cardNumber.toString().padStart(3, "0")}
                </div>
                <h2 className="font-display text-gold-metallic mb-4 pr-10 text-2xl font-semibold md:text-4xl">
                  {card.name}
                </h2>

                {/* Type + Rarity Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                      typeBadgeStyles[card.type] || "border-border text-muted-foreground"
                    )}
                  >
                    {typeLabels[card.type] || card.type}
                  </span>
                  {card.rarity !== "normal" && (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gold/10 text-gold border border-gold/30">
                      {rarityLabels[card.rarity] || card.rarity}
                    </span>
                  )}
                </div>

                {/* Stats (lehrer only) */}
                {isLehrer && (card.ansage !== null || card.chill !== null) && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {card.ansage !== null && (
                      <div className="rounded-xl border border-white/[0.06] p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ansage</div>
                        <div className="font-mono text-2xl font-semibold text-gold">{card.ansage}</div>
                      </div>
                    )}
                    {card.chill !== null && (
                      <div className="rounded-xl border border-white/[0.06] p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Chill</div>
                        <div className="font-mono text-2xl font-semibold text-gold">{card.chill}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Archetype + Dienstjahre */}
                {(card.archetype || (card.dienstjahre !== null && card.dienstjahre !== undefined)) && (
                  <div className="mb-6 space-y-2">
                    {card.archetype && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Archetyp: </span>
                        <span className="text-foreground font-medium">{card.archetype}</span>
                      </div>
                    )}
                    {card.dienstjahre !== null && card.dienstjahre !== undefined && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Dienstjahre: </span>
                        <span className="text-foreground font-medium">{card.dienstjahre}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Subjects */}
                {card.subjects && (
                  <div className="mb-6">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Fächer</div>
                    <div className="flex flex-wrap gap-2">
                      {card.subjects.split(",").map((subject) => (
                        <span
                          key={subject.trim()}
                          className="inline-flex items-center rounded-md px-2.5 py-1 text-xs text-foreground border border-white/[0.08]"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          {subject.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Effect Text */}
                {card.effect && (
                  <div
                    className="rounded-xl border-l-2 border-gold p-4 text-sm leading-relaxed text-foreground"
                    style={{ background: "rgba(212,175,55,0.06)" }}
                  >
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
