import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { downloads, limitedCards, news } from "../lib/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding...");

  await db.insert(limitedCards).values([
    { name: "Mertens", maxCopies: 1 },
    { name: "Drübert", maxCopies: 1 },
  ]);

  await db.insert(news).values([
    {
      title: "CFG Legends ist da!",
      content:
        "Die erste Auflage von CFG Legends ist ab sofort erhältlich. Holt euch eure Karten in der großen Pause!",
      published: true,
    },
  ]);

  await db.insert(downloads).values([
    {
      name: "Regelwerk",
      description: "Die vollständigen Spielregeln zum Nachlesen und Ausdrucken.",
      fileUrl: "/docs/regelwerk.pdf",
      fileType: "pdf",
      published: true,
    },
  ]);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
