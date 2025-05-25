"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { supabase } from "@/lib/supabase/client";

export default function UserPage() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>User Page</h1>
      {user && (
        <div>
          <p>{user.email}</p>
        </div>
      )}

      <Button onClick={() => supabase.auth.signOut()}>Log Out</Button>
    </div>
  )
}
