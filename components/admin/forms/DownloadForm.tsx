import Link from "next/link";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Switch } from "@/components/ui/switch";
import { DOWNLOAD_FILE_TYPES, FILE_TYPE_LABELS } from "@/lib/downloads";
import type { Download } from "@/lib/db/schema";

interface DownloadFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Pick<Download, "name" | "description" | "fileUrl" | "fileType" | "published">;
  submitLabel?: string;
  cancelHref?: string;
  children?: React.ReactNode;
}

const fieldLabel = "font-body text-muted-foreground mb-1.5 block text-sm font-medium";
const fieldInput =
  "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function DownloadForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref = "/admin/downloads",
  children,
}: DownloadFormProps) {
  return (
    <form
      action={action}
      className="bg-muted border-border flex max-w-2xl flex-col gap-5 rounded-xl border p-6"
    >
      <div>
        <label htmlFor="name" className={fieldLabel}>
          Name
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
        <label htmlFor="description" className={fieldLabel}>
          Beschreibung (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          className={fieldInput}
        />
      </div>

      <div>
        <label htmlFor="fileUrl" className={fieldLabel}>
          Datei-URL
        </label>
        <input
          id="fileUrl"
          name="fileUrl"
          type="text"
          required
          defaultValue={defaultValues?.fileUrl ?? ""}
          placeholder="/docs/regelwerk.pdf"
          className={`${fieldInput} font-mono`}
        />
        <p className="text-muted-foreground mt-1.5 text-xs">
          Datei-Upload kommt in Phase 2.4. Aktuell den Pfad manuell eingeben (z.B.
          /docs/dateiname.pdf).
        </p>
      </div>

      <div>
        <label htmlFor="fileType" className={fieldLabel}>
          Dateityp
        </label>
        <select
          id="fileType"
          name="fileType"
          required
          defaultValue={defaultValues?.fileType ?? "pdf"}
          className={fieldInput}
        >
          {DOWNLOAD_FILE_TYPES.map((type) => (
            <option key={type} value={type}>
              {FILE_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="published" className="font-body text-foreground text-sm font-medium">
          Veröffentlichen
          <span className="text-muted-foreground mt-1 block text-xs font-normal">
            Sichtbar im Download-Bereich der Startseite
          </span>
        </label>
        <Switch
          id="published"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="data-[state=checked]:bg-gold"
        />
      </div>

      <div className="border-border flex items-center justify-between gap-3 border-t pt-5">
        <div>{children}</div>
        <div className="flex items-center gap-3">
          <Link
            href={cancelHref}
            className="font-body text-muted-foreground hover:text-foreground inline-flex h-11 items-center px-3 text-sm"
          >
            Abbrechen
          </Link>
          <SubmitButton label={submitLabel ?? "Speichern"} />
        </div>
      </div>
    </form>
  );
}
