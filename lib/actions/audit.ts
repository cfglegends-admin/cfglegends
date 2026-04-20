"use server";

import { db } from "@/lib/db";
import { adminAuditLogs } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";

interface AuditParams {
  entityType: "cards" | "limits" | "news" | "downloads" | "admins";
  entityId?: string | number;
  action: "create" | "update" | "delete" | "login" | "logout";
  summary: string;
}

export async function writeAuditLog(params: AuditParams): Promise<void> {
  const session = await getSession();
  if (!session.isAdmin || !session.adminId) return;

  await db.insert(adminAuditLogs).values({
    adminUserId: session.adminId,
    entityType: params.entityType,
    entityId: params.entityId ? String(params.entityId) : null,
    action: params.action,
    summary: params.summary,
  });
}
