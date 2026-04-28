import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface OfflineCard {
  id: number;
  name: string;
  cardNumber: number;
  type: string;
  rarity: string;
  ansage: number | null;
  chill: number | null;
  dienstjahre: number | null;
  archetype: string | null;
  subjects: string | null;
  effect: string | null;
  imageUrl: string;
  updatedAt: string;
}

export interface OfflineNews {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfflineLimitedCard {
  id: number;
  name: string;
  maxCopies: number;
  reason: string | null;
  updatedAt: string;
}

export interface OfflineDownload {
  id: number;
  name: string;
  description: string | null;
  fileUrl: string;
  fileType: string | null;
  fileSize: number | null;
  createdAt: string;
}

interface OfflineDB extends DBSchema {
  cards: {
    key: number;
    value: OfflineCard;
    indexes: { by_number: number; by_type: string };
  };
  news: {
    key: number;
    value: OfflineNews;
  };
  limits: {
    key: number;
    value: OfflineLimitedCard;
  };
  downloads: {
    key: number;
    value: OfflineDownload;
  };
  meta: {
    key: string;
    value: { key: string; value: string };
  };
}

let dbPromise: Promise<IDBPDatabase<OfflineDB>> | null = null;

export function getOfflineDB(): Promise<IDBPDatabase<OfflineDB>> {
  if (!dbPromise) {
    dbPromise = openDB<OfflineDB>("cfg-legends-offline", 1, {
      upgrade(db) {
        const cardStore = db.createObjectStore("cards", { keyPath: "id" });
        cardStore.createIndex("by_number", "cardNumber");
        cardStore.createIndex("by_type", "type");

        db.createObjectStore("news", { keyPath: "id" });
        db.createObjectStore("limits", { keyPath: "id" });
        db.createObjectStore("downloads", { keyPath: "id" });
        db.createObjectStore("meta", { keyPath: "key" });
      },
    });
  }
  return dbPromise;
}

export async function getSyncedAt(): Promise<string | null> {
  const db = await getOfflineDB();
  const entry = await db.get("meta", "syncedAt");
  return entry?.value ?? null;
}

export async function getOfflineCards(): Promise<OfflineCard[]> {
  const db = await getOfflineDB();
  return db.getAllFromIndex("cards", "by_number");
}

export async function getOfflineNews(): Promise<OfflineNews[]> {
  const db = await getOfflineDB();
  return db.getAll("news");
}

export async function getOfflineLimits(): Promise<OfflineLimitedCard[]> {
  const db = await getOfflineDB();
  return db.getAll("limits");
}

export async function getOfflineDownloads(): Promise<OfflineDownload[]> {
  const db = await getOfflineDB();
  return db.getAll("downloads");
}
