import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";

export const supabase = createClientComponentClient();

/**
 * This is a server client that is used to access the database. Only expose to
 * the server.
 */
export const supabaseAdmin = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    global: {
      headers: {
        "x-service-role": "true",
      },
    },
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // No-op
      },
    },
  }
);
