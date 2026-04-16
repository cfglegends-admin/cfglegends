import { Trash2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DownloadForm } from "@/components/admin/forms/DownloadForm";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { deleteDownload, getDownloadById, updateDownload } from "@/lib/actions/downloads";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDownloadPage({ params }: PageProps) {
  await requireAdmin();
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const item = await getDownloadById(id);
  if (!item) notFound();

  async function submit(formData: FormData) {
    "use server";
    await updateDownload(id, formData);
    redirect("/admin/downloads");
  }

  async function destroy() {
    "use server";
    await deleteDownload(id);
    redirect("/admin/downloads");
  }

  return (
    <div>
      <AdminPageHeader title="Download bearbeiten" description={item.fileUrl} />
      <DownloadForm action={submit} defaultValues={item} submitLabel="Speichern">
        <DeleteConfirmDialog
          onConfirm={destroy}
          description={`„${item.name}" wird endgültig gelöscht.`}
          trigger={
            <button
              type="button"
              className="font-body text-red-400 hover:text-red-300 inline-flex h-11 items-center gap-1.5 rounded-md px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Download löschen
            </button>
          }
        />
      </DownloadForm>
    </div>
  );
}
