import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_VALUE = "authenticated";

function getSecret() {
 return process.env.ADMIN_SECRET || "dev-admin-secret-change-me";
}

function sign(value) {
 const hash = crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
 return `${hash}.${value}`;
}

function verify(token) {
 const [hash, value] = token.split(".");
 if (!hash || !value) return null;

 const expected = crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
 if (hash.length !== expected.length) return null;

 if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected))) {
  return null;
 }

 return value;
}

export async function isAdminAuthenticated() {
 const store = await cookies();
 const token = store.get(COOKIE_NAME)?.value;
 if (!token) return false;
 return verify(token) === SESSION_VALUE;
}

export async function setAdminSession() {
 const store = await cookies();
 store.set(COOKIE_NAME, sign(SESSION_VALUE), {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
 });
}

export async function clearAdminSession() {
 const store = await cookies();
 store.delete(COOKIE_NAME);
}

function safeEqual(a, b) {
 if (a.length !== b.length) return false;
 return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function verifyAdminCredentials(username, password) {
 const expectedUsername = process.env.ADMIN_USERNAME || "admin";
 const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

 if (!username || !password) return false;

 return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

export async function requireAdmin() {
 const ok = await isAdminAuthenticated();
 if (!ok) {
  throw new Error("UNAUTHORIZED");
 }
}
