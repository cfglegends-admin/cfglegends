"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  ADJUSTMENTS,
  SCORE_STORAGE_KEY,
  STARTING_SCORE,
  defaultScoreState,
  getScoreColor,
  isScoreState,
  type PlayerKey,
  type ScoreState,
} from "@/lib/score";

export function Calculator() {
  const [state, setState] = useState<ScoreState>(defaultScoreState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editing, setEditing] = useState<PlayerKey | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCORE_STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isScoreState(parsed)) {
          setState(parsed);
        }
      }
    } catch {
      // ignore corrupted localStorage
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state, isLoaded]);

  const adjust = (player: PlayerKey, delta: number) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
    setState((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        score: Math.max(0, prev[player].score + delta),
      },
    }));
  };

  const setName = (player: PlayerKey, name: string) => {
    setState((prev) => ({ ...prev, [player]: { ...prev[player], name } }));
  };

  const handleReset = () => {
    setState((prev) => ({
      player1: { ...prev.player1, score: STARTING_SCORE },
      player2: { ...prev.player2, score: STARTING_SCORE },
    }));
  };

  const handleNameKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const players: { key: PlayerKey; align: "left" | "right" }[] = [
    { key: "player1", align: "left" },
    { key: "player2", align: "right" },
  ];

  return (
    <div className="bg-muted border-border border-t-gold rounded-2xl border border-t-2 p-6 md:p-8">
      <div className="grid grid-cols-2">
        {players.map(({ key, align }) => {
          const player = state[key];
          const isLeft = align === "left";
          return (
            <div
              key={key}
              className={cn(
                "flex flex-col gap-4 px-2 md:px-4",
                isLeft ? "border-border items-start border-r text-left" : "items-end text-right"
              )}
            >
              {editing === key ? (
                <input
                  autoFocus
                  type="text"
                  value={player.name}
                  onChange={(e) => setName(key, e.target.value)}
                  onBlur={() => setEditing(null)}
                  onKeyDown={handleNameKey}
                  maxLength={20}
                  className={cn(
                    "font-display bg-background text-foreground border-border w-full max-w-[12rem] rounded-md border px-2 py-1 text-lg tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright",
                    isLeft ? "text-left" : "text-right"
                  )}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(key)}
                  aria-label={`Name für ${player.name} ändern`}
                  className="font-display text-foreground/90 hover:text-gold text-lg tracking-wide"
                >
                  {player.name}
                </button>
              )}

              {isLoaded ? (
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <m.span
                      key={player.score}
                      initial={{ scale: 1.3, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      aria-live="polite"
                      aria-label={`${player.name}: ${player.score} Lehrkraft-Punkte`}
                      className={cn(
                        "font-mono text-6xl font-bold tabular-nums sm:text-7xl md:text-8xl inline-block",
                        getScoreColor(player.score)
                      )}
                    >
                      <AnimatedNumber value={player.score} />
                    </m.span>
                  </AnimatePresence>
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="bg-muted-foreground/20 my-1 h-[60px] w-[110px] animate-pulse rounded-md sm:h-[72px] sm:w-[130px] md:h-[96px] md:w-[170px]"
                />
              )}

              <div className="grid w-full max-w-[16rem] grid-cols-4 gap-2 md:gap-3">
                {ADJUSTMENTS.map((delta) => {
                  const isMinus = delta < 0;
                  const disabled = isMinus && player.score === 0;
                  return (
                    <m.button
                      key={delta}
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      transition={{ duration: 0.1 }}
                      onClick={() => adjust(key, delta)}
                      disabled={disabled}
                      aria-label={`${player.name} ${delta > 0 ? `+${delta}` : delta}`}
                      className={cn(
                        "font-mono inline-flex h-12 items-center justify-center rounded-md border text-base font-semibold tabular-nums md:h-14",
                        "disabled:cursor-not-allowed disabled:opacity-40",
                        isMinus
                          ? "border-trap text-trap enabled:hover:bg-trap enabled:hover:text-foreground"
                          : "border-gold text-gold enabled:hover:bg-gold enabled:hover:text-background"
                      )}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </m.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="font-body text-muted-foreground hover:text-foreground hover:border-foreground/40 border-border rounded-md border px-4 py-2 text-sm"
        >
          Neues Spiel
        </button>
      </div>

      <ConfirmDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
        title="Neues Spiel starten?"
        description="Beide Spieler werden auf 30 Lehrkraft-Punkte zurückgesetzt. Die Spielernamen bleiben erhalten."
        confirmLabel="Neu starten"
        cancelLabel="Abbrechen"
      />
    </div>
  );
}
