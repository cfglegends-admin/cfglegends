import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import * as fs from "fs";
import * as path from "path";

config({ path: ".env.local" });
const db = drizzle(neon(process.env.DATABASE_URL!));

async function main() {
  const allCards = await db.select().from(cards).orderBy(cards.cardNumber);
  
  const header = "Kartennummer;Name;Typ;Seltenheit;Ansage;Chill;Fächer;Effekt;Bild-URL\n";
  const rows = allCards.map(c => {
    // Es ist wichtig, den Effekt-String zu säubern, damit Semikolons im Fließtext den Parser nicht stören
    // Da unser einfacher Parser oben ein einfaches `split(";")` nutzt, 
    // ersetzen wir in diesem Dump einfach Semikolons im Effekttext durch Kommas.
    const cleanEffect = (c.effect || "").replace(/;/g, ",");
    return `${c.cardNumber};${c.name};${c.type};${c.rarity};${c.ansage ?? ""};${c.chill ?? ""};${c.subjects ?? ""};${cleanEffect};${c.imageUrl}`;
  });
  
  fs.writeFileSync(path.join(process.cwd(), "public/alle-karten.csv"), header + rows.join("\n"));
  console.log("CSV exported to public/alle-karten.csv");
}

main().catch(console.error);
