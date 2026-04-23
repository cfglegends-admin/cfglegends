import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { GameExplanation } from "@/components/sections/GameExplanation";
import { SubjectsGrid } from "@/components/sections/SubjectsGrid";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { LimitedCards } from "@/components/sections/LimitedCards";
import { Downloads } from "@/components/sections/Downloads";
import { News } from "@/components/sections/News";
import { CalculatorReveal } from "@/components/calculator/CalculatorReveal";
import { getPublishedNews } from "@/lib/actions/news";

export const revalidate = 60; 

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CFG Legends",
  description: "Das Kartenspiel für die große Pause. Strategie, Lehrer und Lehrkraft-Punkte.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cfg-legends.vercel.app",
  inLanguage: "de",
};

export default async function Home() {
  let newsEntries: Awaited<ReturnType<typeof getPublishedNews>> = [];
  try {
    newsEntries = await getPublishedNews(3);
  } catch {
    newsEntries = [];
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Section id="spielerklaerung">
        <GameExplanation />
      </Section>
      {newsEntries.length > 0 && (
        <>
          <SectionDivider />
          <Section id="news">
            <News entries={newsEntries} />
          </Section>
        </>
      )}
      <SectionDivider />
      <Section id="karten">
        <CardShowcase />
      </Section>
      <SectionDivider />
      <Section id="rechner">
        <CalculatorReveal />
      </Section>
      <SectionDivider />
      <Section id="faecher">
        <SubjectsGrid />
      </Section>
      <SectionDivider />
      <Section id="limitierung">
        <LimitedCards />
      </Section>
      <SectionDivider />
      <Section id="download">
        <Downloads />
      </Section>
    </>
  );
}
