"use server";

import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { limitedCards, type LimitedCard } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/actions/audit";

export async function getLimitedCards(): Promise<LimitedCard[]> {
  return db.select().from(limitedCards).orderBy(asc(limitedCards.name));
}

export async function getLimitedCardById(id: number): Promise<LimitedCard | null> {
  const [row] = await db.select().from(limitedCards).where(eq(limitedCards.id, id));
  return row ?? null;
}

function parseFormData(formData: FormData): { name: string; maxCopies: number; reason: string | null } {
  const name = String(formData.get("name") ?? "").trim();
  const maxCopiesRaw = Number(formData.get("maxCopies"));
  const reason = String(formData.get("reason") ?? "").trim();

  if (!name) throw new Error("Name ist erforderlich.");
  if (!Number.isInteger(maxCopiesRaw) || maxCopiesRaw < 1) {
    throw new Error("Max. Kopien muss eine ganze Zahl ≥ 1 sein.");
  }

  return {
    name,
    maxCopies: maxCopiesRaw,
    reason: reason.length > 0 ? reason : null,
  };
}

function revalidate() {
  revalidatePath("/admin/limits");
  revalidatePath("/");
}

export async function createLimitedCard(formData: FormData): Promise<void> {
  await requireAdmin();
  try {
    const data = parseFormData(formData);
    const [created] = await db.insert(limitedCards).values(data).returning();
    await writeAuditLog({
      entityType: "limits",
      entityId: created.id,
      action: "create",
      summary: `Limitierung erstellt: ${created.name} (max ${created.maxCopies})`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}

export async function updateLimitedCard(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  try {
    const data = parseFormData(formData);
    await db
      .update(limitedCards)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(limitedCards.id, id));
    await writeAuditLog({
      entityType: "limits",
      entityId: id,
      action: "update",
      summary: `Limitierung aktualisiert: ${data.name} (max ${data.maxCopies})`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}

export async function deleteLimitedCard(id: number): Promise<void> {
  await requireAdmin();
  try {
    const row = await getLimitedCardById(id);
    await db.delete(limitedCards).where(eq(limitedCards.id, id));
    await writeAuditLog({
      entityType: "limits",
      entityId: id,
      action: "delete",
      summary: `Limitierung gelöscht: ${row?.name ?? `ID ${id}`}`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}
