import { desc, eq } from "drizzle-orm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { db } from "@/lib/db";
import { adminAuditLogs, adminUsers } from "@/lib/db/schema";
import { requireMasterAdmin } from "@/lib/auth/session";

export default async function AdminAuditPage() {
  await requireMasterAdmin();

  const entries = await db
    .select({
      id: adminAuditLogs.id,
      entityType: adminAuditLogs.entityType,
      action: adminAuditLogs.action,
      summary: adminAuditLogs.summary,
      createdAt: adminAuditLogs.createdAt,
      adminEmail: adminUsers.email,
    })
    .from(adminAuditLogs)
    .innerJoin(adminUsers, eq(adminAuditLogs.adminUserId, adminUsers.id))
    .orderBy(desc(adminAuditLogs.createdAt))
    .limit(300);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Änderungslog"
        description="Nur Master-Admins können nachvollziehen, welcher Account welche Änderungen vorgenommen hat."
      />

      <section className="bg-muted border-border overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-border border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Zeit</th>
              <th className="px-4 py-3 font-medium">Admin</th>
              <th className="px-4 py-3 font-medium">Bereich</th>
              <th className="px-4 py-3 font-medium">Aktion</th>
              <th className="px-4 py-3 font-medium">Beschreibung</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-3">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleString("de-DE") : "—"}
                </td>
                <td className="px-4 py-3">{entry.adminEmail}</td>
                <td className="px-4 py-3 uppercase">{entry.entityType}</td>
                <td className="px-4 py-3 uppercase">{entry.action}</td>
                <td className="px-4 py-3">{entry.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
