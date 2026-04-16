"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cfg-legends-score";
const STARTING_SCORE = 30;
const ADJUSTMENTS = [-5, -1, 1, 5] as const;

type PlayerKey = "player1" | "player2";

interface PlayerState {
  name: string;
  score: number;
}

interface ScoreState {
  player1: PlayerState;
  player2: PlayerState;
}

const defaultState: ScoreState = {
  player1: { name: "Spieler 1", score: STARTING_SCORE },
  player2: { name: "Spieler 2", score: STARTING_SCORE },
};

function isScoreState(value: unknown): value is ScoreState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const ok = (p: unknown) =>
    !!p &&
    typeof p === "object" &&
    typeof (p as Record<string, unknown>).name === "string" &&
    typeof (p as Record<string, unknown>).score === "number";
  return ok(v.player1) && ok(v.player2);
}

function getScoreColor(score: number): string {
  if (score <= 0) return "text-red-700 animate-pulse";
  if (score <= 9) return "text-red-500";
  if (score <= 19) return "text-yellow-400";
  return "text-gold";
}

export function Calculator() {
  const [state, setState] = useState<ScoreState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editing, setEditing] = useState<PlayerKey | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

  const resetScores = () => {
    if (typeof window !== "undefined" && !window.confirm("Beide Punktestände auf 30 zurücksetzen?")) {
      return;
    }
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
                <span
                  aria-live="polite"
                  aria-label={`${player.name}: ${player.score} Lehrkraft-Punkte`}
                  className={cn(
                    "font-mono text-6xl font-bold tabular-nums sm:text-7xl md:text-8xl",
                    getScoreColor(player.score)
                  )}
                >
                  {player.score}
                </span>
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
                    <button
                      key={delta}
                      type="button"
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
                    </button>
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
          onClick={resetScores}
          className="font-body text-muted-foreground hover:text-foreground hover:border-foreground/40 border-border rounded-md border px-4 py-2 text-sm"
        >
          Neues Spiel
        </button>
      </div>
    </div>
  );
}
