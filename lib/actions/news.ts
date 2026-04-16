"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { news, type News } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";

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
  await db.insert(news).values(data);
  revalidate();
}

export async function updateNews(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  await db
    .update(news)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(news.id, id));
  revalidate();
}

export async function deleteNews(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(news).where(eq(news.id, id));
  revalidate();
}
