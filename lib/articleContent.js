const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

export function isHtmlContent(content) {
 return Boolean(content && HTML_TAG_PATTERN.test(content));
}

export function plainTextToHtml(content) {
 if (!content) return "";
 if (isHtmlContent(content)) return content;

 return content
  .split(/\n\n+/)
  .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
  .join("");
}
