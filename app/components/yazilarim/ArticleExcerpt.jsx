import { isHtmlContent } from "@/lib/articleContent";
import { sanitizeArticleHtml } from "@/lib/articleSanitize";
import { cn } from "@/lib/utils";

export default function ArticleExcerpt({ excerpt, className }) {
 if (!excerpt) return null;

 if (isHtmlContent(excerpt)) {
  return (
   <div
    className={cn(
     "text-sm leading-relaxed text-body line-clamp-3 mb-6 flex-1 [&_p]:inline [&_p:not(:last-child)]:after:content-['_']",
     className
    )}
    dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(excerpt) }}
   />
  );
 }

 return (
  <p className={cn("text-sm leading-relaxed text-body line-clamp-3 mb-6 flex-1", className)}>
   {excerpt}
  </p>
 );
}
