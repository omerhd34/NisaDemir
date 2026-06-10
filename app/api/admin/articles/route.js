import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

function slugify(value) {
 return value
  .toLowerCase()
  .replace(/ğ/g, "g")
  .replace(/ü/g, "u")
  .replace(/ş/g, "s")
  .replace(/ı/g, "i")
  .replace(/ö/g, "o")
  .replace(/ç/g, "c")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
}

export async function GET() {
 return adminHandler(async () => {
  const articles = await prisma.article.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ articles });
 });
}

export async function PATCH(request) {
 return adminHandler(async () => {
  const { order } = await request.json();

  if (!Array.isArray(order) || order.length === 0) {
   return NextResponse.json({ error: "Geçersiz sıra" }, { status: 400 });
  }

  await Promise.all(
   order.map((id, index) =>
    prisma.article.update({
     where: { id: Number(id) },
     data: { sortOrder: index },
    })
   )
  );

  const articles = await prisma.article.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ articles });
 });
}

export async function POST(request) {
 return adminHandler(async () => {
  const body = await request.json();
  const slug = body.slug?.trim() || slugify(body.title || "yazi");
  const count = await prisma.article.count();

  const article = await prisma.article.create({
   data: {
    title: body.title,
    slug,
    image: body.image || "/",
    excerpt: body.excerpt || "",
    content: body.content || "",
    writer: body.writer || null,
    sortOrder: count,
   },
  });

  return NextResponse.json(article, { status: 201 });
 });
}
