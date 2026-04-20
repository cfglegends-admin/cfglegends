"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCard } from "@/lib/actions/cards";

interface CardDeleteButtonProps {
  id: number;
  name: string;
}

export function CardDeleteButton({ id, name }: CardDeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    // Explicitly using window.confirm as requested by prompt
    if (!window.confirm(`"${name}" wirklich löschen?`)) return;
    
    setLoading(true);
    try {
      await deleteCard(id);
    } catch {
      alert("Fehler beim Löschen der Karte.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={`„${name}" löschen`}
      className="text-muted-foreground hover:bg-muted focus-visible:bg-muted disabled:opacity-50 hover:text-red-400 focus-visible:text-red-400 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
