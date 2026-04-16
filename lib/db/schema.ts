import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const limitedCards = pgTable("limited_cards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  maxCopies: integer("max_copies").notNull().default(1),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileType: varchar("file_type", { length: 50 }),
  fileSize: integer("file_size"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type LimitedCard = typeof limitedCards.$inferSelect;
export type NewLimitedCard = typeof limitedCards.$inferInsert;

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

export type Download = typeof downloads.$inferSelect;
export type NewDownload = typeof downloads.$inferInsert;
