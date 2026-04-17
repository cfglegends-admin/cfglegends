"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  itemLabel: string;
  deleteAction: () => Promise<void>;
}

export function DeleteButton({ itemLabel, deleteAction }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={(value) => !pending && setOpen(value)}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label={`„${itemLabel}" löschen`}
          className="text-muted-foreground hover:text-red-400 focus-visible:text-red-400 inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eintrag löschen?</AlertDialogTitle>
          <AlertDialogDescription>
            &bdquo;{itemLabel}&ldquo; wird endgültig gelöscht. Diese Aktion kann nicht
            rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Abbrechen</AlertDialogCancel>
          <form
            action={async () => {
              setPending(true);
              try {
                await deleteAction();
                setOpen(false);
              } catch {
                setPending(false);
              }
            }}
          >
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "Wird gelöscht …" : "Löschen"}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
