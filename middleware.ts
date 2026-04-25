import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";
import { type SessionData, sessionOptions } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  if (!session.isAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Protects all /admin routes except /admin/login
  matcher: ["/admin/((?!login).*)"],
};
