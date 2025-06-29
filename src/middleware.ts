import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher:
    "/((?!api|_next/static|auth/callback|public/|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg).*)",
};
