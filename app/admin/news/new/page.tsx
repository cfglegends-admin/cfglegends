import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewsForm } from "@/components/admin/forms/NewsForm";
import { createNews } from "@/lib/actions/news";

export default async function NewNewsPage() {
  await requireAdmin();

  async function submit(formData: FormData) {
    "use server";
    await createNews(formData);
    redirect("/admin/news");
  }

  return (
    <div>
      <AdminPageHeader
        title="Neuen Beitrag erstellen"
        description="Speichere zunächst als Entwurf oder veröffentliche direkt."
      />
      <NewsForm action={submit} submitLabel="Beitrag speichern" />
    </div>
  );
}
