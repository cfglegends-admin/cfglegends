"use server";

import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { getSession } from "./session";

export interface LoginResult {
  error?: string;
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function login(_prev: LoginResult, formData: FormData): Promise<LoginResult> {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (typeof password !== "string" || !expected) {
    return { error: "Falsches Passwort" };
  }

  if (!safeCompare(password, expected)) {
    return { error: "Falsches Passwort" };
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  redirect("/admin");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
