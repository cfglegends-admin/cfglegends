"use server";

import { put } from "@vercel/blob";
import { and, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/session";
import { writeAuditLog } from "@/lib/actions/audit";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";

interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadCardImage(formData: FormData): Promise<UploadResult> {
  try {
    await requireAdmin();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return { error: "BLOB_READ_WRITE_TOKEN fehlt in der Umgebung." };
    }

    const file = formData.get("image");
    const cardNumberRaw = String(formData.get("cardNumber") ?? "");
    const cardIdRaw = String(formData.get("cardId") ?? "");
    const auflageRaw = String(formData.get("auflage") ?? "1");
    const auflage = (() => {
      const n = Number(auflageRaw);
      return Number.isInteger(n) && n >= 1 ? n : 1;
    })();

    if (!(file instanceof File)) {
      return { error: "Keine Datei ausgewählt." };
    }
    if (!file.type.startsWith("image/")) {
      return { error: "Nur Bilddateien sind erlaubt." };
    }

    const cardNumber = Number(cardNumberRaw);
    if (!Number.isInteger(cardNumber) || cardNumber < 1) {
      return { error: "Ungültige Kartennummer für den Upload." };
    }

    const editingCardId = Number(cardIdRaw);
    const [existingCard] = await db
      .select()
      .from(cards)
      .where(and(eq(cards.cardNumber, cardNumber), eq(cards.auflage, auflage)));
    if (existingCard && existingCard.id !== editingCardId) {
      return {
        error: `Karte #${cardNumber} in Auflage ${auflage} ist bereits vergeben.`,
      };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const fileName = `cards/v${auflage}/${cardNumber}.${ext}`;

    const uploaded = await put(fileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    await writeAuditLog({
      entityType: "cards",
      action: "create",
      summary: `Kartenbild hochgeladen: ${uploaded.pathname} (Karte #${cardNumber})`,
    });

    return { url: uploaded.url };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unbekannter Fehler.";
    if (message.includes("Cannot use public access on a private store")) {
      return {
        error:
          "Blob-Store ist privat konfiguriert. Bitte Store in Vercel auf public umstellen oder einen public Store nutzen.",
      };
    }
    if (message.includes("The requested file already exists")) {
      return {
        error:
          "Diese Bild-Datei existiert bereits im Blob-Store. Bitte Dateiendung ändern (z.B. .png) oder Kartennummer prüfen.",
      };
    }
    return { error: `Upload fehlgeschlagen: ${message}` };
  }
}
