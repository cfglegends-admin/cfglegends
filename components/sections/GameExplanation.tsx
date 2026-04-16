import { Clock, Swords, Users, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Swords,
    title: "Strategie",
    description: "Deck bauen, Lehrer einsetzen, Fallen legen — jede Entscheidung zählt.",
  },
  {
    icon: Clock,
    title: "20 Minuten",
    description: "Schnell genug für eine große Pause, lang genug für echtes Taktieren.",
  },
  {
    icon: Users,
    title: "2 Spieler",
    description: "Direktes Duell. Gewinnt, wer den Gegner zuerst auf null Punkte bringt.",
  },
];

export function GameExplanation() {
  return (
    <div>
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
        <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
          Das Spiel
        </h2>
        <p className="font-body text-foreground/85 mt-6 text-base leading-relaxed md:text-lg">
          CFG Legends ist unser Kartenspiel für die große Pause. Zwei Spieler, je 30
          Lehrkraft-Punkte, ein Deck aus 30 Karten — Lehrer mit Ansage und Chill, Ereignisse, die
          das Spielfeld drehen, und Fallen, die den Gegner kalt erwischen. Wer zuerst auf null
          Punkte fällt, verliert. Die Karten basieren auf echten Fächern und Schul-Situationen, die
          wir alle kennen. Strategisch genug, um wieder zu spielen, kompakt genug für eine Runde
          vor der nächsten Stunde.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="bg-muted border-border flex flex-col items-start gap-3 rounded-lg border p-6"
          >
            <Icon className="text-gold h-7 w-7" aria-hidden="true" />
            <h3 className="font-display text-foreground text-xl font-semibold tracking-wide">
              {title}
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
