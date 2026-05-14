import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];
const protectedRoutes = ["/account", "/orders", "/wishlist", "/checkout"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Use JWT token directly (no DB/fs access needed)
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // Check route categories
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isApiRoute = pathname.startsWith("/api");

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect admin routes — require admin role
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/login?callbackUrl=/admin", req.url)
      );
    }
    if (userRole !== "admin" && userRole !== "manager") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Protect authenticated routes
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|uploads|fonts).*)",
  ],
};
