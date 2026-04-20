"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Minimize, RotateCcw, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
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

export function ScoreTracker() {
  const [state, setState] = useState<ScoreState>(defaultScoreState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editing, setEditing] = useState<PlayerKey | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const acquire = async () => {
      if (!("wakeLock" in navigator)) return;
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release().catch(() => {});
          return;
        }
        wakeLockRef.current = sentinel;
        setWakeLockActive(true);
        sentinel.addEventListener("release", () => {
          if (wakeLockRef.current === sentinel) {
            wakeLockRef.current = null;
            setWakeLockActive(false);
          }
        });
      } catch {
        // permission denied or not available
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        acquire();
      }
    };

    acquire();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      const current = wakeLockRef.current;
      wakeLockRef.current = null;
      current?.release().catch(() => {});
      setWakeLockActive(false);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setFullscreenSupported(!!document.fullscreenEnabled);
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const adjust = useCallback((player: PlayerKey, delta: number) => {
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
  }, []);

  const setName = (player: PlayerKey, name: string) => {
    setState((prev) => ({ ...prev, [player]: { ...prev[player], name } }));
  };

  const handleReset = () => {
    setState((prev) => ({
      player1: { ...prev.player1, score: STARTING_SCORE },
      player2: { ...prev.player2, score: STARTING_SCORE },
    }));
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // user gesture or permission issue — ignore
    }
  };

  const handleNameKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const renderPlayer = (key: PlayerKey) => {
    const player = state[key];
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-2 sm:gap-4">
        {editing === key ? (
          <input
            autoFocus
            type="text"
            value={player.name}
            onChange={(e) => setName(key, e.target.value)}
            onBlur={() => setEditing(null)}
            onKeyDown={handleNameKey}
            maxLength={20}
            className="font-display bg-background text-foreground border-border w-full max-w-[14rem] rounded-md border px-3 py-1 text-center text-base tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(key)}
            aria-label={`Name für ${player.name} ändern`}
            className="font-display text-foreground/80 hover:text-gold text-base tracking-wide"
          >
            {player.name}
          </button>
        )}

        {isLoaded ? (
          <span
            aria-live="polite"
            aria-label={`${player.name}: ${player.score} Lehrkraft-Punkte`}
            className={cn(
              "font-mono text-7xl leading-none font-bold tabular-nums sm:text-8xl",
              getScoreColor(player.score)
            )}
          >
            {player.score}
          </span>
        ) : (
          <div
            aria-hidden="true"
            className="bg-muted-foreground/20 h-[72px] w-[130px] animate-pulse rounded-md sm:h-[96px] sm:w-[170px]"
          />
        )}

        <div className="flex w-full max-w-md items-center justify-center gap-2 sm:gap-3">
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
                  "font-mono inline-flex min-h-[56px] min-w-[56px] flex-1 items-center justify-center rounded-md border text-lg font-semibold tabular-nums transition-transform select-none active:scale-95",
                  "disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100",
                  isMinus
                    ? "border-red-500/50 text-red-400 enabled:hover:bg-red-500/20 enabled:active:bg-red-500/30"
                    : "border-gold/50 text-gold enabled:hover:bg-gold/20 enabled:active:bg-gold/30"
                )}
              >
                {delta > 0 ? `+${delta}` : delta}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background fixed inset-0 z-[60] flex flex-col overflow-hidden md:flex-row">
      <section
        aria-label={`${state.player1.name} (gegenüber)`}
        className="flex flex-1 rotate-180 items-center justify-center md:rotate-0"
      >
        {renderPlayer("player1")}
      </section>

      <div
        className="border-border relative h-px w-full shrink-0 border-t md:h-full md:w-px md:border-t-0 md:border-l"
        aria-hidden="true"
      >
        <span className="bg-background absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 px-2 py-2">
          <Image
            src="/assets/logo.png"
            alt=""
            width={24}
            height={24}
            quality={80}
            sizes="24px"
            className="h-5 w-5 opacity-40"
          />
        </span>
      </div>

      <section
        aria-label={state.player2.name}
        className="flex flex-1 items-center justify-center"
      >
        {renderPlayer("player2")}
      </section>

      {wakeLockActive && (
        <div
          aria-live="polite"
          className="text-muted-foreground absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[11px]"
        >
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Bildschirm bleibt an</span>
        </div>
      )}

      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        {fullscreenSupported && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Vollbild verlassen" : "Vollbild aktivieren"}
            className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-8 w-8 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Maximize className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => setResetOpen(true)}
          aria-label="Neues Spiel"
          className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-8 w-8 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>

        <Link
          href="/"
          aria-label="Rechner schließen"
          className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-8 w-8 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Link>
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
