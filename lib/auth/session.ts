import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession, type SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
  adminId?: number;
  adminEmail?: string;
  isMasterAdmin?: boolean;
}

export const defaultSession: SessionData = {
  isAdmin: false,
  adminId: undefined,
  adminEmail: undefined,
  isMasterAdmin: false,
};

export const sessionOptions: SessionOptions = {
  cookieName: "cfg-legends-admin",
  password: process.env.AUTH_SECRET ?? "",
  cookieOptions: {
    secure: true,
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isAdmin) {
    session.isAdmin = false;
    session.adminId = undefined;
    session.adminEmail = undefined;
    session.isMasterAdmin = false;
  }
  return session;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireMasterAdmin() {
  const session = await requireAdmin();
  if (!session.isMasterAdmin) {
    redirect("/admin");
  }
  return session;
}
