"use client";

import { useTransition, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { subjects } from "@/lib/config";
import { cn } from "@/lib/utils";

export function CardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentType = searchParams.get("type") || "all";
  const currentFach = searchParams.get("fach") || "all";
  const currentSort = searchParams.get("sort") || "number";
  const currentQ = searchParams.get("q") || "";
  const currentAuflage = searchParams.get("auflage") || "all";

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [searchParams, startTransition, router]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      updateParams({ q: value });
    }, 150);
  }, [updateParams]);

  return (
    <div className="bg-muted/50 border-border mb-8 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-muted-foreground h-4 w-4" aria-hidden="true" />
        </div>
        <input
          type="search"
          placeholder="Karten durchsuchen..."
          defaultValue={currentQ}
          onChange={handleSearch}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold block w-full rounded-lg border py-2 pl-10 pr-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </div>

      {/* Filters Area */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter */}
        <select
          value={currentType}
          onChange={(e) => {
            const nextType = e.target.value;
            const resetFach = nextType === "ereignis" || nextType === "falle";
            updateParams(resetFach ? { type: nextType, fach: null } : { type: nextType });
          }}
          className="bg-background border-border text-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border py-2 pl-3 pr-8 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
          disabled={isPending}
        >
          <option value="all">Alle Typen</option>
          <option value="lehrer">Lehrer</option>
          <option value="ereignis">Ereignisse</option>
          <option value="falle">Fallen</option>
        </select>

        {/* Fach Filter - conditionally visible or disabled on non-lehrer types */}
        <select
          value={currentFach}
          onChange={(e) => updateParams({ fach: e.target.value })}
          className={cn(
            "bg-background border-border text-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border py-2 pl-3 pr-8 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50",
            (currentType === "ereignis" || currentType === "falle") && "opacity-50 cursor-not-allowed"
          )}
          disabled={isPending || currentType === "ereignis" || currentType === "falle"}
        >
          <option value="all">Alle Fächer</option>
          {subjects.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Auflage Filter */}
        <select
          value={currentAuflage}
          onChange={(e) => updateParams({ auflage: e.target.value })}
          className="bg-background border-border text-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border py-2 pl-3 pr-8 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
          disabled={isPending}
        >
          <option value="all">Alle Auflagen</option>
          <option value="1">1. Auflage</option>
          <option value="2">2. Auflage</option>
        </select>

        {/* Sort Filter */}
        <select
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="bg-background border-border text-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border py-2 pl-3 pr-8 text-sm focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
          disabled={isPending}
        >
          <option value="number">Kartennummer</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="ansage_desc">Ansage (hoch → niedrig)</option>
          <option value="ansage_asc">Ansage (niedrig → hoch)</option>
          <option value="chill_desc">Chill (hoch → niedrig)</option>
          <option value="chill_asc">Chill (niedrig → hoch)</option>
        </select>
      </div>
    </div>
  );
}
