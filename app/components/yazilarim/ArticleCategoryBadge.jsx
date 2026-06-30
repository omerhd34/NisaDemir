import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ArticleCategoryBadge({ category, overlay = false, className }) {
 const label = category?.trim() || "Psikoloji";

 return (
  <Badge
   className={cn(
    overlay &&
    "backdrop-blur-md bg-white/90 dark:bg-dark-900/85 border border-white/40 dark:border-white/10 text-primary dark:text-primary-dark-light shadow-sm",
    className
   )}
  >
   <BookOpen className="w-3 h-3" />
   {label}
  </Badge>
 );
}
