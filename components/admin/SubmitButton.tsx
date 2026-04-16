"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
  className?: string;
}

export function SubmitButton({
  label = "Speichern",
  pendingLabel = "Wird gespeichert …",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "bg-gold text-background hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60 font-display inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright",
        className
      )}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingLabel : label}
    </button>
  );
}
