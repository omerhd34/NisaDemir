import { NextResponse } from "next/server";
import { adminHandler } from "@/lib/adminApi";
import { phoneTelFromDisplay } from "@/lib/contactPhone";
import { prisma } from "@/lib/prisma";
import { revalidateSocialPages } from "@/lib/revalidatePublic";
import { instagramUrlFromUsername } from "@/lib/socialAppLinks";

function mapSocial(row) {
 return {
  email: row?.email || "",
  phoneDisplay: row?.phoneDisplay || "",
  instagramUsername: row?.instagramUsername || "",
 };
}

export async function GET() {
 return adminHandler(async () => {
  const row = await prisma.social.findUnique({ where: { id: 1 } });
  return NextResponse.json(mapSocial(row));
 });
}

export async function PUT(request) {
 return adminHandler(async () => {
  const { email, phoneDisplay, instagramUsername } = await request.json();
  const phoneTel = phoneTelFromDisplay(phoneDisplay);
  const instagramUrl = instagramUrlFromUsername(instagramUsername);

  const row = await prisma.social.upsert({
   where: { id: 1 },
   update: {
    email,
    phoneDisplay,
    phoneTel,
    instagramUsername,
    instagramUrl,
   },
   create: {
    id: 1,
    email,
    phoneDisplay,
    phoneTel,
    instagramUsername,
    instagramUrl,
   },
  });

  revalidateSocialPages();

  return NextResponse.json(mapSocial(row));
 });
}
