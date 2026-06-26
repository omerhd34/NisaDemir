import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";
import { revalidateFaqPage } from "@/lib/revalidatePublic";

export async function GET() {
 return adminHandler(async () => {
  const items = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ items });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { items } = await request.json();

  await prisma.$transaction(async (tx) => {
   await tx.faqItem.deleteMany();

   if (Array.isArray(items)) {
    for (let i = 0; i < items.length; i++) {
     const item = items[i];
     await tx.faqItem.create({
      data: {
       question: item.question,
       answer: item.answer,
       sortOrder: i,
      },
     });
    }
   }
  });

  const updatedItems = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  revalidateFaqPage();
  return NextResponse.json({ items: updatedItems });
 });
}
