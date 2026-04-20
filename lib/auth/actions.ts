"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getSession } from "./session";
import { hashPassword, verifyPassword } from "./password";
import { createAdminUser, getAdminByEmail, getAdminCount } from "./admin-users";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { writeAuditLog } from "@/lib/actions/audit";

export interface LoginResult {
  error?: string;
}

export async function login(_prev: LoginResult, formData: FormData): Promise<LoginResult> {
  const emailRaw = formData.get("email");
  const password = formData.get("password");

  if (typeof emailRaw !== "string" || typeof password !== "string") {
    return { error: "Ungültige Zugangsdaten" };
  }

  const email = emailRaw.trim().toLowerCase();
  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben" };
  }

  let admin = await getAdminByEmail(email);

  if (!admin) {
    const adminCount = await getAdminCount();
    const legacyEmail = (process.env.ADMIN_EMAIL ?? "admin@cfg-legends.local").trim().toLowerCase();
    const legacyPassword = process.env.ADMIN_PASSWORD;
    const canBootstrap =
      adminCount === 0 && email === legacyEmail && !!legacyPassword && password === legacyPassword;

    if (!canBootstrap) {
      return { error: "Ungültige E-Mail oder Passwort" };
    }

    admin = await createAdminUser({
      email,
      password,
      isMaster: true,
    });
  } else if (!verifyPassword(password, admin.passwordHash)) {
    return { error: "Ungültige E-Mail oder Passwort" };
  }

  const session = await getSession();
  session.isAdmin = true;
  session.adminId = admin.id;
  session.adminEmail = admin.email;
  session.isMasterAdmin = admin.isMaster;
  await session.save();

  await writeAuditLog({
    entityType: "admins",
    entityId: admin.id,
    action: "login",
    summary: `Admin-Login von ${admin.email}`,
  });

  redirect("/admin");
}

export async function logout() {
  const session = await getSession();
  await writeAuditLog({
    entityType: "admins",
    entityId: session.adminId,
    action: "logout",
    summary: `Admin-Logout von ${session.adminEmail ?? "unbekannt"}`,
  });
  session.destroy();
  redirect("/");
}

export async function createAdminAccount(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.isAdmin || !session.isMasterAdmin) {
    redirect("/admin");
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const isMaster = String(formData.get("isMaster") ?? "") === "on";

  if (!email.includes("@")) {
    throw new Error("Bitte eine valide E-Mail-Adresse angeben.");
  }
  if (password.length < 8) {
    throw new Error("Passwort muss mindestens 8 Zeichen haben.");
  }

  const existing = await getAdminByEmail(email);
  if (existing) {
    throw new Error("Diese E-Mail ist bereits als Admin registriert.");
  }

  const created = await createAdminUser({ email, password, isMaster });
  await writeAuditLog({
    entityType: "admins",
    entityId: created.id,
    action: "create",
    summary: `Admin-Konto erstellt: ${created.email}${isMaster ? " (Master)" : ""}`,
  });
}

export async function deleteAdminAccount(adminId: number): Promise<void> {
  const session = await getSession();
  if (!session.isAdmin || !session.isMasterAdmin || !session.adminId) {
    redirect("/admin");
  }
  if (adminId === session.adminId) {
    throw new Error("Das eigene Konto kann nicht gelöscht werden.");
  }

  const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, adminId));
  if (!target) return;

  await db.delete(adminUsers).where(eq(adminUsers.id, adminId));
  await writeAuditLog({
    entityType: "admins",
    entityId: adminId,
    action: "delete",
    summary: `Admin-Konto gelöscht: ${target.email}`,
  });
}

export async function updateAdminAccount(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.isAdmin || !session.isMasterAdmin || !session.adminId) {
    redirect("/admin");
  }

  const adminId = Number(formData.get("adminId"));
  const nextEmail = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const nextPassword = String(formData.get("password") ?? "").trim();
  const nextIsMaster = String(formData.get("isMaster") ?? "") === "on";

  if (!Number.isInteger(adminId) || adminId < 1) {
    throw new Error("Ungültige Admin-ID.");
  }
  if (!nextEmail.includes("@")) {
    throw new Error("Bitte eine valide E-Mail-Adresse angeben.");
  }
  if (nextPassword && nextPassword.length < 8) {
    throw new Error("Neues Passwort muss mindestens 8 Zeichen haben.");
  }

  const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, adminId));
  if (!target) {
    throw new Error("Admin-Konto nicht gefunden.");
  }

  const emailOwner = await getAdminByEmail(nextEmail);
  if (emailOwner && emailOwner.id !== adminId) {
    throw new Error("Diese E-Mail ist bereits vergeben.");
  }

  const allAdmins = await db.select().from(adminUsers);
  const masterCount = allAdmins.filter((admin) => admin.isMaster).length;
  if (target.isMaster && !nextIsMaster && masterCount <= 1) {
    throw new Error("Der letzte Master-Admin kann nicht zu einem normalen Admin geändert werden.");
  }
  if (target.id === session.adminId && !nextIsMaster && masterCount <= 1) {
    throw new Error("Du kannst dich nicht selbst als letzten Master-Admin entfernen.");
  }

  await db
    .update(adminUsers)
    .set({
      email: nextEmail,
      isMaster: nextIsMaster,
      passwordHash: nextPassword ? hashPassword(nextPassword) : target.passwordHash,
      updatedAt: new Date(),
    })
    .where(eq(adminUsers.id, adminId));

  await writeAuditLog({
    entityType: "admins",
    entityId: adminId,
    action: "update",
    summary: `Admin-Konto aktualisiert: ${target.email} -> ${nextEmail}${nextIsMaster ? " (Master)" : ""}${nextPassword ? ", Passwort geändert" : ""}`,
  });
}
