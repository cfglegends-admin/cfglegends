"use client";

import { Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface RowDeleteButtonProps {
  action: () => Promise<void>;
  itemLabel: string;
}

export function RowDeleteButton({ action, itemLabel }: RowDeleteButtonProps) {
  return (
    <DeleteConfirmDialog
      onConfirm={action}
      description={`„${itemLabel}" wird endgültig gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.`}
      trigger={
        <button
          type="button"
          aria-label={`„${itemLabel}" löschen`}
          className="text-muted-foreground hover:text-red-400 focus-visible:text-red-400 inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      }
    />
  );
}
