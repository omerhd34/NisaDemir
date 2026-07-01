import { revalidatePath } from "next/cache";

export function revalidateHomePage() {
 revalidatePath("/");
}

export function revalidateSocialPages() {
 revalidatePath("/");
 revalidatePath("/iletisim");
 revalidatePath("/kvkk");
 revalidatePath("/cerez-politikasi");
}

export function revalidateAboutPage() {
 revalidatePath("/tanisalim");
}

export function revalidateWorkPage() {
 revalidatePath("/calisma_alanlarim");
}

export function revalidateFaqPage() {
 revalidatePath("/sss");
}

export function revalidateArticlePages(slug) {
 revalidatePath("/", "layout");
 revalidatePath("/yazilarim", "page");

 if (slug) {
  revalidatePath(`/yazilarim/${slug}`, "page");
 }
}
