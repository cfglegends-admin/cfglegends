"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { bulkImportCards, type BulkImportResult } from "@/lib/actions/cards";

export default function BulkImportPage() {
  const [csvData, setCsvData] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<BulkImportResult | null>(null);

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    if (!csvData.trim()) return;

    setImporting(true);
    setResult(null);

    try {
      const res = await bulkImportCards(csvData);
      setResult(res);
      if (res.successCount > 0 && res.errors.length === 0) {
        setCsvData(""); // Clear on total success
      }
    } catch {
      alert("Es ist ein kritischer Fehler beim Import aufgetreten.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <header className="border-border mb-8 border-b pb-4">
        <h1 className="font-display text-foreground text-2xl font-semibold tracking-wide">
          Bulk-Import: Karten
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-sm">
          Füge Karten-Daten im CSV-Format ein. Eine Karte pro Zeile.
        </p>
      </header>

      <div className="bg-muted border-border mb-8 overflow-hidden rounded-xl border">
        <div className="border-border bg-background/50 border-b px-4 py-3">
          <h3 className="font-display text-foreground text-sm font-semibold tracking-wide">
            Formatierungs-Beispiel (Semikolon-getrennt)
          </h3>
        </div>
        <div className="p-4">
          <pre className="font-mono text-muted-foreground whitespace-pre overflow-x-auto text-xs">
            Kartennummer;Name;Typ;Seltenheit;Ansage;Chill;Fächer;Effekt;Bild-Pfad{"\n"}
            103;Mensa-Team;ereignis;normal;;;;&quot;Du bekommst Unterstützung...&quot;;https://cdn.cfglegends.de/cards/v1/103.webp{"\n"}
            120;Feueralarm;falle;normal;;;;&quot;Wenn dein Gegner...&quot;;https://cdn.cfglegends.de/cards/v1/120.webp{"\n"}
            128;Fächerkarte;lehrer;normal;5;3;Physik,Mathe;&quot;Effekttext hier&quot;;https://cdn.cfglegends.de/cards/v1/128.webp
          </pre>
        </div>
      </div>

      <form onSubmit={handleImport} className="space-y-6">
        <div>
          <label htmlFor="csv" className="sr-only">
            CSV Daten
          </label>
          <textarea
            id="csv"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            required
            rows={15}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:border-gold focus-visible:ring-gold font-mono w-full rounded-xl border p-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
            placeholder="Kopiere deine CSV-Daten hier hinein..."
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={importing || !csvData.trim()}
            className="bg-gold text-background hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60 font-display inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            {importing ? "Importiere..." : "Karten importieren"}
          </button>
          <Link
            href="/admin/cards"
            className="font-body text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Abbrechen
          </Link>
        </div>
      </form>

      {result && (
        <div className="mt-12 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-foreground text-xl font-semibold">Ergebnis</h2>
            {result.errors.length === 0 ? (
              <span className="bg-emerald-500/15 text-emerald-500 border-emerald-500/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Erfolgreich
              </span>
            ) : result.successCount > 0 ? (
              <span className="bg-amber-500/15 text-amber-500 border-amber-500/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                Teilweise erfolgreich
              </span>
            ) : (
              <span className="bg-red-500/15 text-red-500 border-red-500/30 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                Fehlgeschlagen
              </span>
            )}
          </div>

          <div className="bg-muted border-border rounded-xl border p-6">
            <p className="font-body text-foreground">
              <strong>{result.successCount}</strong> Karten wurden erfolgreich importiert.
            </p>

            {result.errors.length > 0 && (
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="font-body text-red-400 font-medium mb-4">
                  {result.errors.length} Fehler aufgetreten:
                </h3>
                <ul className="space-y-3">
                  {result.errors.map((error, idx) => (
                    <li key={idx} className="bg-background border-border rounded-lg border p-3">
                      <div className="font-body text-foreground text-sm font-medium mb-1">
                        Fehler in Zeile {error.lineNumber}: <span className="text-red-400">{error.error}</span>
                      </div>
                      <div className="font-mono text-muted-foreground truncate text-xs">
                        {error.row}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
