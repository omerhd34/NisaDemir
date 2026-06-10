import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminLoginForm from "./AdminLoginForm";

export default async function AdminLoginPage() {
 if (await isAdminAuthenticated()) {
  redirect("/admin");
 }

 return <AdminLoginForm />;
}
