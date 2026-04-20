"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Check, Maximize, Minimize, RotateCcw, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { VictoryOverlay } from "@/components/calculator/VictoryOverlay";
import { fireVictoryConfetti } from "@/lib/confetti";
import { getDangerLevel } from "@/lib/motion";
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

interface PlayerZoneProps {
  playerKey: PlayerKey;
  player: ScoreState["player1"];
  leader: "p1" | "p2" | "tie";
  editing: PlayerKey | null;
  setEditing: (key: PlayerKey | null) => void;
  isLoaded: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  nameSaved: boolean;
  setNameSaved: (value: boolean) => void;
  setName: (player: PlayerKey, name: string) => void;
  adjust: (player: PlayerKey, delta: number) => void;
  handleNameKey: (event: KeyboardEvent<HTMLInputElement>) => void;
  getAmbientColor: (score: number) => string;
}

function PlayerZone({
  playerKey,
  player,
  leader,
  editing,
  setEditing,
  isLoaded,
  isTouch,
  prefersReducedMotion,
  nameSaved,
  setNameSaved,
  setName,
  adjust,
  handleNameKey,
  getAmbientColor,
}: PlayerZoneProps) {
  const score = player.score;
  const danger = getDangerLevel(score);
  const leading =
    leader === "tie"
      ? "tie"
      : leader === (playerKey === "player1" ? "p1" : "p2")
        ? "yes"
        : "no";

  const dragY = useMotionValue(0);
  const hintOpacity = useTransform(dragY, [-60, 0, 60], [0.35, 0, 0.35]);
  const hintColor = useTransform(dragY, [-60, 0, 60], [
    "rgba(212, 175, 55, 1)",
    "rgba(0,0,0,0)",
    "rgba(239, 68, 68, 1)",
  ]);

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-2 sm:gap-4",
        danger === "warn" && "danger-warn",
        danger === "critical" && "danger-critical",
        danger === "dead" && "danger-dead"
      )}
      data-leading={leading}
    >
      {/* Ambient lighting */}
      <m.div
        className="pointer-events-none absolute inset-0 -z-20"
        animate={{
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${getAmbientColor(score)} 0%, transparent 70%)`,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Lead glow */}
      <m.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          opacity: leader === "tie" ? 0.3 : leading === "yes" ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 40%, transparent 75%)",
        }}
      />

      {/* Losing darken */}
      <m.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          opacity: leader === "tie" ? 0 : leading === "no" ? 0.15 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "rgba(0,0,0,0.2)" }}
      />

      {editing === playerKey ? (
        <input
          autoFocus
          type="text"
          value={player.name}
          onChange={(e) => setName(playerKey, e.target.value)}
          onBlur={() => {
            setEditing(null);
            setNameSaved(true);
            window.setTimeout(() => setNameSaved(false), 1500);
          }}
          onKeyDown={handleNameKey}
          maxLength={20}
          className="font-display bg-background text-foreground border-border w-full max-w-[14rem] rounded-md border px-3 py-1 text-center text-base tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        />
      ) : (
        <div className="relative inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing(playerKey)}
            aria-label={`Name für ${player.name} ändern`}
            className="font-display text-foreground/80 hover:text-gold text-base tracking-wide"
          >
            <m.span animate={{ color: nameSaved ? "#D4AF37" : undefined }} transition={{ duration: 0.4 }}>
              {player.name}
            </m.span>
          </button>
          <AnimatePresence>
            {nameSaved && (
              <m.span
                initial={{ opacity: 0, scale: 0.5, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold"
              >
                <Check className="h-3 w-3" />
              </m.span>
            )}
          </AnimatePresence>
        </div>
      )}

      {isLoaded ? (
        <div className="relative">
          <m.div
            aria-live="polite"
            aria-label={`${player.name}: ${score} Lehrkraft-Punkte`}
            drag={isTouch && !prefersReducedMotion ? "y" : false}
            dragConstraints={{ top: -60, bottom: 60 }}
            dragElastic={0.6}
            dragSnapToOrigin
            style={{ y: dragY, touchAction: "none" }}
            onDragEnd={(_, info) => {
              const dy = info.offset.y;
              const velocity = info.velocity.y;
              if (dy < -30 || velocity < -300) {
                adjust(playerKey, dy < -80 || velocity < -600 ? 5 : 1);
                if ("vibrate" in navigator) navigator.vibrate(15);
              } else if (dy > 30 || velocity > 300) {
                adjust(playerKey, dy > 80 || velocity > 600 ? -5 : -1);
                if ("vibrate" in navigator) navigator.vibrate(15);
              }
            }}
            className={cn(
              "select-none",
              isTouch && !prefersReducedMotion ? "cursor-grab active:cursor-grabbing" : ""
            )}
          >
            <m.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl"
              style={{
                opacity: hintOpacity,
                background: hintColor,
                filter: "blur(24px)",
              }}
            />
            <span
              className={cn(
                "font-mono text-7xl leading-none font-bold tabular-nums sm:text-8xl",
                getScoreColor(score)
              )}
            >
              {score}
            </span>
          </m.div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="bg-muted-foreground/20 h-[72px] w-[130px] animate-pulse rounded-md sm:h-[96px] sm:w-[170px]"
        />
      )}

      <div className="flex w-full max-w-md items-center justify-center gap-2 sm:gap-3">
        {ADJUSTMENTS.map((delta) => {
          const isMinus = delta < 0;
          const disabled = isMinus && score === 0;
          return (
            <button
              key={delta}
              type="button"
              onClick={() => adjust(playerKey, delta)}
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
}

export function ScoreTracker() {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<ScoreState>(defaultScoreState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editing, setEditing] = useState<PlayerKey | null>(null);
  const [nameSaved1, setNameSaved1] = useState(false);
  const [nameSaved2, setNameSaved2] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [winner, setWinner] = useState<"p1" | "p2" | null>(null);
  const [victoryVisible, setVictoryVisible] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const score1 = state.player1.score;
  const score2 = state.player2.score;
  const leader: "p1" | "p2" | "tie" = score1 > score2 ? "p1" : score2 > score1 ? "p2" : "tie";

  const isTouchRef = useRef(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const set = (v: boolean) => {
      isTouchRef.current = v;
      setIsTouch(v);
    };
    set(mq.matches);
    const handler = (e: MediaQueryListEvent) => set(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
    setWinner(null);
    setVictoryVisible(false);
  };

  useEffect(() => {
    if (winner) return;
    if (score1 <= 0 && score2 > 0) {
      setWinner("p2");
      setVictoryVisible(true);
    } else if (score2 <= 0 && score1 > 0) {
      setWinner("p1");
      setVictoryVisible(true);
    }
  }, [score1, score2, winner, prefersReducedMotion]);

  useEffect(() => {
    if (!winner) return;
    const origin: "top" | "bottom" = "bottom";
    fireVictoryConfetti(origin);
  }, [winner]);

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

  function getAmbientColor(score: number): string {
    if (score <= 0) return "rgba(185, 28, 28, 0.18)";
    if (score <= 4) return "rgba(220, 38, 38, 0.12)";
    if (score <= 9) return "rgba(239, 68, 68, 0.08)";
    if (score <= 14) return "rgba(251, 146, 60, 0.07)";
    if (score <= 19) return "rgba(234, 179, 8, 0.06)";
    if (score <= 24) return "rgba(134, 239, 172, 0.06)";
    return "rgba(52, 211, 153, 0.08)";
  }

  return (
    <div className="bg-background fixed inset-0 z-[60] flex flex-col overflow-hidden md:flex-row">
      <VictoryOverlay
        winnerName={
          victoryVisible
            ? winner === "p1"
              ? state.player1.name
              : winner === "p2"
                ? state.player2.name
                : null
            : null
        }
        onDismiss={() => {
          setVictoryVisible(false);
          setResetOpen(true);
        }}
      />
      <section
        aria-label={`${state.player1.name} (gegenüber)`}
        className="flex flex-1 rotate-180 items-center justify-center md:rotate-0"
      >
        <PlayerZone
          playerKey="player1"
          player={state.player1}
          leader={leader}
          editing={editing}
          setEditing={setEditing}
          isLoaded={isLoaded}
          isTouch={isTouch}
          prefersReducedMotion={!!prefersReducedMotion}
          nameSaved={nameSaved1}
          setNameSaved={setNameSaved1}
          setName={setName}
          adjust={adjust}
          handleNameKey={handleNameKey}
          getAmbientColor={getAmbientColor}
        />
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
        <PlayerZone
          playerKey="player2"
          player={state.player2}
          leader={leader}
          editing={editing}
          setEditing={setEditing}
          isLoaded={isLoaded}
          isTouch={isTouch}
          prefersReducedMotion={!!prefersReducedMotion}
          nameSaved={nameSaved2}
          setNameSaved={setNameSaved2}
          setName={setName}
          adjust={adjust}
          handleNameKey={handleNameKey}
          getAmbientColor={getAmbientColor}
        />
      </section>

      {wakeLockActive && (
        <div
          aria-live="polite"
          className="text-muted-foreground absolute bottom-4 left-3 inline-flex items-center gap-1.5 text-[11px] sm:bottom-3"
        >
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Bildschirm bleibt an</span>
        </div>
      )}

      <div className="absolute right-3 bottom-4 flex items-center gap-2 sm:bottom-3">
        {fullscreenSupported && (
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Vollbild verlassen" : "Vollbild aktivieren"}
            className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-10 w-10 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
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
          className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-10 w-10 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>

        <Link
          href="/"
          aria-label="Rechner schließen"
          className="text-muted-foreground hover:text-gold border-border hover:border-gold inline-flex h-10 w-10 items-center justify-center rounded-md border bg-muted/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
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
