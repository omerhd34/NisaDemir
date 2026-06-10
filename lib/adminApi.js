import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function adminHandler(handler) {
 try {
  await requireAdmin();
  return await handler();
 } catch (error) {
  if (error.message === "UNAUTHORIZED") {
   return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  console.error(error);
  return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
 }
}
