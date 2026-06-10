import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request) {
 const { username, password } = await request.json();

 if (!verifyAdminCredentials(username, password)) {
  return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
 }

 await setAdminSession();
 return NextResponse.json({ success: true });
}
