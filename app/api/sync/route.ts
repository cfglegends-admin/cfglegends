import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards, news, limitedCards, downloads } from "@/lib/db/schema";
import { eq, asc, desc } from "drizzle-orm";

// Public sync endpoint — returns all published data for offline caching.
// No sensitive fields (no admin users, no audit logs, no password hashes).
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [allCards, allNews, allLimits, allDownloads] = await Promise.all([
      db
        .select({
          id: cards.id,
          name: cards.name,
          cardNumber: cards.cardNumber,
          type: cards.type,
          rarity: cards.rarity,
          ansage: cards.ansage,
          chill: cards.chill,
          dienstjahre: cards.dienstjahre,
          archetype: cards.archetype,
          subjects: cards.subjects,
          effect: cards.effect,
          imageUrl: cards.imageUrl,
          updatedAt: cards.updatedAt,
        })
        .from(cards)
        .where(eq(cards.published, true))
        .orderBy(asc(cards.cardNumber)),
      db
        .select({
          id: news.id,
          title: news.title,
          content: news.content,
          createdAt: news.createdAt,
          updatedAt: news.updatedAt,
        })
        .from(news)
        .where(eq(news.published, true))
        .orderBy(desc(news.createdAt)),
      db
        .select({
          id: limitedCards.id,
          name: limitedCards.name,
          maxCopies: limitedCards.maxCopies,
          reason: limitedCards.reason,
          updatedAt: limitedCards.updatedAt,
        })
        .from(limitedCards)
        .orderBy(asc(limitedCards.name)),
      db
        .select({
          id: downloads.id,
          name: downloads.name,
          description: downloads.description,
          fileUrl: downloads.fileUrl,
          fileType: downloads.fileType,
          fileSize: downloads.fileSize,
          createdAt: downloads.createdAt,
        })
        .from(downloads)
        .where(eq(downloads.published, true))
        .orderBy(desc(downloads.createdAt)),
    ]);

    return NextResponse.json(
      {
        cards: allCards,
        news: allNews,
        limits: allLimits,
        downloads: allDownloads,
        syncedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Sync fehlgeschlagen" }, { status: 500 });
  }
}
