"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Upload } from "lucide-react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Card } from "@/lib/db/schema";
import { subjects } from "@/lib/config";
import { cn } from "@/lib/utils";
import { uploadCardImage } from "@/lib/actions/uploads";

interface CardFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Partial<Card>;
  submitLabel?: string;
}

const fieldLabel = "font-body text-muted-foreground mb-1.5 block text-sm font-medium";
const fieldInput =
  "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function CardForm({ action, defaultValues, submitLabel }: CardFormProps) {
  const [type, setType] = useState<string>(defaultValues?.type || "lehrer");
  const [cardNumber, setCardNumber] = useState<string>(
    defaultValues?.cardNumber ? String(defaultValues.cardNumber) : ""
  );
  const [auflage, setAuflage] = useState<string>(
    String(defaultValues?.auflage ?? 1)
  );
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl ?? "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Track selected subjects for Lehrer cards
  const initialSubjects = defaultValues?.subjects ? defaultValues.subjects.split(",") : [];
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(initialSubjects);

  const toggleSubject = (fach: string) => {
    setSelectedSubjects(prev => 
      prev.includes(fach) ? prev.filter(s => s !== fach) : [...prev, fach]
    );
  };

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const normalizedCardNumber = parseInt(cardNumber, 10);
    if (!Number.isInteger(normalizedCardNumber) || normalizedCardNumber < 1) {
      setUploadError("Bitte zuerst eine gültige Kartennummer setzen.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.set("image", file);
    formData.set("cardNumber", String(normalizedCardNumber));
    formData.set("auflage", auflage);
    if (defaultValues?.id) {
      formData.set("cardId", String(defaultValues.id));
    }

    try {
      const result = await uploadCardImage(formData);
      if (result.error || !result.url) {
        setUploadError(result.error ?? "Upload fehlgeschlagen.");
      } else {
        setImageUrl(result.url);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setUploadError(`Serverfehler: ${message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      action={action}
      className="bg-muted border-border flex max-w-2xl flex-col gap-6 rounded-xl border p-6"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={fieldLabel}>
            Kartenname *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoFocus
            defaultValue={defaultValues?.name ?? ""}
            className={fieldInput}
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className={fieldLabel}>
            Kartennummer *
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="number"
            min={1}
            required
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            className={`${fieldInput} font-mono tabular-nums`}
          />
          <p className="font-body text-muted-foreground mt-1 text-xs">
            Neue Karten starten automatisch mit der nächsten freien Nummer.
          </p>
        </div>

        <div>
          <label htmlFor="type" className={fieldLabel}>
            Kartentyp *
          </label>
          <select
            id="type"
            name="type"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={fieldInput}
          >
            <option value="lehrer">Lehrer</option>
            <option value="ereignis">Ereignis</option>
            <option value="falle">Falle</option>
            <option value="sonderkarte">Sonderkarte</option>
          </select>
        </div>

        <div className="sm:col-span-2 border-t border-border pt-6"></div>

        <div>
          <label htmlFor="rarity" className={fieldLabel}>
            Seltenheit
          </label>
          <select
            id="rarity"
            name="rarity"
            defaultValue={defaultValues?.rarity ?? "normal"}
            className={fieldInput}
          >
            <option value="normal">Normal</option>
            <option value="golden">Golden</option>
            <option value="limitiert">Limitiert</option>
          </select>
        </div>

        <div>
          <label htmlFor="auflage" className={fieldLabel}>
            Auflage
          </label>
          <select
            id="auflage"
            name="auflage"
            value={auflage}
            onChange={(e) => setAuflage(e.target.value)}
            className={fieldInput}
          >
            <option value="1">1. Auflage</option>
            <option value="2">2. Auflage</option>
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className={fieldLabel}>
            Bild-Pfad *
          </label>
          <div className="relative">
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              required
              placeholder="https://cdn.cfglegends.de/cards/v1/103.webp"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className={fieldInput}
            />
            <p className="font-body text-muted-foreground mt-1 text-xs">
              Entweder statischer Pfad oder URL aus dem Upload.
            </p>
            <div className="mt-3">
              <label
                htmlFor="card-image-upload"
                className="bg-background border-border text-muted-foreground hover:text-gold hover:border-gold/50 inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors"
              >
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                {uploading ? "Lade Bild hoch..." : "Bild hochladen"}
              </label>
              <input
                id="card-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
              {uploadError ? (
                <p className="mt-2 text-xs text-red-400">{uploadError}</p>
              ) : (
                <p className="font-body text-muted-foreground mt-2 text-xs">
                  Upload nutzt Vercel Blob und speichert z.B. als `cards/{cardNumber}.png`.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- LEHRER SPECIFIC FIELDS --- */}
        {type === "lehrer" && (
          <>
            <div className="sm:col-span-2 border-t border-border pt-6"></div>
            
            <div>
              <label htmlFor="ansage" className={fieldLabel}>
                Ansage
              </label>
              <input
                id="ansage"
                name="ansage"
                type="number"
                min={0}
                defaultValue={defaultValues?.ansage ?? ""}
                className={`${fieldInput} font-mono tabular-nums`}
              />
            </div>

            <div>
              <label htmlFor="chill" className={fieldLabel}>
                Chill
              </label>
              <input
                id="chill"
                name="chill"
                type="number"
                min={0}
                defaultValue={defaultValues?.chill ?? ""}
                className={`${fieldInput} font-mono tabular-nums`}
              />
            </div>

            <div>
              <label htmlFor="dienstjahre" className={fieldLabel}>
                Dienstjahre
              </label>
              <input
                id="dienstjahre"
                name="dienstjahre"
                type="number"
                min={0}
                defaultValue={defaultValues?.dienstjahre ?? ""}
                className={`${fieldInput} font-mono tabular-nums`}
              />
            </div>

            <div>
              <label htmlFor="archetype" className={fieldLabel}>
                Archetyp
              </label>
              <input
                id="archetype"
                name="archetype"
                type="text"
                placeholder="z.B. [Europa]"
                defaultValue={defaultValues?.archetype ?? ""}
                className={fieldInput}
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className={fieldLabel}>Fächer</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mt-2">
                {subjects.map((s) => {
                  const isSelected = selectedSubjects.includes(s.name);
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => toggleSubject(s.name)}
                      className={cn(
                        "font-body rounded-md border py-2 text-sm transition-colors",
                        isSelected 
                          ? "bg-gold/20 border-gold text-foreground" 
                          : "bg-background border-border text-muted-foreground hover:border-gold/50"
                      )}
                    >
                      {s.name}
                      {/* Hidden input to submit the array value */}
                      {isSelected && (
                        <input type="hidden" name="subjects" value={s.name} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* --- COMMON TEXT FIELD --- */}
        <div className="sm:col-span-2 border-t border-border pt-6">
          <label htmlFor="effect" className={fieldLabel}>
            Kartentext / Effekt
          </label>
          <textarea
            id="effect"
            name="effect"
            rows={4}
            defaultValue={defaultValues?.effect ?? ""}
            placeholder="Kartenbeschreibung oder Effekt..."
            className={fieldInput}
          />
          <p className="font-body text-muted-foreground mt-1.5 text-xs">
            Formatierung: <code className="text-foreground">**Fett**</code>,{" "}
            <code className="text-foreground">&lt;center&gt;Zentriert&lt;/center&gt;</code>,
            Enter für Zeilenumbrüche.
          </p>
        </div>

        {/* STATUS */}
        <div className="sm:col-span-2 flex items-center justify-between border-t border-border pt-6">
          <div>
            <label htmlFor="published" className="font-display text-foreground block font-medium">
              Veröffentlichen
            </label>
            <p className="font-body text-muted-foreground text-sm">
              Ist diese Karte auf der Website sichtbar?
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input 
              type="checkbox" 
              name="published" 
              id="published" 
              className="peer sr-only" 
              defaultChecked={defaultValues ? defaultValues.published : true}
            />
            <div className="peer h-6 w-11 rounded-full bg-border after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-white after:transition-all after:content-[''] peer-checked:bg-gold peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
          </label>
        </div>
      </div>

      <div className="border-border flex items-center justify-end gap-3 border-t pt-5 mt-2">
        <Link
          href="/admin/cards"
          className="font-body text-muted-foreground hover:text-foreground inline-flex h-11 items-center px-3 text-sm transition-colors"
        >
          Abbrechen
        </Link>
        <SubmitButton label={submitLabel ?? "Speichern"} />
      </div>
    </form>
  );
}
