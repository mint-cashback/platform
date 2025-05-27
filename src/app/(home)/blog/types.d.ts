import { Tables } from "@/types/supabase";

export interface Post extends Tables<"blog_posts"> {
  emoji?: string;
}
