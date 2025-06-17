import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  if (!accessToken && !refreshToken && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher:
    "/((?!api|_next/static|public/|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg).*)",
};
