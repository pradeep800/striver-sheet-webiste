import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/register-or-login");
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/sheet", req.url));
      }

      return null;
    }

    if (isAuth) {
      if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/sheet", req.url));
      }
    }

    if (!isAuth) {
      let callback = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        callback += req.nextUrl.search;
      }
      if (callback !== "/") {
        return NextResponse.redirect(
          new URL(
            `/register-or-login?callback=${encodeURIComponent(callback)}`,
            req.url
          )
        );
      }
    }
    return null;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);
export const config = {
  matcher: [
    "/sheet/:path*",
    "/register-or-login/:path*",
    "/",
    "/feedback",
    "/notes/:path*",
  ],
};
