export function articleLinkAriaLabel(title) {
 if (!title?.trim()) return "Makalenin devamını oku";
 return `${title.trim()} — devamını oku`;
}

export default function ArticleReadMore({ title, className = "" }) {
 return (
  <span
   className={`inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-primary-dark-light ${className}`.trim()}
  >
   <span className="sr-only">{title?.trim() ? `${title.trim()}: ` : ""}</span>
   Devamını oku
  </span>
 );
}
