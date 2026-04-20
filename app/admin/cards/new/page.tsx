import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CardForm } from "@/components/admin/forms/CardForm";
import { createCard } from "@/lib/actions/cards";

export default async function NewCardPage() {
  await requireAdmin();

  async function submit(formData: FormData) {
    "use server";
    await createCard(formData);
    redirect("/admin/cards");
  }

  return (
    <div>
      <AdminPageHeader
        title="Karte hinzufügen"
        description="Eine neue Karte wird in der Datenbank angelegt."
      />
      <div className="mt-8">
        <CardForm action={submit} submitLabel="Hinzufügen" />
      </div>
    </div>
  );
}
