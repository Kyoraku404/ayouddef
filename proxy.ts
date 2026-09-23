import { getAuthSecret } from "./lib/auth-secret";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";



export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Permanent redirect legacy /admin routes to /adminzaky
  if (pathname === "/admin" || (pathname.startsWith("/admin/") && !pathname.startsWith("/adminocn") && !pathname.startsWith("/adminzaky"))) {
    return NextResponse.redirect(new URL("/adminzaky", request.url));
  }

  // 2. Protect dedicated OCN administration routes (/adminocn/*)
  if (pathname.startsWith("/adminocn") && pathname !== "/adminocn/login") {
    const ocnCookie = request.cookies.get("ocn_session")?.value;

    if (!ocnCookie) {
      const loginUrl = new URL("/adminocn/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(ocnCookie, getAuthSecret("ocn"));
      if (payload.role !== "OCN_ADMIN") {
        throw new Error("Forbidden");
      }

      // If administrator must change temporary password, force change
      if (payload.mustChangePassword && pathname !== "/adminocn/settings") {
        const changeUrl = new URL("/adminocn/login", request.url);
        changeUrl.searchParams.set("step", "change-password");
        return NextResponse.redirect(changeUrl);
      }

      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/adminocn/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("ocn_session");
      return response;
    }
  }

  // 3. Protect client-facing /adminzaky routes
  if (pathname.startsWith("/adminzaky") && pathname !== "/adminzaky/login") {
    const sessionCookie = request.cookies.get("zaky_session")?.value;

    if (!sessionCookie) {
      const loginUrl = new URL("/adminzaky/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, getAuthSecret("zaky"));
      if (payload.role !== "CLIENT_ADMIN") throw new Error("Forbidden");
      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/adminzaky/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("zaky_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/adminzaky/:path*", "/adminocn/:path*"],
};
