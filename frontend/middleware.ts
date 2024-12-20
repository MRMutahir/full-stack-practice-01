import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname; 


  if (!token && path.startsWith("/dashboard")) {
    // console.log("Redirecting to /login: No token found");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && path === "/login") {
    // console.log("Redirecting to /dashboard: Token found");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
