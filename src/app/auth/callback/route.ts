import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      // Redirect to auth page with error
      return NextResponse.redirect(
        new URL(`/auth?error=${error.message}`, request.url)
      );
    }

    // Get the session to ensure it's properly established
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("Session in callback:", session);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/user", request.url));
}
