import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("Root callback handler received URL:", request.url);
  console.log("Code parameter:", code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
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
      console.log("Session established in root callback:", session ? "Session exists" : "No session");
    } catch (err) {
      console.error("Exception in callback route:", err);
      return NextResponse.redirect(new URL("/auth?error=callback_error", request.url));
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/user", request.url));
} 