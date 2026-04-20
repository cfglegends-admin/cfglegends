import type { Metadata } from "next";
import { getPublishedCards } from "@/lib/actions/cards";
import { CardFilters } from "@/components/karten/CardFilters";
import { CardGrid } from "@/components/karten/CardGrid";

export const metadata: Metadata = {
  title: "Karten-Galerie | CFG Legends",
  description: "Entdecke alle Karten von CFG Legends. Durchsuche Lehrer, Ereignisse und Fallen.",
  robots: {
    index: false,
    follow: false,
  },
};

interface KartenPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function KartenPage(props: KartenPageProps) {
  const searchParams = await props.searchParams;
  
  // Extract typed filters
  const filters = {
    type: searchParams.type,
    fach: searchParams.fach,
    q: searchParams.q,
    sort: searchParams.sort,
  };

  const cards = await getPublishedCards(filters);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12">
          <h1 className="font-display text-gold-metallic text-3xl font-semibold tracking-wide md:text-5xl">
            Karten-Galerie
          </h1>
          <p className="font-body text-foreground/85 mt-4 max-w-2xl text-base md:text-lg">
            Entdecke das gesamte Sortiment an Lehrkräften, Ereignissen und fiesen Fallen. 
            Nutze die Filter, um dein Deck strategisch zu planen.
          </p>
        </header>

        <section aria-label="Karten Filter und Liste">
          <CardFilters />
          <CardGrid cards={cards} />
        </section>
      </div>
    </div>
  );
}
