"use client"

import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

interface Feature {
  numeral: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    numeral: "I",
    title: "Strategie",
    description: "Deck bauen, Lehrer einsetzen, Fallen legen — jede Entscheidung zählt.",
  },
  {
    numeral: "II",
    title: "20 Minuten",
    description: "Schnell genug für eine große Pause, lang genug für echtes Taktieren.",
  },
  {
    numeral: "III",
    title: "2 Spieler",
    description: "Direktes Duell. Gewinnt, wer den Gegner zuerst auf null Punkte bringt.",
  },
];

export function GameExplanation() {
  return (
    <div>
      <Reveal>
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Das Spiel
          </h2>
          <p className="font-body text-foreground/80 mt-6 text-base leading-relaxed md:text-lg">
            CFG Legends ist unser Kartenspiel für die große Pause. Zwei Spieler, je 30
            Lehrkraft-Punkte, ein Deck aus 30 Karten — Lehrer mit Ansage und Chill, Ereignisse, die
            das Spielfeld drehen, und Fallen, die den Gegner kalt erwischen. Wer zuerst auf null
            Punkte fällt, verliert. Die Karten basieren auf echten Fächern und Schul-Situationen, die
            wir alle kennen. Strategisch genug, um wieder zu spielen, kompakt genug für eine Runde
            vor der nächsten Stunde.
          </p>
        </header>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {features.map(({ numeral, title, description }) => (
          <StaggerItem key={title}>
            {/* Art Deco box: gold top border, subtle gradient background, no rounded corners */}
            <div
              className="flex h-full flex-col gap-5 p-6 sm:p-8"
              style={{
                borderTop: "2px solid rgba(212,175,55,0.45)",
                background: "linear-gradient(160deg, rgba(212,175,55,0.07) 0%, rgba(10,10,10,0.45) 55%)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                borderRadius: "6px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 1px 0 rgba(212,175,55,0.08) inset",
              }}
            >
              {/* Roman numeral — oversized, ghosted gold */}
              <span
                aria-hidden="true"
                className="font-display font-bold leading-none select-none"
                style={{ fontSize: "3.75rem", color: "rgba(212,175,55,0.45)", lineHeight: 1 }}
              >
                {numeral}
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-foreground/90 text-sm font-semibold tracking-[0.2em] uppercase">
                  {title}
                </h3>

                {/* Short Art Deco separator line */}
                <div
                  aria-hidden="true"
                  className="h-px w-7"
                  style={{ background: "rgba(212,175,55,0.5)" }}
                />

                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
