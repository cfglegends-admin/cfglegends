"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

export function AdminCardsFilter({ defaultQ, defaultAuflage }: { defaultQ?: string; defaultAuflage?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  return (
    <div className="mb-6 flex flex-wrap gap-3 max-w-2xl">
      <input
        type="search"
        placeholder="Suchen..."
        defaultValue={defaultQ}
        onChange={(e) => {
          const value = e.target.value;
          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = setTimeout(() => updateParams({ q: value }), 200);
        }}
        className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold flex-1 min-w-48 rounded-lg border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
      />
      <select
        defaultValue={defaultAuflage || "all"}
        onChange={(e) => updateParams({ auflage: e.target.value })}
        className="bg-background border-border text-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border py-2.5 pl-3 pr-8 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        <option value="all">Alle Auflagen</option>
        <option value="1">1. Auflage</option>
        <option value="2">2. Auflage</option>
      </select>
    </div>
  );
}
