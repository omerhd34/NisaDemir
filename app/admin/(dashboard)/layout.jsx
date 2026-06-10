import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }) {
 const authenticated = await isAdminAuthenticated();
 if (!authenticated) {
  redirect("/admin/login");
 }

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">{children}</div>
   </div>
  </div>
 );
}
