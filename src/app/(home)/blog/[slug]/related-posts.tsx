import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/magicui/blur-fade";

import { fetchPost, fetchRelatedPosts } from "../data";
import { Post } from "../types";

export async function RelatedPosts({ slug }: { slug: string }) {
  const post = await fetchPost(slug);

  if (!post) {
    return null;
  }

  const relatedPosts = await fetchRelatedPosts(post.id);

  if (!relatedPosts.length) {
    return (
      <div className="mt-4 text-muted-foreground">
        No related posts available.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-6">
      {relatedPosts.map((post: Post, index: number) => (
        <BlurFade key={post.id} delay={0.1 * index}>
          <Link href={`/blog/${post.slug}`} className="flex flex-col space-y-2">
            {post.image_url ? (
              <div className="relative w-full h-32 overflow-hidden rounded-md">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : post.emoji ? (
              <div className="flex items-center justify-center w-full h-32 text-5xl overflow-hidden rounded-md bg-muted">
                {post.emoji}
              </div>
            ) : (
              <div className="relative w-full h-32 overflow-hidden rounded-md">
                <Image
                  src="/images/placeholder.svg"
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {post.created_at &&
                new Date(post.created_at).toLocaleDateString()}
            </p>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
