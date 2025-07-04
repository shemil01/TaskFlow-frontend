import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/admin"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET });
  console.log("token::",token)
  const { pathname } = req.nextUrl;

  // Only protect specific routes
  const isProtected = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next;
}
export const config = {
  matcher: ["/((?!api|_next|login|signup|auth|favicon.ico).*)"],
};
