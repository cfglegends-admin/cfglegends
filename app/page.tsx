import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { GameExplanation } from "@/components/sections/GameExplanation";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { LimitedCards } from "@/components/sections/LimitedCards";
import { Downloads } from "@/components/sections/Downloads";
import { News } from "@/components/sections/News";
import { CalculatorReveal } from "@/components/calculator/CalculatorReveal";
import { getPublishedNews } from "@/lib/actions/news";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import below-fold animated sections to reduce initial bundle size
const SubjectsGrid = dynamic(() => import("@/components/sections/SubjectsGrid").then(mod => ({ default: mod.SubjectsGrid })), {
  loading: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  ),
});

export const metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CFG Legends",
  description: "Das Kartenspiel für die große Pause. Strategie, Lehrer und Lehrkraft-Punkte.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cfg-legends.vercel.app",
  inLanguage: "de",
};

async function NewsSection() {
  let newsEntries: Awaited<ReturnType<typeof getPublishedNews>> = [];
  try {
    newsEntries = await getPublishedNews(3);
  } catch {
    newsEntries = [];
  }

  if (newsEntries.length === 0) return null;

  return (
    <>
      <SectionDivider />
      <Section id="news">
        <News entries={newsEntries} />
      </Section>
    </>
  );
}

export default async function Home() {
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
      <Suspense fallback={null}>
        <NewsSection />
      </Suspense>
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
