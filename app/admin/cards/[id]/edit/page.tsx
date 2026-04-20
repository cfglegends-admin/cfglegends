import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CardForm } from "@/components/admin/forms/CardForm";
import { getCardById, updateCard } from "@/lib/actions/cards";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCardPage({ params }: PageProps) {
  await requireAdmin();
  
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const card = await getCardById(id);
  if (!card) notFound();

  async function submit(formData: FormData) {
    "use server";
    await updateCard(id, formData);
    redirect("/admin/cards");
  }

  return (
    <div>
      <AdminPageHeader
        title={`„${card.name}“ bearbeiten`}
        description="Änderungen werden sofort auf der öffentlichen Seite sichtbar (sofern veröffentlicht)."
      />
      <div className="mt-8">
        <CardForm action={submit} defaultValues={card} submitLabel="Speichern" />
      </div>
    </div>
  );
}
