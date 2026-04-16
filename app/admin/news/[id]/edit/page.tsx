import { Trash2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewsForm } from "@/components/admin/forms/NewsForm";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { deleteNews, getNewsById, updateNews } from "@/lib/actions/news";
import { formatDate } from "@/lib/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: PageProps) {
  await requireAdmin();
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const entry = await getNewsById(id);
  if (!entry) notFound();

  async function submit(formData: FormData) {
    "use server";
    await updateNews(id, formData);
    redirect("/admin/news");
  }

  async function destroy() {
    "use server";
    await deleteNews(id);
    redirect("/admin/news");
  }

  return (
    <div>
      <AdminPageHeader
        title="Beitrag bearbeiten"
        description={`Erstellt am ${formatDate(entry.createdAt)}.`}
      />
      <NewsForm action={submit} defaultValues={entry} submitLabel="Speichern">
        <DeleteConfirmDialog
          onConfirm={destroy}
          description={`„${entry.title}" wird endgültig gelöscht.`}
          trigger={
            <button
              type="button"
              className="font-body text-red-400 hover:text-red-300 inline-flex h-11 items-center gap-1.5 rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Beitrag löschen
            </button>
          }
        />
      </NewsForm>
    </div>
  );
}
