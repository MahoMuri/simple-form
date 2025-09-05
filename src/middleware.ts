import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("__session")?.value || "";

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (pathname === "/dashboard" && !session) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/dashboard"],
};
