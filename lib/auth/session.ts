import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession, type SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export const defaultSession: SessionData = {
  isAdmin: false,
};

export const sessionOptions: SessionOptions = {
  cookieName: "cfg-legends-admin",
  password: process.env.AUTH_SECRET ?? "",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isAdmin) {
    session.isAdmin = defaultSession.isAdmin;
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
