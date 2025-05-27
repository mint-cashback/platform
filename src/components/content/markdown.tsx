"use client";

import { useEffect, useRef, FC } from 'react';
import { markdownToHtml } from '@/lib/utils/markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: FC<MarkdownContentProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle links to open in new tab
    if (containerRef.current) {
      const links = containerRef.current.querySelectorAll('a');
      links.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
};

export default MarkdownContent; 