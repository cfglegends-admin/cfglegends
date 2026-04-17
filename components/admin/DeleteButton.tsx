"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  itemLabel: string;
  deleteAction: () => Promise<void>;
}

export function DeleteButton({ itemLabel, deleteAction }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !pending) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, pending]);

  async function handleDelete() {
    setPending(true);
    try {
      await deleteAction();
      setOpen(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`„${itemLabel}" löschen`}
        className="text-muted-foreground hover:text-red-400 focus-visible:text-red-400 inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => !pending && setOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-background border-border relative z-10 w-full max-w-md rounded-xl border p-6 shadow-2xl">
            <h2
              id="delete-dialog-title"
              className="font-display text-foreground text-lg font-semibold tracking-wide"
            >
              Eintrag löschen?
            </h2>
            <p className="font-body text-muted-foreground mt-2 text-sm leading-relaxed">
              &bdquo;{itemLabel}&ldquo; wird endgültig gelöscht. Diese Aktion kann
              nicht rückgängig gemacht werden.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                ref={cancelRef}
                type="button"
                onClick={() => setOpen(false)}
                disabled={pending}
                className={cn(
                  "font-body border-border text-foreground hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  "disabled:opacity-50"
                )}
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className={cn(
                  "font-body rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400",
                  "disabled:opacity-50"
                )}
              >
                {pending ? "Wird gelöscht …" : "Löschen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
