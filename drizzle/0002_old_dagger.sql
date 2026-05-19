ALTER TABLE "cards" DROP CONSTRAINT "cards_card_number_unique";--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_number_auflage_unique" UNIQUE("card_number","auflage");