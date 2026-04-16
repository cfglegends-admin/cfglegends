"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/auth/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => logout())}
      className="font-body text-muted-foreground hover:text-red-400 disabled:opacity-50 inline-flex items-center gap-1.5 text-sm transition-colors"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      <span>{pending ? "…" : "Abmelden"}</span>
    </button>
  );
}
