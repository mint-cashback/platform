export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Process code blocks
  let html = markdown.replace(
    /```([a-z]*)\n([\s\S]*?)\n```/g,
    "<pre><code>$2</code></pre>"
  );

  // Process inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Process headers
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
  html = html.replace(/^##### (.*$)/gm, "<h5>$1</h5>");
  html = html.replace(/^###### (.*$)/gm, "<h6>$1</h6>");

  // Process bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Process italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Process links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Process unordered lists
  html = html.replace(/^\s*\*\s(.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

  // Process ordered lists
  html = html.replace(/^\s*\d+\.\s(.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/g, "<ol>$1</ol>");

  // Process blockquotes
  html = html.replace(/^\> (.*$)/gm, "<blockquote>$1</blockquote>");

  // Process paragraphs
  html = html.replace(/^(?!<[a-z]).+/gm, "<p>$&</p>");

  // Fix nested lists issue with this simple implementation
  html = html.replace(/<\/ul>\s*<ul>/g, "");
  html = html.replace(/<\/ol>\s*<ol>/g, "");

  return html;
}
