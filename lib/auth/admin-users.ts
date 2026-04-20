import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers, type AdminUser } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, normalizedEmail));
  return admin ?? null;
}

export async function getAdminById(id: number): Promise<AdminUser | null> {
  const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
  return admin ?? null;
}

export async function getAdminCount(): Promise<number> {
  const [row] = await db.select({ value: sql<number>`count(*)` }).from(adminUsers);
  return Number(row?.value ?? 0);
}

export async function createAdminUser(params: {
  email: string;
  password: string;
  isMaster?: boolean;
}): Promise<AdminUser> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const passwordHash = hashPassword(params.password);
  const [created] = await db
    .insert(adminUsers)
    .values({
      email: normalizedEmail,
      passwordHash,
      isMaster: params.isMaster ?? false,
    })
    .returning();
  return created;
}
