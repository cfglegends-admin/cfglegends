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
        "font-body text-sm font-medium transition-colors",
        active ? "text-gold" : "text-muted-foreground hover:text-gold"
      )}
    >
      {children}
    </Link>
  );
}
