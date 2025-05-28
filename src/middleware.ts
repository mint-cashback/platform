import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Log full URL including query parameters
  console.log("Middleware running for full URL:", request.url);
  console.log("Path:", request.nextUrl.pathname);
  console.log(
    "Query params:",
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (request.nextUrl.pathname === "/auth/callback") {
    console.log(
      "Bypassing middleware for callback route:",
      request.nextUrl.pathname
    );
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
