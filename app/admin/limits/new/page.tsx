import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LimitForm } from "@/components/admin/forms/LimitForm";
import { createLimitedCard } from "@/lib/actions/limits";

export default async function NewLimitPage() {
  await requireAdmin();

  async function submit(formData: FormData) {
    "use server";
    await createLimitedCard(formData);
    redirect("/admin/limits");
  }

  return (
    <div>
      <AdminPageHeader
        title="Karte hinzufügen"
        description="Eine neue Karte zur Limitierungsliste hinzufügen."
      />
      <LimitForm action={submit} submitLabel="Hinzufügen" />
    </div>
  );
}
