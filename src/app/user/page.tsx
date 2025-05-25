"use client"

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function UserPage() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, [supabase]);
  return (
    <div>
      <h1>User Page</h1>
      {user && (
        <div>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  )
}
