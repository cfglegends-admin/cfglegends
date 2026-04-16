import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RowDeleteButton } from "@/components/admin/RowDeleteButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteDownload, getDownloads } from "@/lib/actions/downloads";

const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: "PDF",
  image: "Bild",
  other: "Sonstiges",
};

function fileTypeBadge(type: string | null) {
  const label = FILE_TYPE_LABELS[type ?? "other"] ?? "Sonstiges";
  if (type === "pdf") {
    return <Badge className="bg-blue-500/15 text-blue-300 hover:bg-blue-500/15">{label}</Badge>;
  }
  if (type === "image") {
    return <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">{label}</Badge>;
  }
  return <Badge className="bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20">{label}</Badge>;
}

export default async function AdminDownloadsPage() {
  await requireAdmin();
  const items = await getDownloads();

  return (
    <div>
      <AdminPageHeader
        title="Downloads"
        description="Dateien, die im Download-Bereich der Startseite angeboten werden."
        action={
          <Link
            href="/admin/downloads/new"
            className="bg-gold text-background hover:bg-gold-bright font-display inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neuen Download hinzufügen
          </Link>
        }
      />

      {items.length === 0 ? (
        <p className="bg-muted border-border text-muted-foreground rounded-xl border px-6 py-12 text-center text-sm">
          Noch keine Downloads vorhanden.
        </p>
      ) : (
        <div className="bg-muted border-border overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead className="w-24">Typ</TableHead>
                <TableHead className="w-28">Status</TableHead>
                <TableHead className="w-28 text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-display text-foreground font-semibold">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate text-sm">
                    {item.description ?? "—"}
                  </TableCell>
                  <TableCell>{fileTypeBadge(item.fileType)}</TableCell>
                  <TableCell>
                    {item.published ? (
                      <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
                        Sichtbar
                      </Badge>
                    ) : (
                      <Badge className="bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20">
                        Versteckt
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/downloads/${item.id}/edit`}
                        aria-label={`„${item.name}" bearbeiten`}
                        className="text-muted-foreground hover:text-gold focus-visible:text-gold inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <RowDeleteButton
                        itemLabel={item.name}
                        action={deleteDownload.bind(null, item.id)}
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
