import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DownloadForm } from "@/components/admin/forms/DownloadForm";
import { createDownload } from "@/lib/actions/downloads";

export default async function NewDownloadPage() {
  await requireAdmin();

  async function submit(formData: FormData) {
    "use server";
    await createDownload(formData);
    redirect("/admin/downloads");
  }

  return (
    <div>
      <AdminPageHeader
        title="Neuen Download hinzufügen"
        description="Lege eine Datei an, die im Download-Bereich erscheint."
      />
      <DownloadForm action={submit} submitLabel="Hinzufügen" />
    </div>
  );
}
