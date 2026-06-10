import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

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
    slug: body.slug,
    image: body.image,
    excerpt: body.excerpt,
    content: body.content,
    writer: body.writer || null,
   },
  });

  return NextResponse.json(article);
 });
}

export async function DELETE(_request, { params }) {
 return adminHandler(async () => {
  const { id } = await params;
  await prisma.article.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
 });
}
