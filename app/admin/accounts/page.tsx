import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createAdminAccount, deleteAdminAccount, updateAdminAccount } from "@/lib/auth/actions";
import { requireMasterAdmin } from "@/lib/auth/session";

export default async function AdminAccountsPage() {
  const session = await requireMasterAdmin();
  const admins = await db.select().from(adminUsers).orderBy(desc(adminUsers.createdAt));

  async function createAction(formData: FormData) {
    "use server";
    await createAdminAccount(formData);
    redirect("/admin/accounts");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    const adminId = Number(formData.get("adminId"));
    if (Number.isInteger(adminId) && adminId > 0) {
      await deleteAdminAccount(adminId);
    }
    redirect("/admin/accounts");
  }

  async function updateAction(formData: FormData) {
    "use server";
    await updateAdminAccount(formData);
    redirect("/admin/accounts");
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Admin-Konten"
        description="Nur Master-Admins sehen und verwalten alle Admin-Accounts."
      />

      <section className="bg-muted border-border rounded-xl border p-6">
        <h2 className="font-display text-foreground mb-4 text-xl font-semibold">Neuen Admin anlegen</h2>
        <form action={createAction} className="grid gap-4 md:grid-cols-3">
          <input
            name="email"
            type="email"
            required
            placeholder="admin@schule.de"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Passwort (min. 8 Zeichen)"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
          <label className="font-body text-muted-foreground flex items-center gap-2 text-sm">
            <input type="checkbox" name="isMaster" className="accent-gold h-4 w-4" />
            Als Master-Admin anlegen
          </label>
          <button
            type="submit"
            className="bg-gold text-background hover:bg-gold-bright font-display inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold tracking-wide md:col-span-3 md:justify-self-start"
          >
            Admin erstellen
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {admins.map((admin) => {
          const isSelf = admin.id === session.adminId;
          return (
            <article key={admin.id} className="bg-muted border-border rounded-xl border p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-body text-foreground text-sm font-medium">{admin.email}</p>
                  <p className="text-muted-foreground text-xs">
                    Rolle: {admin.isMaster ? "Master" : "Admin"} · Erstellt:{" "}
                    {admin.createdAt ? new Date(admin.createdAt).toLocaleString("de-DE") : "—"}
                  </p>
                </div>
                {isSelf ? (
                  <span className="text-muted-foreground text-xs">Aktuelles Konto</span>
                ) : (
                  <form action={deleteAction}>
                    <input type="hidden" name="adminId" value={admin.id} />
                    <button
                      type="submit"
                      className="text-red-400 hover:text-red-300 text-xs font-medium uppercase tracking-wide"
                    >
                      Löschen
                    </button>
                  </form>
                )}
              </div>

              <form action={updateAction} className="grid gap-3 md:grid-cols-4">
                <input type="hidden" name="adminId" value={admin.id} />
                <input
                  name="email"
                  type="email"
                  defaultValue={admin.email}
                  required
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
                />
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  placeholder="Neues Passwort (optional)"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
                />
                <label className="font-body text-muted-foreground flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isMaster"
                    defaultChecked={admin.isMaster}
                    className="accent-gold h-4 w-4"
                  />
                  Master-Admin
                </label>
                <button
                  type="submit"
                  className="bg-background border-border text-foreground hover:border-gold inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors md:justify-self-end"
                >
                  Speichern
                </button>
              </form>
            </article>
          );
        })}
      </section>
    </div>
  );
}
