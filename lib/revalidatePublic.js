import { revalidatePath } from "next/cache";

export function revalidateArticlePages(slug) {
 revalidatePath("/");
 revalidatePath("/yazilarim");

 if (slug) {
  revalidatePath(`/yazilarim/${slug}`);
 }
}
