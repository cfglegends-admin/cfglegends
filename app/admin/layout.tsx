import Link from "next/link";
import type { ReactNode } from "react";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getSession } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <div className="bg-background fixed inset-0 z-[60] flex flex-col overflow-y-auto">
      {session.isAdmin ? (
        <>
          <nav className="bg-muted/80 border-border sticky top-0 z-10 border-b backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-6">
                <AdminNavLink href="/admin" exact>
                  Dashboard
                </AdminNavLink>
                <AdminNavLink href="/admin/limits">Limitierungen</AdminNavLink>
                <AdminNavLink href="/admin/news">News</AdminNavLink>
                <AdminNavLink href="/admin/downloads">Downloads</AdminNavLink>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="font-body text-muted-foreground hover:text-foreground text-sm"
                >
                  ← Zur Website
                </Link>
                <LogoutButton />
              </div>
            </div>
          </nav>
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>
        </>
      ) : (
        children
      )}
    </div>
  );
}
