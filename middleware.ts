import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    // check if user is authenticated and role is admin
    if (isAdminPage && token && token.role === "ADMIN") {
      return null;
    }
    //check if user is authenticated and it not admin
    if (isAdminPage && token) {
      return NextResponse.redirect(new URL("/sheet", req.url));
    }
    //reset of cases of admin take care of themselves because it's not authenticated

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
          new URL(`/login?callback=${encodeURIComponent(callback)}`, req.url)
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
    "/login/:path*",
    "/",
    "/feedback",
    "/notes/:path*",
    "/feedback",
    "/admin",
  ],
};
