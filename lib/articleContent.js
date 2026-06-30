import DOMPurify from "isomorphic-dompurify";

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

export function sanitizeArticleHtml(content) {
 if (!content) return "";

 const sanitized = DOMPurify.sanitize(content, {
  ALLOWED_TAGS: [
   "p",
   "br",
   "strong",
   "b",
   "em",
   "i",
   "u",
   "s",
   "span",
   "h2",
   "h3",
   "ul",
   "ol",
   "li",
   "blockquote",
  ],
  ALLOWED_ATTR: ["style", "class"],
 });

 return sanitized;
}

export function prepareArticleContentForDisplay(content) {
 if (!content) return { type: "empty", html: "" };
 if (isHtmlContent(content)) {
  return { type: "html", html: sanitizeArticleHtml(content) };
 }
 return { type: "plain", text: content };
}
