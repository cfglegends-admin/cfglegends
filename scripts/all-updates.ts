import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function updateBatch2() {
  const updates = [
    {
      cardNumber: 11,
      name: "Frau Wattke",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 20,
      subjects: "Biologie",
      effect: "[Oberstufe]\nNachschreibtermin\nWenn du diese Karte einstellst: Du kannst Mündliche Nachprüfung direkt von deinem Deck setzen. Sie kann in diesem Zug nicht aktiviert werden. Solange diese Karte offen im Chillmodus liegt, kann dein Gegner in jeder Prüfungsphase nur mit 1 Lehrer mit 7 oder mehr Ansage angreifen.",
      archetype: "Oberstufe",
      published: true
    },
    {
      cardNumber: 12,
      name: "Herr Müller",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 22,
      subjects: "Englisch, Mathe",
      effect: "[Oberstufe]\nKlausurplanung\nWenn du diese Karte einstellst: Schaue dir die obersten 3 Karten deines Decks an. Nimm 1 Oberstufe-Lehrer oder 1 Ereigniskarte darunter auf die Hand. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. Einmal pro Zug: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; er kann bis zum Ende des nächsten Zuges nicht angreifen.",
      archetype: "Oberstufe",
      published: true
    },
    {
      cardNumber: 13,
      name: "Frau Wyneken",
      type: "lehrer",
      rarity: "normal",
      ansage: 8,
      chill: 2,
      dienstjahre: 21,
      subjects: "EW, Französisch, Sport",
      effect: "[Oberstufe]\nBeratungsgespräch\nWenn du diese Karte einstellst: Du kannst 1 anderen Oberstufe-Lehrer deinem Ruhestand auf die Hand nehmen. Falls du dies tust, wirf 1 Karte ab. Einmal pro Zug: Wähle 1 anderen offenen Oberstufe-Lehrer, der du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +2 Chill. Falls er in dieser Zeit durch Kampf in den Ruhestand geschickt würde, nimm ihn zurück auf die Hand.",
      archetype: "Oberstufe",
      published: true
    },
    {
      cardNumber: 14,
      name: "Frau Mumm",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 15,
      subjects: "Deutsch, Sport",
      effect: "[Mittelstufe]\nMittelstufenkonferenz\nSolange diese Karte offen liegt, können offene Lehrer mit 7 oder mehr Ansage nicht direkt angreifen. Wenn dein Gegner den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Du kannst diese Karte von deiner Hand abwerfen; jene Karte erhält bis zum Ende des Zuges -4 Ansage.",
      archetype: "Mittelstufe",
      published: true
    },
    {
      cardNumber: 15,
      name: "Frau Götsch",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 12,
      subjects: "Biologie, Englisch",
      effect: "[Mittelstufe]\nKurswahl\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Spielzug: Wenn eine deiner offenen Lehrer in den Chillmodus geändert wird, kannst du 1 anderen offenen Lehrer wählen; bis zum Ende des Zuges kann er nicht angreifen.",
      archetype: "Mittelstufe",
      published: true
    },
    {
      cardNumber: 16,
      name: "Herr Siebrandt",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 46,
      subjects: "Deutsch, Kunst",
      effect: "[Verwaltung]\nKursumwahl\nWenn du diese Karte einstellst: Wähle 1 anderen offenen Lehrer, den du kontrollierst, und 1 Lehrer mit einem anderen Namen in deinem Ruhestand. Nimm die offene Karte auf die Hand. Falls du dies tust, stelle die gewählte Karte aus deinem Ruhestand im selben Modus ein. Ihre Effekte sind bis zum Ende des Zuges annulliert. Einmal pro Zug: Du kannst 1 Karte abwerfen; ändere den Modus von 1 Lehrer auf dem Feld.",
      archetype: "Verwaltung",
      published: true
    },
    {
      cardNumber: 17,
      name: "Frau Boeddinghaus",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 18,
      subjects: "Chemie, Mathe",
      effect: "[Verwaltung]\nSicherheitsbegehung\nWenn du diese Karte einstellst: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Spielzug, wenn dein Gegner eine Lehrerkarte einstellt: Du kannst jene Karte in den Chillmodus ändern.",
      archetype: "Verwaltung",
      published: true
    },
    {
      cardNumber: 18,
      name: "Herr Hillringhaus",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 22,
      subjects: "Mathe, Physik",
      effect: "[Verwaltung]\nDigitales Klassenbuch\nWenn du diese Karte einstellst: Schaue dir die obersten 6 Karten deines Decks an. Nimm 1 Verwaltung-Lehrer oder 1 Falle darunter auf die Hand. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. Einmal in deinem Zug: Decke 1 verdeckte Karte des Gegners auf. Falls es eine Falle ist, kann sie in diesem Zug nicht aktiviert werden.",
      archetype: "Verwaltung",
      published: true
    },
    {
      cardNumber: 19,
      name: "Frau Schmitz-Wimmer",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 42,
      subjects: "Geschichte, Mathe",
      effect: "[Verwaltung]\nJugend präsentiert Finale\nWenn diese Karte eingestellt wird: Wähle 1 Lehrer, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges kann er nicht Ziel gegnerischer Effekte werden und erhält +1 Ansage. Falls deine eingestellten Lehrer zusammen mindestens 50 Dienstjahre zählen, ziehe 1 Karte.",
      archetype: "Verwaltung",
      published: true
    },
    {
      cardNumber: 20,
      name: "Herr Hübschen",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 21,
      subjects: "Mathe, Physik",
      effect: "[Verwaltung]\nVertretung\nWenn du diese Karte einstellst: Wähle 1 offenen Lehrer deines Gegners und 1 Lehrer in seinem Ruhestand. Schicke die offene Lehrerkarte in den Ruhestand. Falls du dies tust, stellt dein Gegner den gewählten Lehrer im Chillmodus ein. Seine Effekte sind bis zum Ende des Zuges annulliert. Wenn du diese Karte einstellst: Du kannst Antrag abgelehnt direkt von deinem Deck setzen.",
      archetype: "Verwaltung",
      published: true
    }
  ];

  for (const update of updates) {
    const { cardNumber, ...rest } = update;
    await db.update(cards)
      .set(rest)
      .where(eq(cards.cardNumber, cardNumber));
    console.log(`Updated Card ${cardNumber}`);
  }
}

updateBatch2().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function updateBatch3() {
  const updates = [
    {
      cardNumber: 21,
      name: "Frau Furkert",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 20,
      subjects: "Deutsch, Erdkunde",
      effect: "[Erprobungsstufe]\nSicherer Start\nWenn diese Karte eingestellt wird: Lege 1 Entwicklungsmarke auf 1 anderen Lehrer, den du kontrollierst. Lehrer mit Entwicklungsmarke erhalten +1 Ansage und +1 Chill. Einmal pro Spielzug: Wenn ein Lehrer mit Entwicklungsmarke durch Kampf in den Ruhestand gehen würde, entferne stattdessen 1 Entwicklungsmarke von ihm und ändere ihn in den Chillmodus.",
      archetype: "Erprobungsstufe",
      published: true
    },
    {
      cardNumber: 22,
      name: "Herr Leermann",
      type: "lehrer",
      rarity: "normal",
      ansage: 9,
      chill: 1,
      dienstjahre: 15,
      subjects: "Erdkunde, Sport",
      effect: "[Bewegung, Musik und Bühne]\nTalentscouting\nWenn diese Karte eingestellt wird: Du kannst 1 Lehrkraft zahlen; aktiviere Sponsorenlauf direkt von deinem Deck. Einmal pro Spielzug, wenn ein anderer Bewegung-Lehrer einen Kampf gewinnt: Stelle 1 Bewegung-Lehrer mit 6 oder weniger Ansage von deiner Hand im offenen Chillmodus ein.",
      archetype: "Bewegung",
      published: true
    },
    {
      cardNumber: 23,
      name: "Frau Jütz",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 14,
      subjects: "Sport",
      effect: "[Bewegung]\nMotivation\nWenn diese Karte eingestellt wird: Lege 2 Rundenpunkte auf Sponsorenlauf. Einmal pro Spielzug: Du kannst 2 Rundenpunkte von Sponsorenlauf entfernen; stelle 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im Ansagemodus ein.",
      archetype: "Bewegung",
      published: true
    },
    {
      cardNumber: 24,
      name: "Frau Bielor",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 7,
      subjects: "Spanisch, Biologie",
      effect: "[Bewegung]\nZumba\nWenn diese Karte eingestellt wird: Ändere den Modus von bis zu 2 offenen Lehrern. Einmal pro Spielzug, wenn ein Lehrer seinen Modus ändert: Wähle 1 Bewegung-Lehrer. Im Ansagemodus erhält er +2 Ansage bis zum Ende des Zuges. Im Chillmodus erhält er +2 Chill bis zum Ende des nächsten gegnerischen Zuges.",
      archetype: "Bewegung",
      published: true
    },
    {
      cardNumber: 25,
      name: "Frau Mosbach",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 3,
      subjects: "Sport, Biologie",
      effect: "[Bewegung]\nStaffellauf\nWenn diese Karte durch Kampf in den Ruhestand geschickt wird: Stelle 1 Bewegung-Lehrer mit 5 oder weniger Ansage von deiner Hand im Ansagemodus ein und lege 1 Rundenpunkt auf Sponsorenlauf.",
      archetype: "Bewegung",
      published: true
    },
    {
      cardNumber: 26,
      name: "Herr Spira",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 2,
      subjects: "Erdkunde, Mathe, Sport",
      effect: "[Bewegung]\nSporthelfer\nWenn diese Karte eingestellt wird: Lege 1 Rundenpunkt auf Sponsorenlauf. Wenn einer deiner Bewegung-Lehrer kämpft: Du kannst diese Karte von deiner Hand abwerfen; jene Karte kann in diesem Kampf nicht in den Ruhestand geschickt werden. Lege danach 1 Rundenpunkt auf Sponsorenlauf.",
      archetype: "Bewegung",
      published: true
    },
    {
      cardNumber: 27,
      name: "Herr Cleve",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 2,
      subjects: "Astronomie, Mathe, Physik",
      effect: "[MINT]\nDachbeobachtung\nWenn du diese Karte einstellst: Du kannst 1 offenen MINT-Lehrer, den du kontrollierst, in den Chillmodus ändern. Falls du dies tust, ziehe 1 Karte. Solange diese Karte offen im Chillmodus liegt, erhalten deine anderen Astronomie-Lehrer +1 Chill.",
      archetype: "MINT",
      published: true
    },
    {
      cardNumber: 28,
      name: "Herr Happe",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 4,
      subjects: "Physik, Informatik, Mathe, Astronomie",
      effect: "[MINT]\nPhysikshow\nWenn du diese Karte einstellst: Wähle 1 Lehrer auf dem Feld; ändere seinen Modus. Falls in diesem Zug ein Lehrer seinen Modus geändert hat, erhält diese Karte bis zum Ende des Zuges einmalig +2 Ansage. Wenn diese Karte eine Lehrerkarte im Chillmodus angreift und ihre Ansage höher ist als deren Chill, verliert dein Gegner Lehrkraft in Höhe der Differenz.",
      archetype: "MINT",
      published: true
    },
    {
      cardNumber: 29,
      name: "Herr Winkhaus",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 25,
      subjects: "Astronomie, Mathe, Physik",
      effect: "[MINT]\nSternwartenleitung\nWenn du diese Karte einstellst: Du kannst Sternwarte direkt von deinem Deck offen in deine Hintergrundreihe legen. Solange Sternwarte offen in deiner Hintergrundreihe liegt, erhält diese Karte +2 Ansage und kann nicht durch gegnerische Ereigniskarten in den Ruhestand geschickt werden. Einmal pro Zug: Du kannst 1 Karte von deiner Hand unter dein Deck legen; ziehe 1 Karte.",
      archetype: "MINT",
      published: true
    },
    {
      cardNumber: 30,
      name: "Herr Holbeck",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 2,
      subjects: "Geschichte, Mathe",
      effect: "[MINT]\nSubtraktion\nEinmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers aktiviert: Du kannst 1 Karte von deiner Hand in den Ruhestand legen; annulliere den Effekt. Du kannst jeden Effekt von Herr Holbeck nur einmal pro Zug verwenden.",
      archetype: "MINT",
      published: true
    }
  ];

  for (const update of updates) {
    const { cardNumber, ...rest } = update;
    await db.update(cards)
      .set(rest)
      .where(eq(cards.cardNumber, cardNumber));
    console.log(`Updated Card ${cardNumber}`);
  }
}

updateBatch3().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function updateBatches() {
  const updates = [
    // BATCH 4
    {
      cardNumber: 31,
      name: "Herr Bukow",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 22,
      subjects: "Biologie, Erdkunde",
      effect: "[MINT]\nSchülerforschungszentrum\nWenn du diese Karte einstellst: Du kannst 1 MINT-Lehrer in deinem Ruhestand wählen; mische sie in dein Deck zurück. Falls du dies tust, ziehe 1 Karte. Solange diese Karte offen im Chillmodus liegt, können deine anderen MINT-Lehrer nicht durch gegnerische Ereigniskarten in den Ruhestand geschickt werden.",
      archetype: "MINT",
      published: true
    },
    {
      cardNumber: 32,
      name: "Frau Brill",
      type: "lehrer",
      rarity: "normal",
      ansage: 8,
      chill: 2,
      dienstjahre: 20,
      subjects: "Spanisch, Englisch",
      effect: "[Europa]\nMadrid-Austausch\nFalls in diesem Zug einer deiner Europa-Lehrer auf deine Hand zurückgegeben wurde, kannst du diese Karte von deiner Hand im Ansagemodus einstellen. Wenn du diese Karte einstellst: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; gib ihn auf die Hand zurück.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 33,
      name: "Herr Bigalke",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 20,
      subjects: "Französisch, Spanisch",
      effect: "[Europa]\nDELE\nWenn du diese Karte einstellst: Du kannst 1 anderen Europa-Lehrer, den du kontrollierst, auf die Hand zurückgeben. Falls du dies tust, stelle 1 Europa-Lehrer mit einem anderen Namen von deiner Hand im selben Modus ein. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer durch einen deiner Effekte auf die Hand zurückgegeben wird: Wähle 1 offenen Lehrer deines Gegners mit weniger Dienstjahren als diese Karte; gib ihn auf die Hand zurück.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 34,
      name: "Frau Granger",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 5,
      subjects: "Englisch, Pädagogik",
      effect: "[Europa]\nSpeaking Time\nWenn diese Karte eingestellt wird: Sieh dir die obersten 3 Karten deines Decks an. Du kannst 1 Europa- oder Englisch-Lehrer darunter auf die Hand nehmen. Lege den Rest unter dein Deck.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 35,
      name: "Frau Klinkhammer",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 12,
      subjects: "Französisch, Englisch",
      effect: "[Europa]\nAustauschmappe\nWenn diese Karte eingestellt wird: Du kannst 1 Europa- oder 1 Lehrer mit Fremdsprache von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn du einen Europa-Lehrer einstellst: Du erhältst +2 Lehrkraft.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 36,
      name: "Frau Zarnikow",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 24,
      subjects: "Englisch, Musik, Spanisch",
      effect: "[Europa]\nSprachwechsel\nWenn diese Karte eingestellt wird: Du kannst 1 Spanisch- oder Europa-Lehrer von deiner Hand im offenen Chillmodus einstellen. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer eingestellt wird: Du erhältst +1 Lehrkraft.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 37,
      name: "Frau Morin",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 17,
      subjects: "Deutsch, Französisch",
      effect: "[Europa]\nAustauschprogramm\nWenn diese Karte eingestellt wird: Du kannst 1 Europa-Lehrer oder 1 Lehrer mit Fremdsprache von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer auf die Hand zurückgegeben wird: Du erhältst +2 Lehrkraft.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 38,
      name: "Frau Jülicher-Böker",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 26,
      subjects: "Englisch, Französisch",
      effect: "[Europa]\nEuropa-Schulen\nEinmal pro Spielzug, wenn einer deiner Europa-Lehrer Ziel eines Angriffs oder Effekts wird: Du kannst ihn auf die Hand zurückgeben. Falls du dies tust, stelle 1 anderen Europa-Lehrer mit einem anderen Namen von deiner Hand im offenen Chillmodus ein. Falls die Summe der Dienstjahre deiner offenen Europa-Lehrer 30 oder mehr beträgt, kannst du die neue Karte stattdessen im Ansagemodus einstellen.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 39,
      name: "Frau Hinz",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 18,
      subjects: "Geschichte, Englisch",
      effect: "[Europa]\nBilingualer Unterricht\nWenn diese Karte durch den Effekt eines Europa-Lehrers eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Zug: Wähle 1 Europa-Lehrer, den du kontrollierst. Liegt er im Ansagemodus, erhält er bis zum Ende des Zuges +2 Ansage. Liegt er im Chillmodus, erhält er bis zum Ende des nächsten gegnerischen Zuges +2 Chill.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 40,
      name: "Frau Aksu",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 9,
      subjects: "Englisch, Geschichte",
      effect: "[Europa]\nGeschichte bilingual\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer auf dem Feld; seine Ansage und Chill werden bis zum Ende des Zuges vertauscht. Einmal pro Spielzug: Wenn eine deiner Karten auf die Hand zurückkehrt, kannst du 1 Karte ziehen und dann 1 Karte ablegen.",
      archetype: "Europa",
      published: true
    },
    // BATCH 5
    {
      cardNumber: 41,
      name: "Herr Goecke",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 19,
      subjects: "Englisch, Erdkunde",
      effect: "[Europa]\nHongkong-Austausch\nFalls in diesem Zug einer deiner Europa-Lehrer durch einen Effekt auf die Hand zurückgegeben wurde, kannst du diese Karte von deiner Hand im Ansagemodus einstellen. Wenn du diese Karte einstellst: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; gib ihn auf die Hand zurück. Wenn diese Karte durch den Effekt eines Europa-Lehrer auf die Hand zurückgegeben wird: Du kannst 1 Europa-Lehrer mit einem anderen Namen von deiner Hand im Chillmodus einstellen.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 42,
      name: "Frau Roberts",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 15,
      subjects: "Englisch, Geschichte",
      effect: "[Europa]\nErasmus+\nWenn du diese Karte einstellst: Nimm 1 Europa-Lehrer mit einem anderen Namen von deinem Deck auf die Hand.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 43,
      name: "Frau Hübner",
      type: "lehrer",
      rarity: "normal",
      ansage: 8,
      chill: 2,
      dienstjahre: 16,
      subjects: "Deutsch, Französisch, Pädagogik",
      effect: "[Europa]\nDELF\nWenn du diese Karte einstellst: Wähle 1 Europa-Lehrer, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +2 Ansage und kann nicht Ziel gegnerischer Ereigniskarten werden. Wenn diese Karte durch den Effekt eines Europa-Lehrers auf die Hand zurückgegeben wird: Du kannst 1 Karte ziehen und dann 1 Karte ablegen.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 44,
      name: "Frau Arnold",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 15,
      subjects: "Deutsch, Psychologie",
      effect: "[Beratung]\nCoaching\nWenn diese Karte eingestellt wird: Wähle 1 anderen Lehrer, den du kontrollierst. Er erhält bis zum Ende des nächsten gegnerischen Zuges +1 Ansage und +1 Chill. Wenn eine deiner offenen Lehrer Ziel eines Angriffs oder Effekts wird: Du kannst diese Karte von deiner Hand abwerfen; gib jenen Lehrer auf die Hand zurück und ziehe 1 Karte.",
      archetype: "Beratung",
      published: true
    },
    {
      cardNumber: 45,
      name: "Frau Plätzer",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 9,
      subjects: "Deutsch, Religion",
      effect: "[Beratung]\nSchulseelsorge\nWenn du diese Karte einstellst: Du erhältst +2 Lehrkraft. Wenn dein Gegner dir durch Kampf oder einen Karteneffekt Lehrkraft abziehen würde: Du kannst diese Karte von deiner Hand abwerfen; ändere 1 offenen Lehrer auf dem Feld in den Chillmodus. Reduziere dann diesen Schaden auf 0.",
      archetype: "Beratung",
      published: true
    },
    {
      cardNumber: 46,
      name: "Herr Urban",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 10,
      subjects: "Informatik, Deutsch, Biologie",
      effect: "[Digitalisierung, Jugend debattiert]\nKI-Übernahme\nWenn dein Gegner den Effekt eines offenen Lehrers aktiviert oder einen Angriff erklärt: Du kannst diese Karte von deiner Hand abwerfen; annulliere ihren Effekt und übernimm den Lehrer bis zum Ende desselben Zuges im Chillmodus. Gib ihn danach ihrem Besitzer im Chillmodus zurück.",
      archetype: "Digitalisierung",
      published: true
    },
    {
      cardNumber: 47,
      name: "Herr Zuber",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 14,
      subjects: "SoWi, Sport",
      effect: "[Mittelstufe, Beratung, Digitalisierung]\nDigitale Blume\nWenn diese Karte eingestellt wird: Wähle bis zu 2 andere offene Lehrer mit unterschiedlichen Fachsymbolen, die du kontrollierst. Eine erhält +2 Ansage, die andere +2 Chill bis zum Ende des nächsten gegnerischen Zuges. Wenn dein Gegner den Effekt eines offenen Lehrers aktiviert: Du kannst diese Karte von deiner Hand abwerfen; falls du 4 verschiedene Fachsymbole unter deinen offenen Lehrern kontrollierst, annulliere den Effekt.",
      archetype: "Mittelstufe",
      published: true
    },
    {
      cardNumber: 48,
      name: "Herr Sellin",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 12,
      subjects: "Mathe, Geschichte, Informatik",
      effect: "[Digitalisierung]\nDigitalisierungsbeauftragung\nWenn du diese Karte einstellst: Du kannst 1 Karte abwerfen; nimm 1 Digitalisierung-Lehrer von deinem Deck auf die Hand. Einmal pro Spielzug, wenn dein Gegner einen Angriff erklärt oder den Effekt eines offenen Lehrers aktiviert: Wähle 1 offenen Lehrer, den du kontrollierst. Falls er mehr Dienstjahre hat als die gegnerische Karte, wird die Ansage der gegnerischen Karte bis zum Ende des Zuges halbiert. Runde auf.",
      archetype: "Digitalisierung",
      published: true
    },
    {
      cardNumber: 49,
      name: "Frau Piechota",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 4,
      subjects: "Deutsch, Pädagogik",
      effect: "[Digitalisierung]\nDigitale Mündigkeit\nEinmal pro Spielzug, wenn dein Gegner eine Ereigniskarte aktiviert oder eine Karte verdeckt setzt: Du kannst diese Karte von deiner Hand abwerfen oder, falls sie offen auf deinem Feld liegt, sie in den Chillmodus ändern; annulliere die Wirkung der Karte und schicke sie in den Ruhestand.",
      archetype: "Digitalisierung",
      published: true
    },
    {
      cardNumber: 50,
      name: "Herr Daniels",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 25,
      subjects: "Informatik, Mathe, Physik",
      effect: "[Digitalisierung]\nDigitalisierungskonzept\nWenn du diese Karte einstellst: Nimm 1 Digitalisierung-Lehrer oder WLAN-Ausfall von deinem Deck auf die Hand. Lege danach 1 Karte von deiner Hand unter dein Deck. Einmal pro beliebigem Spielzug, wenn eine Ereigniskarte aktiviert wird: Du kannst 1 Karte abwerfen; wähle 1 offene Lehrerkarte auf dem Feld. Ändere ihren Modus oder annulliere ihre Effekte bis zum Ende des Zuges.",
      archetype: "Digitalisierung",
      published: true
    }
  ];

  for (const update of updates) {
    const { cardNumber, ...rest } = update;
    await db.update(cards)
      .set(rest)
      .where(eq(cards.cardNumber, cardNumber));
    console.log(`Updated Card ${cardNumber}`);
  }
}

updateBatches().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function updateBatches() {
  const updates = [
    // BATCH 6
    {
      cardNumber: 51,
      name: "Herr Pick",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 19,
      subjects: "Deutsch, Biologie, Informatik",
      effect: "[Digitalisierung]\nHomepage\nWenn du diese Karte einstellst: Decke 1 verdeckte Karte auf dem Feld auf. Falls es eine Falle ist, kann sie in diesem Zug nicht aktiviert werden. Einmal pro beliebigem Spielzug, wenn eine Karte auf dem Feld aufgedeckt wird: Du kannst 1 Karte ziehen und dann 1 Karte abwerfen.",
      archetype: "Digitalisierung",
      published: true
    },
    {
      cardNumber: 52,
      name: "Herr Wefes",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 14,
      subjects: "SoWi, Englisch",
      effect: "[Digitalisierung]\nWissensorganisation\nWenn du diese Karte einstellst: Schaue dir die obersten 3 Karten deines Decks an. Ordne sie in beliebiger Reihenfolge. Du kannst anschließend 1 davon auf die Hand nehmen, falls es ein Lehrer mit 10 oder weniger Dienstjahren ist, und legst 1 Karte von deiner Hand unter dein Deck. Einmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers mit weniger Dienstjahren als diese Karte aktiviert: Du kannst jene Karte in den Chillmodus ändern.",
      archetype: "Digitalisierung",
      published: true
    },
    {
      cardNumber: 53,
      name: "Herr Schreiber",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 3,
      subjects: "Englisch, SoWi, Sport",
      effect: "[BNE]\nKlimaparlament\nWenn diese Karte eingestellt wird: Mische 1 Lehrer aus deinem Ruhestand in dein Deck; ziehe 1 Karte. Einmal pro Spielzug, wenn eine deiner Karten aus dem Ruhestand zurückkehrt: Wähle 1 offenen Lehrer auf dem Feld; er erhält bis zum Ende des Zuges -2 Ansage.",
      archetype: "BNE",
      published: true
    },
    {
      cardNumber: 54,
      name: "Frau Schaller-Picard",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 21,
      subjects: "Biologie, Musik, Religion",
      effect: "[BNE]\nKlimaparlament\nWenn diese Karte in den Ruhestand geschickt wird: Du kannst sie einmal pro Spiel im Chillmodus wieder einstellen. Einmal pro Spielzug, wenn eine deiner Karten aus dem Ruhestand auf deine Hand oder auf dein Feld zurückkehrt: Du erhältst +2 Lehrkraft.",
      archetype: "BNE",
      published: true
    },
    {
      cardNumber: 55,
      name: "Frau Efthymiadou",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 17,
      subjects: "Biologie, Englisch",
      effect: "[BNE]\nNachhaltige Wende\nWenn diese Karte eingestellt wird: Nimm 1 BNE-Lehrer aus deinem Ruhestand auf die Hand. Einmal pro Spielzug: Wenn eine deiner Karten aus dem Ruhestand zurückkehrt, wähle 1 offenen Lehrer. Falls diese Karte mehr Dienstjahre hat, ändere sie in den Chillmodus. Andernfalls erhält sie -2 Ansage.",
      archetype: "BNE",
      published: true
    },
    {
      cardNumber: 56,
      name: "Frau Voßkühler",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 15,
      subjects: "Kunst",
      effect: "[BetHa]\nStreetArt\nSolange du Herr Roth kontrollierst, können deine BetHa-Lehrer kein Ziel gegnerischer Ereignis- und Fallenkarten werden. Falls du einen anderen Lehrer mit dem Fach Kunst kontrollierst, erhältst du am Ende deines Zuges +1 Lehrkraft.",
      archetype: "BetHa",
      published: true
    },
    {
      cardNumber: 57,
      name: "Herr Roth",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 13,
      subjects: "Deutsch, SoWi",
      effect: "[BetHa]\nBis zum Schluss\nWenn diese Karte eingestellt wird: Gib 1 offenen Lehrer mit 6 oder weniger Ansage auf die Hand zurück. Solange diese Karte offen liegt, kannst du einmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers aktiviert und du 3 oder mehr Handkarten hast, 1 Karte abwerfen; ändere jene Karte in den Chillmodus.",
      archetype: "BetHa",
      published: true
    },
    {
      cardNumber: 58,
      name: "Herr Kruskic",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 6,
      subjects: "Chemie, Englisch",
      effect: "[Musik und Bühne]\nPyrotechnik\nWenn diese Karte eingestellt wird: Schicke 1 verdeckte Karte deines Gegners in den Ruhestand. Falls es eine Falle war, verliert dein Gegner 2 Lehrkraft. Wenn dein Gegner eine Ereigniskarte aktiviert oder eine Karte verdeckt setzt: Du kannst diese Karte von deiner Hand abwerfen; 1 offener Lehrer erhält bis zum Ende des Zuges -3 Ansage.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 59,
      name: "Frau Ditgens",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 11,
      subjects: "Musik",
      effect: "[Musik und Bühne]\nEinschulungsmusik\nWenn diese Karte eingestellt wird: Du erhältst +2 Lehrkraft. Einmal pro Spielzug, wenn einer deiner Lehrer Ziel eines Angriffs wird: Du kannst diese Karte von deiner Hand abwerfen; ändere deinen Lehrer in den Chillmodus.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 60,
      name: "Herr Gessner",
      type: "lehrer",
      rarity: "normal",
      ansage: 2,
      chill: 8,
      dienstjahre: 5,
      subjects: "Musik",
      effect: "[Musik und Bühne]\nOrchesterprobe\nSolange diese Karte offen im Chillmodus liegt: Alle Musik-und-Bühne-Lehrer, die du kontrollierst, erhalten +1 Ansage. Einmal pro Zug, wenn dein Gegner einen Angriff erklärt: Du kannst diese Karte von deiner Hand abwerfen; der Angriff wird annulliert.",
      archetype: "Musik und Bühne",
      published: true
    },
    // BATCH 7
    {
      cardNumber: 61,
      name: "Frau Brockmann",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 3,
      subjects: "Musik",
      effect: "[Musik und Bühne]\nMusical\nWenn diese Karte eingestellt wird: Wähle bis zu 2 offene Lehrer, die du kontrollierst. Sie erhalten bis zum Ende des nächsten gegnerischen Zuges +1 Ansage und +1 Chill. Wenn einer deiner Lehrer seinen Modus ändert: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 62,
      name: "Herr Spill-Hartung",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 8,
      subjects: "Deutsch, Musik",
      effect: "[Musik und Bühne]\nRhythmusgefühl\nWenn diese Karte eingestellt wird: Ändere den Modus von bis zu 2 deiner Lehrer. Einmal pro Spielzug, wenn einer deiner Lehrer ihren Modus ändert: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 63,
      name: "Frau Jung",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 15,
      subjects: "Latein, Englisch, Musik, Spanisch",
      effect: "[Musik und Bühne]\nPop\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Falls die abgelegte Karte ein Lehrer war, erhält 1 offener Lehrer, den du kontrollierst, bis zum Ende des Zuges +2 Ansage.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 64,
      name: "Frau Bischop",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 2,
      subjects: "Erdkunde, Englisch",
      effect: "[Musik und Bühne]\nIrish Dance\nWenn diese Karte eingestellt wird: Ändere den Modus von 1 offenen Lehrer. Einmal pro Spielzug, wenn ein Lehrer seinen Modus ändert: Diese Karte erhält bis zum Ende des Zuges +2 Ansage. Falls sie dadurch 9 oder mehr Ansage hat, kann sie beim Angriff auf einen Lehrer im Chillmodus direkt Schaden in Höhe der Differenz zufügen.",
      archetype: "Musik und Bühne",
      published: true
    },
    {
      cardNumber: 65,
      name: "Herr Beichl",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 7,
      subjects: "SoWi, Englisch",
      effect: "[Vielfalt]\nVielfalts-AG\nWenn diese Karte eingestellt wird: Du kannst Schule ohne Rassismus direkt von deinem Deck offen in deine Hintergrundreihe legen. Falls Schule ohne Rassismus offen liegt, erhalten offene gegnerische Lehrer mit 7 oder mehr Ansage -2 Ansage und +2 Chill. Wenn dein Gegner den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Du kannst diese Karte von deiner Hand abwerfen; ändere jene Karte in den Chillmodus.",
      archetype: "Vielfalt",
      published: true
    },
    {
      cardNumber: 66,
      name: "Frau Wissemann",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 5,
      subjects: "Spanisch, Sport",
      effect: "[Vielfalt, FerienWerk]\nAntidiskriminierungsarbeit\nWenn diese Karte eingestellt wird: Falls Schule ohne Rassismus offen in deiner Hintergrundreihe liegt, ziehe 1 Karte. Einmal pro Spielzug, wenn ein gegnerischer Lehrer durch einen deiner Effekte in den Chillmodus geändert wird: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.",
      archetype: "Vielfalt",
      published: true
    },
    {
      cardNumber: 67,
      name: "Frau Tenter",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 9,
      subjects: "Sport, Kunst",
      effect: "[Vielfalt, FerienWerk]\nSafe Space\nWenn diese Karte eingestellt wird: Falls Schule ohne Rassismus offen in deiner Hintergrundreihe liegt, wähle 1 offenen gegnerischen Lehrer; ändere seinen Modus. Einmal pro Zug, wenn dein Gegner eine Ereignis- oder Fallenkarte aktiviert, die einen deiner Lehrer betrifft: Du kannst diese Karte von deiner Hand abwerfen; annulliere den Effekt.",
      archetype: "Vielfalt",
      published: true
    },
    {
      cardNumber: 68,
      name: "Frau Bünger",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 6,
      subjects: "Sport, Erdkunde, Biologie",
      effect: "[FerienWerk, Bewegung]\nFerienWerk\nWenn diese Karte eingestellt wird und du Frau Tenter oder Frau Wissemann kontrollierst: Ziehe 2 Karten, dann lege 1 Karte ab. Einmal pro Zug: Wenn einer deiner Lehrer in den Ruhestand geschickt wird, kannst du 1 Karte vom Ruhestand deines Gegners aus dem Spiel entfernen.",
      archetype: "FerienWerk",
      published: true
    },
    {
      cardNumber: 69,
      name: "Frau Jaite",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 9,
      subjects: "Latein, Deutsch",
      effect: "[Vielfalt, Europa]\nGleichstellung\nWenn diese Karte in den Ruhestand geschickt wird, kannst du eine Karte mit identischen Ansage- und Chillwerten direkt von deinem Deck einstellen.",
      archetype: "Vielfalt",
      published: true
    },
    {
      cardNumber: 70,
      name: "Frau Janura",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 7,
      subjects: "Englisch, Religion",
      effect: "[Januras]\nYing\nWenn diese Karte eingestellt wird: Du kannst Herr Janura von deiner Hand oder aus deinem Ruhestand im Chillmodus einstellen. Solange du Herr Janura kontrollierst, erhalten beide +4 Ansage. Einmal pro Spielzug: Wenn eine deiner Janura-Karten Ziel eines Angriffs oder Effekts wird, kannst du 1 Karte abwerfen; gib eine Janura-Karte auf die Hand zurück.",
      archetype: "Januras",
      published: true
    }
  ];

  for (const update of updates) {
    const { cardNumber, ...rest } = update;
    await db.update(cards)
      .set(rest)
      .where(eq(cards.cardNumber, cardNumber));
    console.log(`Updated Card ${cardNumber}`);
  }
}

updateBatches().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function updateBatches() {
  const updates = [
    // BATCH 8
    {
      cardNumber: 71,
      name: "Herr Janura",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 5,
      subjects: "Geschichte, Philosophie, Informatik",
      effect: "[Januras]\nYang\nWenn diese Karte eingestellt wird: Du kannst Frau Janura von deiner Hand im Chillmodus einstellen. Einmal pro Zug: Falls du Frau Janura kontrollierst, wähle 1 offenen Lehrer; seine Ansage und Chill werden bis zum Ende des Zuges vertauscht. Wenn Frau Janura das Feld verlässt: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.",
      archetype: "Januras",
      published: true
    },
    {
      cardNumber: 72,
      name: "Frau Windgasse",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 25,
      subjects: "Erziehungswissenschaft, Englisch",
      effect: "[Ausbildung]\nUnterrichtsbesuch\nWenn diese Karte eingestellt wird: Du kannst 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im Chillmodus einstellen. Einmal pro Spielzug: Wenn ein anderer Lehrer, den du kontrollierst und der weniger Dienstjahre als diese Karte hat, in den Ruhestand gehen würde, gib sie stattdessen auf die Hand zurück.",
      archetype: "Ausbildung",
      published: true
    },
    {
      cardNumber: 73,
      name: "Frau Orth",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 12,
      subjects: "Deutsch, Sport",
      effect: "[Ausbildung]\nPraxissemester\nWenn diese Karte eingestellt wird: Nimm 1 Lehrer mit 10 oder weniger Dienstjahren von deinem Deck auf die Hand. Einmal pro Spielzug: Wenn du einen Lehrer mit 5 oder weniger Ansage (außer Frau Orth) einstellst, darf jener Lehrer in diesem Zug zwei Mal angreifen.",
      archetype: "Ausbildung",
      published: true
    },
    {
      cardNumber: 74,
      name: "Frau Sonntag",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 17,
      subjects: "Deutsch, Englisch, Religion",
      effect: "[Ausbildung]\nOrientierung\nFalls dein Gegner mehr Lehrer kontrolliert als du, darfst du in deinem Unterricht 1 zusätzliche Lehrerkarte im Chillmodus einstellen. Einmal pro Zug, wenn du einen Lehrer im Chillmodus einstellst: Du kannst 1 anderen offenen Lehrer, den du kontrollierst, in den Chillmodus drehen.",
      archetype: "Ausbildung",
      published: true
    },
    {
      cardNumber: 75,
      name: "Frau Heller",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 13,
      subjects: "Englisch, SoWi",
      effect: "[Lehrerrat]\nTagesordnung\nWenn diese Karte eingestellt wird: Sieh dir die Hand deines Gegners an. Wähle 1 Ereignis- oder Fallenkarte daraus; bis zum Ende des nächsten gegnerischen Zuges kann dein Gegner keine Karte mit demselben Namen spielen oder setzen.",
      archetype: "Lehrerrat",
      published: true
    },
    {
      cardNumber: 76,
      name: "Frau Linnartz",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 25,
      subjects: "Englisch, Biologie",
      effect: "[Lehrerrat]\nMehrheitsbeschluss\nZu Beginn deiner Pause: Wähle 1 Beschluss. Er gilt bis zum Ende des gegnerischen Zuges:\n1) Direkte Angriffe sind nicht erlaubt.\n2) Jeder Spieler kann nur mit 1 Lehrer angreifen.\n3) Lehrer mit 8 oder mehr Ansage können ihre Effekte nicht aktivieren.",
      archetype: "Lehrerrat",
      published: true
    },
    {
      cardNumber: 77,
      name: "Herr Bünger",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 16,
      subjects: "Sport, SoWi",
      effect: "[Lehrerrat]\nBeschlussvorlage\nWenn diese Karte eingestellt wird: Nimm 1 Ereignis- oder Fallenkarte aus deinem Ruhestand auf die Hand. Falls es eine dauerhafte Ereigniskarte war, kannst du sie stattdessen offen in deine Hintergrundreihe legen.",
      archetype: "Lehrerrat",
      published: true
    },
    {
      cardNumber: 78,
      name: "Frau Brüning",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 7,
      subjects: "Erziehungswissenschaft, Spanisch",
      effect: "[Europa]\nBabysitter-AG\nWenn diese Karte eingestellt wird: Nimm 1 Lehrer mit 5 oder weniger Ansage aus deinem Ruhestand auf die Hand. Einmal pro Spielzug: Wenn einer deiner Lehrer mit 5 oder weniger Ansage Ziel eines Angriffs wird, kannst du 1 Karte abwerfen; ändere jenen Lehrer in den Chillmodus.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 79,
      name: "Frau Harms",
      type: "lehrer",
      rarity: "normal",
      ansage: 8,
      chill: 2,
      dienstjahre: 22,
      subjects: "Deutsch, Erziehungswissenschaft",
      effect: "Erziehung\nWenn diese Karte eingestellt wird: Wähle 1 offenen gegnerischen Lehrer; er kann im nächsten gegnerischen Zug nicht angreifen und seine Effekte nicht aktivieren. Nimm außerdem einen Lehrer mit dem Fach Erziehungswissenschaft vom Deck auf deine Hand auf.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 80,
      name: "Frau Wallerath",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 11,
      subjects: "Deutsch, Englisch",
      effect: "Korrektur\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte von deiner Hand unter dein Deck. Einmal pro Spielzug, wenn Kampfwerte verglichen werden: Du kannst bei 1 beteiligten Lehrer Ansage und Chill bis zum Ende des Zuges vertauschen.",
      archetype: "",
      published: true
    },
    // BATCH 9
    {
      cardNumber: 81,
      name: "Frau Wirtz",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 11,
      subjects: "Deutsch, Kunst",
      effect: "Bibliotheksrecherche\nWenn diese Karte eingestellt wird: Mische bis zu 2 Karten aus deinem Ruhestand in dein Deck. Einmal pro Zug: Du kannst 1 Karte aus deinem Ruhestand unter dein Deck legen; ziehe 1 Karte, dann wirf 1 Karte ab.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 82,
      name: "Frau Ilaender",
      type: "lehrer",
      rarity: "normal",
      ansage: 4,
      chill: 6,
      dienstjahre: 4,
      subjects: "Deutsch, SoWi",
      effect: "[Europa]\nErgänzung\nWenn diese Karte eingestellt wird: Du darfst in diesem Zug 1 zusätzlichen Lehrer mit 4 oder weniger Ansage einstellen. Einmal pro Spielzug, wenn einer deiner Lehrer auf deine Hand zurückgegeben wird: Du kannst diese Karte in den Chillmodus ändern.",
      archetype: "Europa",
      published: true
    },
    {
      cardNumber: 83,
      name: "Frau Ruhmann",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 8,
      subjects: "Französisch, Religion",
      effect: "Erste Hilfe\nWenn einer deiner Lehrer durch Kampf in den Ruhestand gehen würde: Du kannst diese Karte von deiner Hand abwerfen; ändere jenen Lehrer stattdessen in den Chillmodus. Wenn diese Karte eingestellt wird: Du erhältst +2 Lehrkraft.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 84,
      name: "Frau Vianden",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 3,
      subjects: "Englisch, Kunst",
      effect: "Renaissance\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer auf dem Feld; diese erhält bis zum Ende des Zuges die Ansage und den Chill-Wert eines anderen offenen Lehrers auf dem Feld. Du kannst diesen Effekt nur einmal pro Zug verwenden.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 85,
      name: "Herr Harms",
      type: "lehrer",
      rarity: "normal",
      ansage: 5,
      chill: 5,
      dienstjahre: 17,
      subjects: "Englisch, Sport",
      effect: "Fachleitung\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer, den du kontrollierst; er erhält bis zum Ende des Zuges +2 Ansage. Einmal pro Spielzug, wenn du einen Englisch-Lehrer einstellst: Ziehe 1 Karte.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 86,
      name: "Herr Gebauer",
      type: "lehrer",
      rarity: "normal",
      ansage: 6,
      chill: 4,
      dienstjahre: 14,
      subjects: "Deutsch, Geschichte, Religion",
      effect: "Gamification\nZu Beginn deiner Pause: Nenne deinem Gegner 1 Ziel für diesen Zug:\n1) Stelle 1 Lehrerkarte ein. 2) Aktiviere 1 Ereignis- oder Fallenkarte. 3) Schicke 1 gegnerischen Lehrer durch Kampf in den Ruhestand. Wenn du dein gewähltes Ziel in diesem Zug erfüllst, wähle direkt danach 1 Belohnung: 1) Ziehe 1 Karte. 2) Stelle 1 zusätzliche Lehrerkarte mit 4 oder weniger Ansage im Chillmodus ein. 3) 1 offenen Lehrer, den du kontrollierst, darf in diesem Zug einen zusätzlichen Angriff durchführen.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 87,
      name: "Frau Neumann",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 9,
      subjects: "Erdkunde, Mathematik",
      effect: "Koordinaten\nWenn diese Karte eingestellt wird: Sieh dir die obersten 3 Karten eines Decks an und lege sie in beliebiger Reihenfolge zurück. Einmal pro Spielzug: Du kannst die oberste Karte deines Decks aufdecken; ist es ein Lehrer, erhältst du +1 Lehrkraft. Andernfalls lege sie unter dein Deck.",
      archetype: "",
      published: true
    },
    {
      cardNumber: 88,
      name: "Frau Hoffmann",
      type: "lehrer",
      rarity: "normal",
      ansage: 8,
      chill: 2,
      dienstjahre: 3,
      subjects: "Deutsch, Geschichte, Religion",
      effect: "[Jugend debattiert]\nInsta-Debatte\nWenn einer deiner Lehrer durch einen Karteneffekt auf deine Hand zurückgegeben wird: Du kannst diese Karte ohne Tribut von deiner Hand offen im Ansagemodus einstellen. Falls die zurückgegebene Karte ein Jugend-debattiert-Lehrer war, ziehe 1 Karte, dann wirf 1 Karte ab. Du kannst diesen Effekt nur einmal pro Zug verwenden.",
      archetype: "Jugend debattiert",
      published: true
    },
    {
      cardNumber: 89,
      name: "Frau Gottschalk",
      type: "lehrer",
      rarity: "normal",
      ansage: 3,
      chill: 7,
      dienstjahre: 5,
      subjects: "Englisch, Philosophie",
      effect: "[Jugend debattiert]\nSchlussplädoyer\nAm Ende deines Zuges, falls in diesem Zug 1 oder mehr deiner Jugend-debattiert-Lehrer vom Chillmodus aufgedeckt oder durch einen Karteneffekt auf deine Hand zurückgegeben wurden: Wähle 1 Effekt: 1. Dein Gegner legt die obersten 2 Karten seines Decks in den Ruhestand. 2. Drehe 1 offenen Jugend-debattiert-Lehrer, den du kontrollierst, in den verdeckten Chillmodus. Du kannst den Effekt nur einmal pro Zug verwenden.",
      archetype: "Jugend debattiert",
      published: true
    },
    {
      cardNumber: 90,
      name: "Herr Schneider",
      type: "lehrer",
      rarity: "normal",
      ansage: 7,
      chill: 3,
      dienstjahre: 29,
      subjects: "Deutsch, Mathematik",
      effect: "[Jugend debattiert]\nVerschriftlichung\nWenn diese Karte eingestellt wird: Decke die obersten 3 Karten deines Decks auf. Du kannst 1 Jugend-debattiert-Lehrer darunter auf die Hand nehmen. Lege den Rest in beliebiger Reihenfolge unter dein Deck. Falls du Herrn Kamphoff kontrollierst, kannst du stattdessen 1 Jugend debattiert-Lehrer darunter direkt im offenen Chillmodus einstellen. Du kannst diesen Effekt nur einmal pro Zug verwenden.",
      archetype: "Jugend debattiert",
      published: true
    }
  ];

  for (const update of updates) {
    const { cardNumber, ...rest } = update;
    await db.update(cards)
      .set(rest)
      .where(eq(cards.cardNumber, cardNumber));
    console.log(`Updated Card ${cardNumber}`);
  }
}

updateBatches().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  const updates = [
    {
      id: 91,
      name: "Frau Hinkers",
      type: "lehrer",
      ansage: 3,
      chill: 7,
      effekt: "[Jugend debattiert] Zwischenfrage\nWenn 1 anderer Jugend-debattiert-Lehrer, den du kontrollierst, als Angriffsziel gewählt wird: Du kannst das Angriffsziel auf diese Karte ändern. Wird diese Karte dadurch vom Chillmodus aufgedeckt, annulliere den Angriff. Danach kannst du 1 offenen Jugend-debattiert-Lehrer, den du kontrollierst, in den verdeckten Chillmodus drehen. Du kannst diesen Effekt von Frau Hinkers nur einmal pro Zug verwenden.",
    },
    {
      id: 92,
      name: "Herr Kamphoff",
      type: "lehrer",
      ansage: 0,
      chill: 10,
      effekt: "[Jugend debattiert] Konter\nWenn diese Karte aufgedeckt wird: Gib den angreifenden Lehrer auf die Hand zurück. Sein Besitzer legt die obersten 2 Karten seines Decks in den Ruhestand. Einmal pro Zug: Du kannst 1 anderen Lehrer, den du kontrollierst, auf die Hand zurückgeben; ändere diese Karte in den verdeckten Chillmodus.",
    },
    {
      id: 93,
      name: "Elternsprechtag",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Solange der Elternsprechtag läuft, sind die Werte von Ansage und Chill vertauscht.",
    },
    {
      id: 94,
      name: "CertiLingua",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wähle 1 Europa-Lehrer oder 1 Lehrer mit Fremdsprache, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +3 Ansage und kann nicht Ziel gegnerischer Ereigniskarten werden. Falls dieser Lehrer in diesem Zug durch einen deiner Effekte auf die Hand zurückgegeben wird, ziehe 1 Karte.",
    },
    {
      id: 95,
      name: "Schule ohne Rassismus",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Offene gegnerische Lehrer mit 6 oder mehr Ansage erhalten -2 Ansage und +1 Chill. Einmal pro Spielzug: Wenn dein Gegner den Effekt eines solchen Lehrers aktiviert, kannst du 1 Karte abwerfen; ändere ihn in den Chillmodus.",
    },
    {
      id: 96,
      name: "Ausbildung am CFG",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Stelle 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im verdeckten Chillmodus ein. Falls du ihn zu Beginn deines nächsten Zuges in den Ansage-Modus änderst, ziehe 1 Karte.",
    },
    {
      id: 97,
      name: "Abiturklausurplan",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Solange diese Karte offen in deiner Hintergrundreihe liegt, erhalten deine Oberstufe-Lehrer +2 Ansage. Einmal pro Zug: Falls die Summe der Dienstjahre deiner offenen Oberstufe-Lehrer 45 oder mehr beträgt, kannst du 1 Karte ziehen und dann 1 Karte ablegen.",
    },
    {
      id: 98,
      name: "Sponsorenlauf",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wenn diese Karte aktiviert wird: Lege 2 Rundenpunkte auf diese Karte. Immer wenn einer deiner Bewegung-Lehrer einen Kampf gewinnt oder direkt Schaden zufügt: Lege 1 Rundenpunkt auf diese Karte. Einmal pro Zug: Du kannst 4 Rundenpunkte von dieser Karte entfernen; wähle: 1) 1 Bewegung-Lehrer, den du kontrollierst, erhält bis zum Ende des Zuges +3 Ansage und kann in diesem Zug einmal zusätzlich angreifen. 2) Du erhältst +5 Lehrkraft.",
    },
    {
      id: 99,
      name: "Kursumwahl",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wähle 1 Oberstufe-Lehrer von deiner Hand und 1 Oberstufe-Lehrer aus deinem Ruhestand. Tausche die beiden Karten miteinander. Falls du einen offenen Lehrer mit 20 oder mehr Dienstjahren kontrollierst, kannst du anschließend 1 Karte ziehen und dann 1 Karte ablegen.",
    },
    {
      id: 100,
      name: "Ordnungsmaßnahme",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wähle 1 offenen Lehrer im Ansagemodus auf dem Feld und schicke ihn in den Ruhestand.",
    }
  ];

  for (const update of updates) {
    console.log(`Updating card ${update.id}`);
    await db.update(cards)
      .set({
        name: update.name,
        type: update.type,
        ansage: update.ansage,
        chill: update.chill,
        effect: update.effekt
      })
      .where(eq(cards.id, update.id));
  }
  
  console.log("Batch 10 done");
  process.exit(0);
}

main().catch(console.error);
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  const updates = [
    {
      id: 101,
      name: "Vertretungsplan",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wähle 1 Lehrer in deinem Ruhestand. Stelle ihn im Chillmodus ein, aber seine Effekte sind für diesen Zug annulliert.",
    },
    {
      id: 102,
      name: "Sternwarte",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Solange diese Karte offen in deiner Hintergrundreihe liegt, erhalten deine Astronomie-Lehrer +2 Ansage und +2 Chill. Einmal pro Zug: Falls du einen Astronomie-Lehrer kontrollierst, kannst du 1 Karte von deiner Hand unter dein Deck legen; ziehe 1 Karte.",
    },
    {
      id: 103,
      name: "Mensa-Team",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Du bekommst Unterstützung vom Mensa-Team und in jedem deiner Züge, jetzt beginnend, +2 Lehrkraft.",
    },
    {
      id: 104,
      name: "Debattenprüfung",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wenn diese Karte aktiviert wird: Du kannst 1 Jugend-debattiert-Lehrer von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn 1 deiner Jugend-debattiert-Lehrer durch einen Effekt auf die Hand zurückgegeben wird: Du kannst 1 Karte ziehen.",
    },
    {
      id: 105,
      name: "Frau Kappe",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Nimm 1 Fallenkarte oder 1 Ereigniskarte von deinem Deck auf die Hand.",
    },
    {
      id: 106,
      name: "Frau Lettmann",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Nimm 1 Lehrer mit 6 oder weniger Ansage von deinem Deck auf die Hand.",
    },
    {
      id: 107,
      name: "Hausmeister-Team",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Wähle 1 Karte in einer Hintergrundreihe und zerstöre sie.",
    },
    {
      id: 108,
      name: "Zeugniskonferenz",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Ziehe 2 Karten, dann lege 1 Karte in den Ruhestand. Falls du keinen Lehrer auf dem Feld kontrollierst, ziehe stattdessen 3 Karten und lege 1 Karte in den Ruhestand.",
    },
    {
      id: 109,
      name: "Kollegiumsausflug",
      type: "ereignis",
      ansage: null,
      chill: null,
      effekt: "Schicke alle offenen Lehrer im Ansagemodus in den Ruhestand. Kein Spieler kann in diesem Zug angreifen.",
    },
    {
      id: 110,
      name: "Antrag abgelehnt",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner den Effekt eines Lehrers aktiviert, der in diesem Zug eingestellt wurde, oder mit ihm angreift: Annulliere den Effekt oder Angriff und ändere jene Karte in den Chillmodus.",
    }
  ];

  for (const update of updates) {
    console.log(`Updating card ${update.id}`);
    await db.update(cards)
      .set({
        name: update.name,
        type: update.type,
        ansage: update.ansage,
        chill: update.chill,
        effect: update.effekt
      })
      .where(eq(cards.id, update.id));
  }
  
  console.log("Batch 11 done");
  process.exit(0);
}

main().catch(console.error);
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cards } from "../lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  const updates = [
    {
      id: 111,
      name: "Lehrerratsprotokoll",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner in demselben Zug einen zweiten Lehrer einstellt oder einen zweiten Angriff erklärt: Annulliere diese Aktion.",
    },
    {
      id: 112,
      name: "LGBTQIA+",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner einen Angriff erklärt oder den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Jene Karte erhält -3 Ansage und +1 Chill. Ändere sie außerdem in den Chillmodus.",
    },
    {
      id: 113,
      name: "Unterrichtsstörung",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner einen Angriff erklärt: Wähle 1 offenen Lehrer auf dem Feld; seine Ansage wird bis zum Ende des Zuges halbiert. Runde auf.",
    },
    {
      id: 114,
      name: "WLAN-Ausfall",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Aktiviere diese Karte nur, wenn dein Gegner mehr offene Lehrer kontrolliert als du. Ändere alle offenen Lehrer auf dem Feld in den Chillmodus. Bis zum Beginn deines nächsten Zuges kann kein Spieler Ereigniskarten aktivieren oder den Modus eines Lehrers ändern.",
    },
    {
      id: 115,
      name: "Lehrermangel",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn einer deiner Lehrer durch Kampf in den Ruhestand geschickt würde: Gib ihn stattdessen auf die Hand zurück.",
    },
    {
      id: 116,
      name: "Mündliche Nachprüfung",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn einer deiner Lehrer durch Kampf in den Ruhestand geschickt würde: Er wird nicht in den Ruhestand geschickt. Ändere stattdessen seinen Modus in den Chillmodus. Seine Effekte sind bis zum Ende des Zuges annulliert.",
    },
    {
      id: 117,
      name: "Überraschungstest",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner einen Lehrer einstellt: Annulliere seinen Effekt bis zum Ende dieses Zuges.",
    },
    {
      id: 118,
      name: "Nachsitzen",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner einen Lehrer einstellt: Alle gegnerischen Lehrer wechseln in den Chillmodus und bleiben darin, bis du 2 offene Lehrer kontrollierst. Lege diese Karte dann in den Ruhestand.",
    },
    {
      id: 119,
      name: "Pensionszwang",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner eine Karte aus seinem Ruhestand auf die Hand nimmt oder einstellt: Annulliere den Effekt. Entferne bis zu 3 Karten im Ruhestand deines Gegners aus dem Spiel.",
    },
    {
      id: 120,
      name: "Feueralarm",
      type: "falle",
      ansage: null,
      chill: null,
      effekt: "Wenn dein Gegner mit einem Lehrer 7+ Ansage angreift: Gib den angreifenden Lehrer und 1 anderen offenen Lehrer deines Gegners auf die Hand zurück.",
    }
  ];

  for (const update of updates) {
    console.log(`Updating card ${update.id}`);
    await db.update(cards)
      .set({
        name: update.name,
        type: update.type,
        ansage: update.ansage,
        chill: update.chill,
        effect: update.effekt
      })
      .where(eq(cards.id, update.id));
  }
  
  console.log("Batch 12 done");
  process.exit(0);
}

main().catch(console.error);
