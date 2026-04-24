CREATE INDEX IF NOT EXISTS "cards_published_idx" ON "cards" USING btree ("published");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cards_published_type_idx" ON "cards" USING btree ("published","type");
