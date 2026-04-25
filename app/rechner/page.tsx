import type { Metadata } from "next";
import { ScoreTracker } from "@/components/calculator/ScoreTracker";

export const metadata: Metadata = {
  title: "Punkte-Rechner",
  description: "Berechne deinen CFG-Legends-Score und verfolge den Punktestand im Spiel.",
  alternates: { canonical: "/rechner" },
};

export default function RechnerPage() {
  return <ScoreTracker />;
}
