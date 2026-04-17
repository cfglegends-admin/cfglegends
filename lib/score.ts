export const SCORE_STORAGE_KEY = "cfg-legends-score";
export const STARTING_SCORE = 30;
export const ADJUSTMENTS = [-5, -1, 1, 5] as const;

export type PlayerKey = "player1" | "player2";

export interface PlayerState {
  name: string;
  score: number;
}

export interface ScoreState {
  player1: PlayerState;
  player2: PlayerState;
}

export const defaultScoreState: ScoreState = {
  player1: { name: "Spieler 1", score: STARTING_SCORE },
  player2: { name: "Spieler 2", score: STARTING_SCORE },
};

export function isScoreState(value: unknown): value is ScoreState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const ok = (p: unknown) =>
    !!p &&
    typeof p === "object" &&
    typeof (p as Record<string, unknown>).name === "string" &&
    typeof (p as Record<string, unknown>).score === "number";
  return ok(v.player1) && ok(v.player2);
}

export function getScoreColor(score: number): string {
  if (score <= 0) return "text-red-700 animate-pulse";
  if (score <= 4) return "text-red-600";
  if (score <= 9) return "text-red-400";
  if (score <= 14) return "text-orange-400";
  if (score <= 19) return "text-yellow-300";
  if (score <= 24) return "text-green-300";
  return "text-emerald-400";
}
