import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

export async function GET() {
 return adminHandler(async () => {
  const row = await prisma.social.findUnique({ where: { id: 1 } });
  return NextResponse.json({
   email: row?.email || "",
   instagramUsername: row?.instagramUsername || "",
   instagramUrl: row?.instagramUrl || "",
  });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { email, instagramUsername, instagramUrl } = await request.json();

  const row = await prisma.social.upsert({
   where: { id: 1 },
   update: { email, instagramUsername, instagramUrl },
   create: { id: 1, email, instagramUsername, instagramUrl },
  });

  return NextResponse.json(row);
 });
}
