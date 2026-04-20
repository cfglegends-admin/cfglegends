"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { news, type News } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/actions/audit";

export async function getNews(): Promise<News[]> {
  return db.select().from(news).orderBy(desc(news.createdAt));
}

export async function getPublishedNews(limit?: number): Promise<News[]> {
  const query = db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.createdAt));

  return typeof limit === "number" ? query.limit(limit) : query;
}

export async function getNewsById(id: number): Promise<News | null> {
  const [row] = await db.select().from(news).where(eq(news.id, id));
  return row ?? null;
}

function parseFormData(formData: FormData): { title: string; content: string; published: boolean } {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const publishedRaw = formData.get("published");

  if (!title) throw new Error("Titel ist erforderlich.");
  if (!content) throw new Error("Inhalt ist erforderlich.");

  return {
    title,
    content,
    published: publishedRaw === "on" || publishedRaw === "true",
  };
}

function revalidate() {
  revalidatePath("/admin/news");
  revalidatePath("/");
}

export async function createNews(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  const [created] = await db.insert(news).values(data).returning();
  await writeAuditLog({
    entityType: "news",
    entityId: created.id,
    action: "create",
    summary: `News erstellt: ${created.title}`,
  });
  revalidate();
}

export async function updateNews(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  await db
    .update(news)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(news.id, id));
  await writeAuditLog({
    entityType: "news",
    entityId: id,
    action: "update",
    summary: `News aktualisiert: ${data.title}`,
  });
  revalidate();
}

export async function deleteNews(id: number): Promise<void> {
  await requireAdmin();
  const row = await getNewsById(id);
  await db.delete(news).where(eq(news.id, id));
  await writeAuditLog({
    entityType: "news",
    entityId: id,
    action: "delete",
    summary: `News gelöscht: ${row?.title ?? `ID ${id}`}`,
  });
  revalidate();
}
