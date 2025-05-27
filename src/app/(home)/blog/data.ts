import { unstable_cache } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/server";
import { getEmojiFromText } from "@/lib/utils/emoji";

import { Post } from "./types";

export const fetchPost = async (slug: string): Promise<Post | null> => {
  const { data: post, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  // Generate emoji from the title if image is missing
  if (!post.image_url && post.title) {
    post.emoji = getEmojiFromText(post.title);
  }

  return post as Post;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const { data: posts, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  // Add emoji to posts without images
  return posts.map((post) => {
    if (!post.image_url && post.title) {
      return {
        ...post,
        emoji: getEmojiFromText(post.title),
      };
    }
    return post;
  });
};

export const fetchRelatedPosts = async (postId: number): Promise<Post[]> => {
  // Simply fetch the latest 5 posts excluding the current post
  const { data: latestPosts, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .neq("id", postId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }

  // Add emoji to posts without images
  return latestPosts.map((post) => {
    if (!post.image_url && post.title) {
      return {
        ...post,
        emoji: getEmojiFromText(post.title),
      };
    }
    return post;
  });
};
