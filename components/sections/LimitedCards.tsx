import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLimitedCards } from "@/lib/actions/limits";
import type { LimitedCard } from "@/lib/db/schema";

// Dynamically import the client component to reduce initial bundle size
const LimitedCardsContent = dynamic(() => import("./LimitedCardsContent").then(mod => ({ default: mod.LimitedCardsContent })), {
  loading: () => (
    <div className="mx-auto max-w-2xl">
      <p className="font-body text-muted-foreground py-8 text-center text-base">
        Limitierungsliste wird geladen…
      </p>
    </div>
  ),
});

async function loadCards(): Promise<LimitedCard[] | null> {
  try {
    return await getLimitedCards();
  } catch {
    return null;
  }
}

async function LimitedCardsData() {
  const cards = await loadCards();
  return <LimitedCardsContent cards={cards} />;
}

export async function LimitedCards() {
  return (
    <Suspense fallback={null}>
      <LimitedCardsData />
    </Suspense>
  );
}
