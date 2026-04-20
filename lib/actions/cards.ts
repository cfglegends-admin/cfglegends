"use server";

import { revalidatePath } from "next/cache";
import { asc, desc, eq, SQL, sql, or, ilike } from "drizzle-orm";
import { db } from "@/lib/db";
import { cards, type Card, type NewCard } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";

interface CardFilters {
  type?: string;
  fach?: string;
  q?: string;
  sort?: string;
  publishedOnly?: boolean;
}

function buildFilterQuery(filters?: CardFilters) {
  const conditions: SQL[] = [];

  if (filters?.publishedOnly) {
    conditions.push(eq(cards.published, true));
  }

  if (filters?.type && filters.type !== "all") {
    conditions.push(eq(cards.type, filters.type));
  }

  if (filters?.fach && filters.fach !== "all") {
    // Basic string matching for subjects since it's a comma separated string
    conditions.push(ilike(cards.subjects, `%${filters.fach}%`));
  }

  if (filters?.q) {
    const searchPattern = `%${filters.q}%`;
    conditions.push(
      or(
        ilike(cards.name, searchPattern),
        ilike(cards.effect, searchPattern)
      )!
    );
  }

  return conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;
}

function getSortKey(sort?: string) {
  switch (sort) {
    case "name_asc":
      return asc(cards.name);
    case "name_desc":
      return desc(cards.name);
    case "ansage_desc":
      return desc(cards.ansage);
    case "ansage_asc":
      return asc(cards.ansage);
    case "chill_desc":
      return desc(cards.chill);
    case "chill_asc":
      return asc(cards.chill);
    case "number":
    default:
      return asc(cards.cardNumber);
  }
}

export async function getCards(filters?: CardFilters): Promise<Card[]> {
  const whereClause = buildFilterQuery(filters);
  const orderByClause = getSortKey(filters?.sort);

  const query = db.select().from(cards).orderBy(orderByClause);

  if (whereClause) {
    query.where(whereClause);
  }

  return query;
}

export async function getPublishedCards(filters?: Omit<CardFilters, "publishedOnly">): Promise<Card[]> {
  return getCards({ ...filters, publishedOnly: true });
}

export async function getCardById(id: number): Promise<Card | null> {
  const [row] = await db.select().from(cards).where(eq(cards.id, id));
  return row ?? null;
}

function parseFormData(formData: FormData): NewCard {
  const name = String(formData.get("name") ?? "").trim();
  const cardNumberStr = String(formData.get("cardNumber") ?? "");
  const type = String(formData.get("type") ?? "lehrer");
  const rarity = String(formData.get("rarity") ?? "normal");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const effect = String(formData.get("effect") ?? "").trim();
  const archetype = String(formData.get("archetype") ?? "").trim();
  const publishedRaw = formData.get("published");

  // Subject parsing
  const subjectsObj = formData.getAll("subjects");
  const subjects = subjectsObj.length > 0 ? subjectsObj.join(",") : null;

  if (!name) throw new Error("Name ist erforderlich.");
  if (!cardNumberStr) throw new Error("Kartennummer ist erforderlich.");
  if (!imageUrl) throw new Error("Bild-URL ist erforderlich.");

  const cardNumber = parseInt(cardNumberStr, 10);
  if (isNaN(cardNumber)) throw new Error("Ungültige Kartennummer.");

  const isLehrer = type === "lehrer";

  const getNumberOrNull = (key: string) => {
    if (!isLehrer) return null;
    const val = formData.get(key);
    if (!val || val === "") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };

  return {
    name,
    cardNumber,
    type,
    rarity,
    imageUrl,
    effect: effect || null,
    archetype: isLehrer && archetype ? archetype : null,
    subjects: isLehrer ? subjects : null,
    ansage: getNumberOrNull("ansage"),
    chill: getNumberOrNull("chill"),
    dienstjahre: getNumberOrNull("dienstjahre"),
    published: publishedRaw === "on" || publishedRaw === "true",
  };
}

function revalidate() {
  revalidatePath("/admin/cards");
  revalidatePath("/karten");
}

export async function createCard(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  await db.insert(cards).values(data);
  revalidate();
}

export async function updateCard(id: number, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseFormData(formData);
  
  await db
    .update(cards)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(cards.id, id));
  
  revalidate();
}

export async function deleteCard(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(cards).where(eq(cards.id, id));
  revalidate();
}

export interface BulkImportResult {
  successCount: number;
  errors: { lineNumber: number; row: string; error: string }[];
}

export async function bulkImportCards(csvData: string): Promise<BulkImportResult> {
  await requireAdmin();
  
  const lines = csvData
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
    
  if (lines.length === 0) {
    return { successCount: 0, errors: [{ lineNumber: 0, row: "", error: "Keine Daten gefunden" }] };
  }

  // Skip header line if present (check if first line contains common header columns)
  const startIndex = lines[0].toLowerCase().includes("kartennummer") ? 1 : 0;
  
  const errors: BulkImportResult["errors"] = [];
  let successCount = 0;

  for (let i = startIndex; i < lines.length; i++) {
    const lineNumber = i + 1;
    const rawLine = lines[i];
    
    try {
      // Basic CSV splitter (assuming semicolons are not inside quotes for this minimal parser,
      // but simple fallback logic to handle basic splitting)
      const parts = rawLine.split(";");
      if (parts.length < 8) {
        throw new Error("Zeile hat zu wenige Spalten (Mindestens 8 erwartet)");
      }

      // 103;Mensa-Team;ereignis;normal;;;;Du bekommst Unterstützung...;/cards/103.png
      // 0  ;1         ;2       ;3     ;4;5;6;7                        ;8
      
      const cardNumberRaw = parts[0].trim();
      const name = parts[1].trim();
      const type = parts[2].trim().toLowerCase();
      const rarity = parts[3].trim().toLowerCase() || "normal";
      const ansageRaw = parts[4]?.trim();
      const chillRaw = parts[5]?.trim();
      const subjectsRaw = parts[6]?.trim();
      const effectRaw = parts[7]?.trim();
      
      // Handle the case where there is no effect but image URL is in column 7
      // OR image url is in column 8
      let effectText = effectRaw;
      let imageUrl = parts[8]?.trim();
      
      if (!imageUrl && effectText && effectText.startsWith("/cards/")) {
        imageUrl = effectText;
        effectText = "";
      }
      
      if (!name) throw new Error("Name fehlt.");
      if (!cardNumberRaw) throw new Error("Kartennummer fehlt.");
      if (!imageUrl) throw new Error("Bild-Pfad fehlt.");
      
      const cardNumber = parseInt(cardNumberRaw, 10);
      if (isNaN(cardNumber)) throw new Error("Ungültige Kartennummer.");
      
      const isLehrer = type === "lehrer";
      
      // Cleanup effect string (remove starting/trailing quotes if user copy-pasted them)
      if (effectText) {
        if (effectText.startsWith('"') && effectText.endsWith('"')) {
          effectText = effectText.slice(1, -1);
        }
      }

      const cardData: NewCard = {
        name,
        cardNumber,
        type: type as "lehrer" | "ereignis" | "falle",
        rarity,
        imageUrl,
        effect: effectText || null,
        ansage: isLehrer && ansageRaw ? parseInt(ansageRaw, 10) : null,
        chill: isLehrer && chillRaw ? parseInt(chillRaw, 10) : null,
        subjects: isLehrer && subjectsRaw ? subjectsRaw : null,
        published: true, // Imported cards are published by default
      };

      await db.insert(cards).values(cardData);
      successCount++;
    } catch (e: unknown) {
      errors.push({
        lineNumber,
        row: rawLine,
        error: e instanceof Error ? e.message : "Unbekannter Fehler",
      });
    }
  }

  revalidate();
  return { successCount, errors };
}
