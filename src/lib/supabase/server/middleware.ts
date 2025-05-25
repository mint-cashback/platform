import { NextResponse, type NextRequest } from "next/server";

import {
  createMiddlewareClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";

async function isUserAuthenticated(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return !!session;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createMiddlewareClient({ req: request, res: response });

  const previousPage = request.headers.get("referer") || "/";

  if (request.nextUrl.pathname === "/") {
    if (await isUserAuthenticated(supabase)) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/user")) {
    if (!(await isUserAuthenticated(supabase))) {
      const redirectUrl = new URL("/auth", request.url);
      redirectUrl.searchParams.set("from", previousPage);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}
