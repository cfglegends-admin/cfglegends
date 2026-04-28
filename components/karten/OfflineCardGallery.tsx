"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type Card } from "@/lib/db/schema";
import { type OfflineCard, getOfflineCards, getSyncedAt } from "@/lib/offline/db";
import { CardGrid } from "./CardGrid";
import { CardFilters } from "./CardFilters";

// Adapts OfflineCard (no published / createdAt) to the full Card type
// expected by CardGrid. Published is always true in the sync payload.
function toCard(c: OfflineCard): Card {
  return {
    ...c,
    published: true,
    createdAt: new Date(c.updatedAt),
    updatedAt: new Date(c.updatedAt),
  };
}

function filterCards(cards: Card[], params: URLSearchParams): Card[] {
  let filtered = cards;

  const type = params.get("type");
  if (type && type !== "all") {
    filtered = filtered.filter((c) => c.type === type);
  }

  const fach = params.get("fach");
  if (fach && fach !== "all") {
    filtered = filtered.filter((c) =>
      c.subjects?.toLowerCase().includes(fach.toLowerCase())
    );
  }

  const q = params.get("q");
  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        (c.effect ?? "").toLowerCase().includes(lower)
    );
  }

  const sort = params.get("sort") ?? "number";
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "ansage_desc":
        return (b.ansage ?? -1) - (a.ansage ?? -1);
      case "ansage_asc":
        return (a.ansage ?? Infinity) - (b.ansage ?? Infinity);
      case "chill_desc":
        return (b.chill ?? -1) - (a.chill ?? -1);
      case "chill_asc":
        return (a.chill ?? Infinity) - (b.chill ?? Infinity);
      default:
        return a.cardNumber - b.cardNumber;
    }
  });

  return filtered;
}

export function OfflineCardGallery() {
  const searchParams = useSearchParams();
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getOfflineCards(), getSyncedAt()]).then(([cards, ts]) => {
      if (!cancelled) {
        setAllCards(cards.map(toCard));
        setSyncedAt(ts);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => filterCards(allCards, searchParams), [allCards, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="font-body text-muted-foreground text-sm">Lade gespeicherte Karten…</span>
      </div>
    );
  }

  if (allCards.length === 0) {
    return (
      <div className="bg-muted/60 border-border flex flex-col items-center justify-center rounded-xl border px-6 py-24 text-center">
        <p className="font-display text-foreground text-xl font-semibold mb-2">Keine Offline-Daten</p>
        <p className="font-body text-muted-foreground text-sm">
          Verbinde dich mit dem Internet, um die Karten zu laden.
        </p>
      </div>
    );
  }

  return (
    <>
      {syncedAt && (
        <p className="font-body text-muted-foreground/70 text-xs mb-4">
          Offline-Modus · Gespeichert am{" "}
          {new Intl.DateTimeFormat("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(syncedAt))}
        </p>
      )}
      <CardFilters />
      <CardGrid cards={filtered} />
    </>
  );
}
