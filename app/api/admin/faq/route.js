import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";
import { revalidateFaqPage } from "@/lib/revalidatePublic";

export async function GET() {
 return adminHandler(async () => {
  const [items, categories] = await Promise.all([
   prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
   prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return NextResponse.json({ items, categories });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { items, categories } = await request.json();
  const defaultCategory = categories?.[0]?.slug || "genel";

  await prisma.$transaction(async (tx) => {
   await tx.faqCategory.deleteMany();

   if (Array.isArray(categories)) {
    for (let i = 0; i < categories.length; i++) {
     const category = categories[i];
     if (!category.slug?.trim() || !category.title?.trim()) continue;

     await tx.faqCategory.create({
      data: {
       slug: category.slug.trim(),
       title: category.title.trim(),
       sortOrder: i,
      },
     });
    }
   }

   await tx.faqItem.deleteMany();

   if (Array.isArray(items)) {
    for (let i = 0; i < items.length; i++) {
     const item = items[i];
     await tx.faqItem.create({
      data: {
       question: item.question,
       answer: item.answer,
       category: item.category || defaultCategory,
       sortOrder: i,
      },
     });
    }
   }
  });

  const [updatedItems, updatedCategories] = await Promise.all([
   prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
   prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  revalidateFaqPage();
  return NextResponse.json({ items: updatedItems, categories: updatedCategories });
 });
}
