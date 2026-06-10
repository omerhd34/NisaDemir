import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

export async function GET() {
 return adminHandler(async () => {
  const quotes = await prisma.homeQuote.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ quotes });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { quotes } = await request.json();

  await prisma.homeQuote.deleteMany();

  if (Array.isArray(quotes)) {
   for (let i = 0; i < quotes.length; i++) {
    const quote = quotes[i];
    await prisma.homeQuote.create({
     data: {
      text: quote.text,
      title: quote.title || "",
      book: quote.book || "",
      image: quote.image || "",
      sortOrder: i,
     },
    });
   }
  }

  const updated = await prisma.homeQuote.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ quotes: updated });
 });
}
