import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteLimitedCard, getLimitedCards } from "@/lib/actions/limits";

export default async function AdminLimitsPage() {
  await requireAdmin();
  const cards = await getLimitedCards();

  return (
    <div>
      <AdminPageHeader
        title="Limitierungen"
        description="Karten, die nur begrenzt im Deck erlaubt sind."
        action={
          <Link
            href="/admin/limits/new"
            className="bg-gold text-background hover:bg-gold-bright font-display inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Karte hinzufügen
          </Link>
        }
      />

      {cards.length === 0 ? (
        <p className="bg-muted border-border text-muted-foreground rounded-xl border px-6 py-12 text-center text-sm">
          Keine limitierten Karten vorhanden.
        </p>
      ) : (
        <div className="bg-muted border-border overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-32">Max. Kopien</TableHead>
                <TableHead>Grund</TableHead>
                <TableHead className="w-28 text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-display text-foreground font-semibold">
                    {card.name}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">{card.maxCopies}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {card.reason ?? "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/limits/${card.id}/edit`}
                        aria-label={`„${card.name}" bearbeiten`}
                        className="text-muted-foreground hover:text-gold focus-visible:text-gold inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        itemLabel={card.name}
                        deleteAction={deleteLimitedCard.bind(null, card.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
