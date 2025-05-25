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
    console.log("AuthProvider: Setting up auth state listeners");
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: Initial session check:", session ? "Session found" : "No session");
      setAuthUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AuthProvider: Auth state changed:", event, session ? "Session exists" : "No session");
        setAuthUser(session?.user || null);
      }
    );

    return () => {
      console.log("AuthProvider: Cleaning up auth state listeners");
      subscription.unsubscribe();
    };
  }, []);

  const fetchUser = async () => {
    if (!authUser?.id) {
      console.log("AuthProvider: No auth user, clearing user data");
      setUser(null);
      return;
    }

    console.log("AuthProvider: Fetching user data for auth user:", authUser.id);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (error) {
      console.error("AuthProvider: Failed to fetch user", error);
      return;
    }

    console.log("AuthProvider: User data fetched:", data ? "User found" : "No user found");
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

