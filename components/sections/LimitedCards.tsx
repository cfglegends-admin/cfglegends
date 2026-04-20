import { getLimitedCards } from "@/lib/actions/limits";
import type { LimitedCard } from "@/lib/db/schema";
import { LimitedCardsContent } from "./LimitedCardsContent";

async function loadCards(): Promise<LimitedCard[] | null> {
  try {
    return await getLimitedCards();
  } catch {
    return null;
  }
}

export async function LimitedCards() {
  const cards = await loadCards();

  return <LimitedCardsContent cards={cards} />;
}
