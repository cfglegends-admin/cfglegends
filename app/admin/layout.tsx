import Link from "next/link";
import type { ReactNode } from "react";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { SessionTabGuard } from "@/components/admin/SessionTabGuard";
import { getSession } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <div className="bg-background relative z-[60] min-h-screen">
      {session.isAdmin ? (
        <>
          <SessionTabGuard />
          <nav className="bg-muted/90 border-border sticky top-0 z-10 border-b backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-display text-gold text-sm tracking-wide">Admin</span>
                  {session.adminEmail ? (
                    <span className="font-body text-muted-foreground text-xs sm:text-sm">
                      {session.adminEmail}
                      {session.isMasterAdmin ? " (Master)" : ""}
                    </span>
                  ) : null}
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

              <div className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1">
                <AdminNavLink href="/admin" exact>
                  Dashboard
                </AdminNavLink>
                <AdminNavLink href="/admin/cards">Karten</AdminNavLink>
                <AdminNavLink href="/admin/limits">Limitierungen</AdminNavLink>
                <AdminNavLink href="/admin/news">News</AdminNavLink>
                <AdminNavLink href="/admin/downloads">Downloads</AdminNavLink>
                {session.isMasterAdmin ? (
                  <>
                    <AdminNavLink href="/admin/accounts">Admin-Konten</AdminNavLink>
                    <AdminNavLink href="/admin/audit">Änderungslog</AdminNavLink>
                  </>
                ) : null}
              </div>
            </div>
          </nav>
          <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
        </>
      ) : (
        children
      )}
    </div>
  );
}
