export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Normalize line endings
  let text = markdown.replace(/\r\n/g, "\n");

  // Process code blocks
  let html = text.replace(
    /```([a-z]*)\n([\s\S]*?)\n```/g,
    '<pre class="bg-muted p-4 rounded-md overflow-auto my-4"><code>$2</code></pre>'
  );

  // Process inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>'
  );

  // Process headers with Tailwind classes
  html = html.replace(
    /^# (.*?)$/gm,
    '<h1 class="text-4xl font-bold mt-8">$1</h1>'
  );
  html = html.replace(
    /^## (.*?)$/gm,
    '<h2 class="text-3xl font-bold mt-6">$1</h2>'
  );
  html = html.replace(
    /^### (.*?)$/gm,
    '<h3 class="text-2xl font-bold mt-6">$1</h3>'
  );
  html = html.replace(
    /^#### (.*?)$/gm,
    '<h4 class="text-xl font-bold mt-4">$1</h4>'
  );
  html = html.replace(
    /^##### (.*?)$/gm,
    '<h5 class="text-lg font-bold mt-4">$1</h5>'
  );
  html = html.replace(
    /^###### (.*?)$/gm,
    '<h6 class="text-base font-bold mt-2">$1</h6>'
  );

  // Process bold
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Process italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Process links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary hover:underline">$1</a>'
  );

  // Better handling for unordered lists - first convert each list item (handling both * and -)
  html = html.replace(
    /^([\*\-])\s+(.*?)$/gm,
    '<li class="flex items-start ml-4 mb-2"><span class="mr-3 ml-1">$1</span><span class="ml-1">$2</span></li>'
  );

  // Then wrap consecutive list items in <ul> tags
  html = html.replace(/(<li.*?<\/li>)(\n\s*)?(<li)/g, "$1$3");

  // Wrap list items in <ul> tags
  html = html.replace(
    /(^|\n)(<li.*?<\/li>)(\n|$)/g,
    '\n<ul class="my-4 space-y-2 pl-5">$2</ul>\n'
  );

  // Process ordered lists - first convert each list item
  html = html.replace(
    /^\d+\.\s+(.*?)$/gm,
    '<li class="list-decimal ml-6 mb-2">$1</li>'
  );

  // Then wrap consecutive list items in <ol> tags
  html = html.replace(/(<li.*?<\/li>)(\n\s*)?(<li)/g, "$1$3");

  // Wrap list items in <ol> tags
  html = html.replace(
    /(^|\n)(<li.*?<\/li>)(\n|$)/g,
    '\n<ol class="my-4 space-y-1 pl-5 list-outside">$2</ol>\n'
  );

  // Process blockquotes
  html = html.replace(
    /^> (.*?)$/gm,
    '<blockquote class="pl-4 border-l-4 border-muted-foreground italic my-4 text-muted-foreground">$1</blockquote>'
  );

  // Collapse consecutive blockquotes
  html = html.replace(/(<\/blockquote>)\s*(<blockquote)/g, "$1$2");

  // Convert newlines to <br> tags when appropriate
  html = html.replace(/([^>])\n([^<])/g, "$1<br>$2");

  // Process paragraphs, but avoid wrapping existing HTML elements - now with text-lg
  html = html.replace(
    /(^|\n)(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre|<p|<\/)[^\n]+(\n|$)/g,
    '<p class="my-4 leading-relaxed text-lg">$&</p>'
  );

  // Clean up any extra paragraph tags around existing elements
  html = html.replace(
    /<p.*?>(<(?:h[1-6]|ul|ol|li|blockquote|pre).*?<\/(?:h[1-6]|ul|ol|li|blockquote|pre)>)<\/p>/g,
    "$1"
  );

  // Remove empty paragraphs
  html = html.replace(/<p.*?>\s*<\/p>/g, "");

  // Clean up line breaks in paragraphs
  html = html.replace(/<p(.*?)>(.*?)<br><\/p>/g, "<p$1>$2</p>");

  // Fix nested lists issue
  html = html.replace(/<\/ul>\s*<ul.*?>/g, "");
  html = html.replace(/<\/ol>\s*<ol.*?>/g, "");

  return html;
}
