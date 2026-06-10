import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminNav from "@/app/admin/components/AdminNav";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminDashboardLayout({ children }) {
 const authenticated = await isAdminAuthenticated();
 if (!authenticated) {
  redirect("/admin/login");
 }

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
   <AdminNav />
   <main className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
    {children}
   </main>
   <Toaster />
  </div>
 );
}
