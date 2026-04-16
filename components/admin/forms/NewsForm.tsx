import Link from "next/link";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Switch } from "@/components/ui/switch";
import type { News } from "@/lib/db/schema";

interface NewsFormProps {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Pick<News, "title" | "content" | "published">;
  submitLabel?: string;
  cancelHref?: string;
  children?: React.ReactNode;
}

const fieldLabel = "font-body text-muted-foreground mb-1.5 block text-sm font-medium";
const fieldInput =
  "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";

export function NewsForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref = "/admin/news",
  children,
}: NewsFormProps) {
  return (
    <form
      action={action}
      className="bg-muted border-border flex max-w-2xl flex-col gap-5 rounded-xl border p-6"
    >
      <div>
        <label htmlFor="title" className={fieldLabel}>
          Titel
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          autoFocus
          defaultValue={defaultValues?.title ?? ""}
          className={fieldInput}
        />
      </div>

      <div>
        <label htmlFor="content" className={fieldLabel}>
          Inhalt
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          required
          defaultValue={defaultValues?.content ?? ""}
          placeholder="Was gibt es Neues?"
          className={fieldInput}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <label htmlFor="published" className="font-body text-foreground text-sm font-medium">
          Veröffentlichen
          <span className="text-muted-foreground mt-1 block text-xs font-normal">
            Sichtbar auf der Startseite
          </span>
        </label>
        <Switch
          id="published"
          name="published"
          defaultChecked={defaultValues?.published ?? false}
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
