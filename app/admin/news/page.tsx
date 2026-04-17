import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { deleteNews, getNews } from "@/lib/actions/news";
import { formatDate } from "@/lib/format";

const PREVIEW_LENGTH = 100;

function preview(content: string): string {
  if (content.length <= PREVIEW_LENGTH) return content;
  return `${content.slice(0, PREVIEW_LENGTH).trimEnd()}…`;
}

export default async function AdminNewsPage() {
  await requireAdmin();
  const entries = await getNews();

  return (
    <div>
      <AdminPageHeader
        title="News"
        description="Beiträge für die Startseite verwalten."
        action={
          <Link
            href="/admin/news/new"
            className="bg-gold text-background hover:bg-gold-bright font-display inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neuen Beitrag erstellen
          </Link>
        }
      />

      {entries.length === 0 ? (
        <p className="bg-muted border-border text-muted-foreground rounded-xl border px-6 py-12 text-center text-sm">
          Noch keine News-Einträge vorhanden.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="bg-muted border-border flex flex-col gap-3 rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-foreground text-lg font-semibold tracking-wide">
                    {entry.title}
                  </h2>
                  <span className="font-body text-muted-foreground text-xs">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                {entry.published ? (
                  <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
                    Veröffentlicht
                  </Badge>
                ) : (
                  <Badge className="bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20">
                    Entwurf
                  </Badge>
                )}
              </div>

              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {preview(entry.content)}
              </p>

              <div className="border-border flex items-center justify-end gap-1 border-t pt-3">
                <Link
                  href={`/admin/news/${entry.id}/edit`}
                  className="font-body text-muted-foreground hover:text-gold focus-visible:text-gold inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Bearbeiten
                </Link>
                <DeleteButton
                  itemLabel={entry.title}
                  deleteAction={deleteNews.bind(null, entry.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
