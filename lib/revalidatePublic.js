import { revalidatePath } from "next/cache";

export function revalidateHomePage() {
 revalidatePath("/");
}

export function revalidateAboutPage() {
 revalidatePath("/tanisalim");
}

export function revalidateWorkPage() {
 revalidatePath("/calisma_alanlarim");
}

export function revalidateArticlePages(slug) {
 revalidatePath("/");
 revalidatePath("/yazilarim");

 if (slug) {
  revalidatePath(`/yazilarim/${slug}`);
 }
}
