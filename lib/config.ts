import type { ComponentType, SVGProps } from "react";
import {
  AstronomieIcon,
  BiologieIcon,
  ChemieIcon,
  DeutschIcon,
  EnglischIcon,
  ErdkundeIcon,
  EwIcon,
  FranzoesischIcon,
  GeschichteIcon,
  InfoIcon,
  KunstIcon,
  LateinIcon,
  MatheIcon,
  MusikIcon,
  PhiloIcon,
  PhysikIcon,
  ReligionIcon,
  SowiIcon,
  SpanischIcon,
  SportIcon,
} from "@/components/icons";

export interface Subject {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ExampleCard {
  id: string;
  name: string;
  type: "lehrer" | "ereignis" | "falle";
  image: string;
}

export const subjects: Subject[] = [
  { name: "Philo", icon: PhiloIcon },
  { name: "Info", icon: InfoIcon },
  { name: "Deutsch", icon: DeutschIcon },
  { name: "EW", icon: EwIcon },
  { name: "Kunst", icon: KunstIcon },
  { name: "Astronomie", icon: AstronomieIcon },
  { name: "Biologie", icon: BiologieIcon },
  { name: "Chemie", icon: ChemieIcon },
  { name: "Englisch", icon: EnglischIcon },
  { name: "Erdkunde", icon: ErdkundeIcon },
  { name: "Latein", icon: LateinIcon },
  { name: "Mathe", icon: MatheIcon },
  { name: "Musik", icon: MusikIcon },
  { name: "Physik", icon: PhysikIcon },
  { name: "Religion", icon: ReligionIcon },
  { name: "SoWi", icon: SowiIcon },
  { name: "Spanisch", icon: SpanischIcon },
  { name: "Sport", icon: SportIcon },
  { name: "Französisch", icon: FranzoesischIcon },
  { name: "Geschichte", icon: GeschichteIcon },
];

export const exampleCards: ExampleCard[] = [
  { id: "103", name: "Mensa-Team", type: "ereignis", image: "/cards/103.png" },
  { id: "120", name: "Feueralarm", type: "falle", image: "/cards/120.png" },
  { id: "47", name: "Herr Zuber", type: "lehrer", image: "/cards/47.png" },
];
