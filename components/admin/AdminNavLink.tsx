"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminNavLinkProps {
  href: string;
  children: ReactNode;
  exact?: boolean;
}

export function AdminNavLink({ href, children, exact = false }: AdminNavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "font-body inline-flex h-9 shrink-0 items-center rounded-md px-3 text-sm font-medium transition-colors",
        active
          ? "bg-gold/15 text-gold border-gold/40 border"
          : "text-muted-foreground hover:text-gold hover:bg-background/60"
      )}
    >
      {children}
    </Link>
  );
}
