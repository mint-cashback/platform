import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/magicui/blur-fade";

import { fetchPosts } from "./data";
import { Post } from "./types";

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map((post: Post, index: number) => (
        <BlurFade delay={0.1 * index} key={post.id}>
          <Link
            href={`/blog/${post.slug}`}
            className="space-y-3 cursor-pointer"
          >
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                width={512}
                height={512}
                className="object-contain w-full border rounded-xl aspect-square"
              />
            ) : post.emoji ? (
              <div className="flex items-center justify-center w-full h-64 text-8xl border rounded-xl aspect-square bg-muted">
                {post.emoji}
              </div>
            ) : (
              <Image
                src="/images/placeholder.svg"
                alt={post.title}
                width={512}
                height={512}
                className="object-contain w-full border rounded-xl aspect-square"
              />
            )}

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="font-semibold text-md text-muted-foreground">
                {post.created_at &&
                  new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
