import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

export async function GET() {
 return adminHandler(async () => {
  const areas = await prisma.workArea.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ workAreas: areas });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { workAreas } = await request.json();

  await prisma.workArea.deleteMany();

  if (Array.isArray(workAreas)) {
   for (let i = 0; i < workAreas.length; i++) {
    const area = workAreas[i];
    await prisma.workArea.create({
     data: {
      title: area.title,
      description: area.description,
      icon: area.icon || "LuUser",
      sortOrder: i,
     },
    });
   }
  }

  const updated = await prisma.workArea.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ workAreas: updated });
 });
}
