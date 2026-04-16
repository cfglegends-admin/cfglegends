import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LimitForm } from "@/components/admin/forms/LimitForm";
import { getLimitedCardById, updateLimitedCard } from "@/lib/actions/limits";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLimitPage({ params }: PageProps) {
  await requireAdmin();
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const card = await getLimitedCardById(id);
  if (!card) notFound();

  async function submit(formData: FormData) {
    "use server";
    await updateLimitedCard(id, formData);
    redirect("/admin/limits");
  }

  return (
    <div>
      <AdminPageHeader
        title={`„${card.name}" bearbeiten`}
        description="Änderungen werden sofort auf der öffentlichen Seite sichtbar."
      />
      <LimitForm action={submit} defaultValues={card} submitLabel="Speichern" />
    </div>
  );
}
