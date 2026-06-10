import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { prisma } from "@/lib/prisma";

export async function GET() {
 return adminHandler(async () => {
  const row = await prisma.contact.findUnique({ where: { id: 1 } });
  let workingHours = [];
  if (row?.workingHours) {
   try {
    workingHours = JSON.parse(row.workingHours);
   } catch {
    workingHours = [];
   }
  }
  return NextResponse.json({ workingHours });
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { workingHours } = await request.json();
  const payload = JSON.stringify(Array.isArray(workingHours) ? workingHours : []);

  const row = await prisma.contact.upsert({
   where: { id: 1 },
   update: { workingHours: payload },
   create: { id: 1, workingHours: payload },
  });

  return NextResponse.json({ workingHours: JSON.parse(row.workingHours) });
 });
}
