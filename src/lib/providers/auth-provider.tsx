"use client";

import { createContext, useEffect, useState } from "react";

import { User as AuthUser } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

export const AuthContext = createContext<
  | {
    authUser: AuthUser | null;
    user: Tables<"users"> | null;
  } | null
>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUser = async () => {
    if (!authUser?.id) {
      setUser(null);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch user", error);
      return;
    }

    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}

