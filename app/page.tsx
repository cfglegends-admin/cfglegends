import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { GameExplanation } from "@/components/sections/GameExplanation";
import { SubjectsGrid } from "@/components/sections/SubjectsGrid";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { LimitedCards } from "@/components/sections/LimitedCards";
import { Downloads } from "@/components/sections/Downloads";
import { Calculator } from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="spielerklaerung" withPattern>
        <GameExplanation />
      </Section>
      <Section id="karten">
        <CardShowcase />
      </Section>
      <Section id="rechner">
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-4xl">
            Punkterechner
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-base md:text-lg">
            Behalte den Überblick über eure Lehrkraft-Punkte.
          </p>
        </header>
        <Calculator />
      </Section>
      <Section id="faecher" withPattern>
        <SubjectsGrid />
      </Section>
      <Section id="limitierung">
        <LimitedCards />
      </Section>
      <Section id="download" withPattern>
        <Downloads />
      </Section>
    </>
  );
}
