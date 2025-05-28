"use client";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Brands, BrandsSkeleton } from "./brands";

export function TopBrands() {
  const [brands, setBrands] = useState<Tables<"brands">[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("priority", { ascending: true })
        .limit(10);

      if (error) {
        throw error;
      }

      setBrands(data);
    };

    getBrands();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      {brands.length > 0 ? <Brands brands={brands} /> : <BrandsSkeleton />}
    </div>
  );
}
