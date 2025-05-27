import Image from "next/image";
import { notFound } from "next/navigation";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import MarkdownContent from "@/components/content/markdown";

import { fetchPost } from "../data";

export async function Post({ slug }: { slug: string }) {
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article
      className="max-w-none"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <TextAnimate
        animation="slideDown"
        className="text-muted-foreground mb-2"
        startOnView={false}
      >
        {new Date(post.created_at).toLocaleDateString()}
      </TextAnimate>

      <TextAnimate
        animation="slideUp"
        by="word"
        className="text-6xl font-bold"
        startOnView={false}
      >
        {post.title}
      </TextAnimate>

      <BlurFade delay={0.5}>
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto mt-4 rounded-xl"
          />
        ) : post.emoji ? (
          <div className="flex items-center justify-center w-full h-64 mt-4 text-8xl rounded-xl bg-muted">
            {post.emoji}
          </div>
        ) : (
          <Image
            src="/images/placeholder.svg"
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto mt-4 rounded-xl"
          />
        )}
      </BlurFade>

      <div className="mt-6" itemProp="articleBody">
        {typeof post.body === 'string' ? (
          <MarkdownContent content={post.body} />
        ) : (
          <p className="text-destructive">Error: Post body is not a string, please contact support.</p>
        )}
      </div>
    </article>
  );
}
