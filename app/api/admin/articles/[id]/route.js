import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";
import { revalidateArticlePages } from "@/lib/revalidatePublic";
function normalizeContent(content) {
 return content || "";
}

export async function GET(_request, { params }) {
 return adminHandler(async () => {
  const { id } = await params;
  const article = await prisma.article.findUnique({
   where: { id: Number(id) },
  });

  if (!article) {
   return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(article);
 });
}

export async function PUT(request, { params }) {
 return adminHandler(async () => {
  const { id } = await params;
  const body = await request.json();

  const article = await prisma.article.update({
   where: { id: Number(id) },
   data: {
    title: body.title,
    image: body.image,
    excerpt: body.excerpt,
    content: normalizeContent(body.content),
    writer: body.writer || null,
    category: body.category?.trim() || "Psikoloji",
   },
  });

  revalidateArticlePages(article.slug);

  return NextResponse.json(article);
 });
}

export async function DELETE(_request, { params }) {
 return adminHandler(async () => {
  const { id } = await params;
  const article = await prisma.article.findUnique({
   where: { id: Number(id) },
   select: { slug: true },
  });

  await prisma.article.delete({ where: { id: Number(id) } });

  revalidateArticlePages(article?.slug);

  return NextResponse.json({ success: true });
 });
}
