import Link from "next/link";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { LimitedCard } from "@/lib/db/schema";

interface LimitFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Pick<LimitedCard, "name" | "maxCopies" | "reason">;
  submitLabel?: string;
}

const fieldLabel = "font-body text-muted-foreground mb-1.5 block text-sm font-medium";
const fieldInput =
  "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function LimitForm({ action, defaultValues, submitLabel }: LimitFormProps) {
  return (
    <form
      action={action}
      className="bg-muted border-border flex max-w-xl flex-col gap-5 rounded-xl border p-6"
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
        <label htmlFor="maxCopies" className={fieldLabel}>
          Max. Kopien
        </label>
        <input
          id="maxCopies"
          name="maxCopies"
          type="number"
          min={1}
          required
          defaultValue={defaultValues?.maxCopies ?? 1}
          className={`${fieldInput} font-mono tabular-nums`}
        />
      </div>

      <div>
        <label htmlFor="reason" className={fieldLabel}>
          Grund (optional)
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          defaultValue={defaultValues?.reason ?? ""}
          placeholder="Warum ist diese Karte limitiert?"
          className={fieldInput}
        />
      </div>

      <div className="border-border flex items-center justify-end gap-3 border-t pt-5">
        <Link
          href="/admin/limits"
          className="font-body text-muted-foreground hover:text-foreground inline-flex h-11 items-center px-3 text-sm"
        >
          Abbrechen
        </Link>
        <SubmitButton label={submitLabel ?? "Speichern"} />
      </div>
    </form>
  );
}
