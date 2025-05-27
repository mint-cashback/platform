import { createServerClient } from "@supabase/ssr";

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