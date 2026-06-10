import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";
import { revalidateAboutPage } from "@/lib/revalidatePublic";

export async function GET() {
 return adminHandler(async () => {
  const row = await prisma.about.findUnique({ where: { id: 1 } });
  return NextResponse.json({
   text1: row?.text1 || "",
   text2: row?.text2 || "",
   text3: row?.text3 || "",
  });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { text1, text2, text3 } = await request.json();

  const row = await prisma.about.upsert({
   where: { id: 1 },
   update: { text1, text2, text3 },
   create: { id: 1, text1, text2, text3 },
  });

  revalidateAboutPage();

  return NextResponse.json(row);
 });
}
