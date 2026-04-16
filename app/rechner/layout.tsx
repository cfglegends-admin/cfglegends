import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Punkterechner",
  description: "Vollbild-Punkterechner für CFG Legends — Spieltisch-Modus.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RechnerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
