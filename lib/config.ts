export interface Subject {
  name: string;
  icon: string;
}

export interface LimitedCard {
  name: string;
  maxCopies: number;
}

export interface ExampleCard {
  id: string;
  name: string;
  type: "lehrer" | "ereignis" | "falle";
  image: string;
}

export const subjects: Subject[] = [
  { name: "Philo", icon: "Brain" },
  { name: "Info", icon: "Cpu" },
  { name: "Deutsch", icon: "BookOpen" },
  { name: "EW", icon: "Sprout" },
  { name: "Kunst", icon: "Palette" },
  { name: "Astronomie", icon: "Telescope" },
  { name: "Biologie", icon: "Microscope" },
  { name: "Chemie", icon: "FlaskConical" },
  { name: "Englisch", icon: "Languages" },
  { name: "Erdkunde", icon: "Globe" },
  { name: "Latein", icon: "Scroll" },
  { name: "Mathe", icon: "Calculator" },
  { name: "Musik", icon: "Music" },
  { name: "Physik", icon: "Atom" },
  { name: "Religion", icon: "BookHeart" },
  { name: "SoWi", icon: "Users" },
  { name: "Spanisch", icon: "Languages" },
  { name: "Sport", icon: "Dumbbell" },
  { name: "Französisch", icon: "Languages" },
  { name: "Geschichte", icon: "Landmark" },
];

export const limitedCards: LimitedCard[] = [
  { name: "Mertens", maxCopies: 1 },
  { name: "Drübert", maxCopies: 1 },
];

export const exampleCards: ExampleCard[] = [
  { id: "103", name: "Mensa-Team", type: "ereignis", image: "/cards/103.png" },
  { id: "120", name: "Feueralarm", type: "falle", image: "/cards/120.png" },
  { id: "128", name: "Fächerkarte", type: "lehrer", image: "/cards/128.png" },
];
