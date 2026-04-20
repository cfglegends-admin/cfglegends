import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CardDeleteButton } from "@/components/admin/CardDeleteButton";
import { getCards } from "@/lib/actions/cards";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  lehrer: "Lehrer",
  ereignis: "Ereignis",
  falle: "Falle",
};

const typeBadgeStyles: Record<string, string> = {
  lehrer: "bg-gold/15 text-gold border-gold/40",
  ereignis: "bg-event/30 text-foreground border-event/60",
  falle: "bg-trap/30 text-foreground border-trap/60",
};

interface AdminCardsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function AdminCardsPage(props: AdminCardsPageProps) {
  const searchParams = await props.searchParams;
  await requireAdmin();
  
  // Note: Client-side search as requested in the plan is generally harder to implement 
  // on a Server Component table without passing all data down to a client wrapper.
  // Given the simplicity and standard NextJS patterns, we use URL params for search,
  // matching the approach for the public gallery.
  const cards = await getCards({ 
    sort: "number", // Default sort by card number
    q: searchParams.q
  });

  return (
    <div>
      <AdminPageHeader
        title="Karten"
        description={`${cards.length} Karten in der Datenbank`}
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/cards/import"
              className="bg-muted border-border font-display hover:border-gold inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Bulk-Import
            </Link>
            <Link
              href="/admin/cards/new"
              className="bg-gold text-background hover:bg-gold-bright font-display inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Neue Karte
            </Link>
          </div>
        }
      />

      {/* Client Search - A simple form that updates the URL to re-trigger server fetch */}
      <form className="mb-6 max-w-md">
        <label htmlFor="search" className="sr-only">Karten durchsuchen</label>
        <input 
          id="search"
          name="q"
          type="search"
          placeholder="Suchen..."
          defaultValue={searchParams.q || ""}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold w-full rounded-lg border px-4 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
      </form>

      {cards.length === 0 ? (
        <p className="bg-muted border-border text-muted-foreground rounded-xl border px-6 py-12 text-center text-sm">
          Keine Karten vorhanden oder keine Treffer für die Suche.
        </p>
      ) : (
        <div className="bg-muted border-border overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-border border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Nr.</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Typ</th>
                <th className="px-4 py-3 font-medium">Ansage/Chill</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {cards.map((card) => (
                <tr key={card.id}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-muted-foreground tabular-nums">#{card.cardNumber.toString().padStart(3, '0')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-display text-foreground font-semibold">
                      {card.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "font-body inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        typeBadgeStyles[card.type] || "border-border text-muted-foreground bg-background"
                      )}
                    >
                      {typeLabels[card.type] || card.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {card.type === "lehrer" ? (
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1" title="Ansage">
                          ⚔️ <span className="font-mono tabular-nums">{card.ansage ?? "-"}</span>
                        </span>
                        <span className="inline-flex items-center gap-1" title="Chill">
                          🛡️ <span className="font-mono tabular-nums">{card.chill ?? "-"}</span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {card.published ? (
                      <span className="text-emerald-500 font-medium text-xs uppercase tracking-wider">Veröffentlicht</span>
                    ) : (
                      <span className="text-amber-500 font-medium text-xs uppercase tracking-wider">Entwurf</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                       <Link
                          href={`/admin/cards/${card.id}/edit`}
                          className="font-body text-background bg-foreground hover:bg-muted-foreground inline-flex h-8 items-center rounded-md px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        >
                          Bearbeiten
                        </Link>
                      <CardDeleteButton
                        id={card.id}
                        name={card.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
