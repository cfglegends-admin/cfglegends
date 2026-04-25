"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { downloads, type Download } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { DOWNLOAD_FILE_TYPES, type DownloadFileType } from "@/lib/downloads";
import { writeAuditLog } from "@/lib/actions/audit";

export async function getDownloads(): Promise<Download[]> {
  return db.select().from(downloads).orderBy(desc(downloads.createdAt));
}

export async function getPublishedDownloads(): Promise<Download[]> {
  return db
    .select()
    .from(downloads)
    .where(eq(downloads.published, true))
    .orderBy(desc(downloads.createdAt));
}

export async function getDownloadById(id: number): Promise<Download | null> {
  const [row] = await db.select().from(downloads).where(eq(downloads.id, id));
  return row ?? null;
}

function parseFormData(formData: FormData): {
  name: string;
  description: string | null;
  fileUrl: string;
  fileType: DownloadFileType;
  published: boolean;
} {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const fileUrl = String(formData.get("fileUrl") ?? "").trim();
  const fileTypeRaw = String(formData.get("fileType") ?? "").trim();
  const publishedRaw = formData.get("published");

  if (!name) throw new Error("Name ist erforderlich.");
  if (!fileUrl) throw new Error("Datei-URL ist erforderlich.");
  if (!DOWNLOAD_FILE_TYPES.includes(fileTypeRaw as DownloadFileType)) {
    throw new Error("Ungültiger Dateityp.");
  }

  return {
    name,
    description: description.length > 0 ? description : null,
    fileUrl,
    fileType: fileTypeRaw as DownloadFileType,
    published: publishedRaw === "on" || publishedRaw === "true",
  };
}

function revalidate() {
  revalidatePath("/admin/downloads");
  revalidatePath("/");
}

export async function createDownload(formData: FormData): Promise<void> {
  await requireAdmin();
  try {
    const data = parseFormData(formData);
    const [created] = await db.insert(downloads).values(data).returning();
    await writeAuditLog({
      entityType: "downloads",
      entityId: created.id,
      action: "create",
      summary: `Download erstellt: ${created.name}`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}

export async function updateDownload(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  try {
    const data = parseFormData(formData);
    await db.update(downloads).set(data).where(eq(downloads.id, id));
    await writeAuditLog({
      entityType: "downloads",
      entityId: id,
      action: "update",
      summary: `Download aktualisiert: ${data.name}`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}

export async function deleteDownload(id: number): Promise<void> {
  await requireAdmin();
  try {
    const row = await getDownloadById(id);
    await db.delete(downloads).where(eq(downloads.id, id));
    await writeAuditLog({
      entityType: "downloads",
      entityId: id,
      action: "delete",
      summary: `Download gelöscht: ${row?.name ?? `ID ${id}`}`,
    });
    revalidate();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
  }
}
