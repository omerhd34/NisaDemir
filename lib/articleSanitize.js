import DOMPurify from "isomorphic-dompurify";
import { isHtmlContent } from "@/lib/articleContent";

const SANITIZE_OPTIONS = {
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
};

export function sanitizeArticleHtml(content) {
 if (!content) return "";
 return DOMPurify.sanitize(content, SANITIZE_OPTIONS);
}

export function prepareArticleContentForDisplay(content) {
 if (!content) return { type: "empty", html: "" };
 if (isHtmlContent(content)) {
  return { type: "html", html: sanitizeArticleHtml(content) };
 }
 return { type: "plain", text: content };
}
