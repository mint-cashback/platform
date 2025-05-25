import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Log full URL including query parameters
  console.log("Middleware running for full URL:", request.url);
  console.log("Path:", request.nextUrl.pathname);
  console.log("Query params:", Object.fromEntries(request.nextUrl.searchParams));

  // Handle the root path with code parameter - likely a misrouted callback
  if (request.nextUrl.pathname === "/" && request.nextUrl.searchParams.has("code")) {
    console.log("Detected code parameter in root URL, redirecting to /callback");
    return NextResponse.redirect(new URL(`/callback?code=${request.nextUrl.searchParams.get("code")}`, request.url));
  }

  // Don't run middleware for the callback routes
  if (request.nextUrl.pathname === "/auth/callback" || request.nextUrl.pathname === "/callback") {
    console.log("Bypassing middleware for callback route:", request.nextUrl.pathname);
    return response;
  }

  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(
    "Session in middleware:",
    session
      ? {
          userId: session.user.id,
          email: session.user.email,
          expires_at: session.expires_at,
        }
      : null
  );

  if (request.nextUrl.pathname.startsWith("/user")) {
    if (!session) {
      console.log("User not logged in, redirecting to /auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    console.log("User authenticated, allowing access to protected route");
    return response;
  }

  if (request.nextUrl.pathname === "/") {
    if (session) {
      console.log("User logged in, redirecting to /user");
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
