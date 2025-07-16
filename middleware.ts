import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // if (
        //   pathname.startsWith("/api/auth") ||
        //   pathname === "/login" ||
        //   pathname === "/register"
        // ) {
        //   return true;
        // }

        // if (pathname === "/" || pathname.startsWith("/api/videos")) {
        //   return true;
        // }

        // return !!token;

                // These paths are public
        if (
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/" ||
          pathname.startsWith("/api/videos")
        ) {
          return true;
        }

        // Require token for all other paths
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    // "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
