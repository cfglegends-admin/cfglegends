import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { GameExplanation } from "@/components/sections/GameExplanation";
import { SubjectsGrid } from "@/components/sections/SubjectsGrid";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { LimitedCards } from "@/components/sections/LimitedCards";
import { Downloads } from "@/components/sections/Downloads";
import { News } from "@/components/sections/News";
import { Calculator } from "@/components/calculator/Calculator";
import { getPublishedNews } from "@/lib/actions/news";

export default async function Home() {
  let newsEntries: Awaited<ReturnType<typeof getPublishedNews>> = [];
  try {
    newsEntries = await getPublishedNews(3);
  } catch {
    newsEntries = [];
  }

  return (
    <>
      <Hero />
      <Section id="spielerklaerung" withPattern>
        <GameExplanation />
      </Section>
      {newsEntries.length > 0 && (
        <Section id="news">
          <News entries={newsEntries} />
        </Section>
      )}
      <Section id="karten" withPattern>
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
          <p className="font-body text-muted-foreground mt-2 text-sm md:text-base">
            Tipp: Öffne den Vollbild-Modus und lege dein Handy flach auf den Tisch.
          </p>
        </header>
        <Calculator />
        <div className="mt-8 flex justify-center">
          <Link
            href="/rechner"
            className="text-gold hover:text-gold-bright font-body inline-flex items-center gap-2 text-base font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Vollbild-Modus öffnen
          </Link>
        </div>
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
