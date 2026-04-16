"use server";

import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { limitedCards, type LimitedCard } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";

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
  const data = parseFormData(formData);
  await db.insert(limitedCards).values(data);
  revalidate();
}

export async function updateLimitedCard(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  await db
    .update(limitedCards)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(limitedCards.id, id));
  revalidate();
}

export async function deleteLimitedCard(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(limitedCards).where(eq(limitedCards.id, id));
  revalidate();
}
