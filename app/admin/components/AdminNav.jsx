"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
 LayoutDashboard,
 Mail,
 Home,
 UserCircle,
 Briefcase,
 BookOpen,
 Clock,
 LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
 { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
 { href: "/admin/social", label: "Sosyal Medya", icon: Mail },
 { href: "/admin/home", label: "Ana Sayfa", icon: Home },
 { href: "/admin/about", label: "Hakkımda", icon: UserCircle },
 { href: "/admin/work", label: "Çalışma Alanları", icon: Briefcase },
 { href: "/admin/articles", label: "Yazılar", icon: BookOpen },
 { href: "/admin/contact", label: "İletişim", icon: Clock },
];

export default function AdminNav() {
 const pathname = usePathname();
 const router = useRouter();

 async function handleLogout() {
  await fetch("/api/admin/logout", { method: "POST" });
  router.push("/admin/login");
  router.refresh();
 }

 return (
  <aside className="w-full lg:w-64 shrink-0">
   <div className="rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-800 p-4 lg:sticky lg:top-6">
    <div className="mb-6 px-2">
     <p className="text-xs uppercase tracking-widest text-muted">Yönetim</p>
     <h1 className="font-serif text-2xl text-heading mt-1">Admin Panel</h1>
    </div>

    <nav className="space-y-1">
     {NAV.map(({ href, label, icon: Icon, exact }) => {
      const active = exact ? pathname === href : pathname.startsWith(href);
      return (
       <Link
        key={href}
        href={href}
        className={cn(
         "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
         active
          ? "bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark-light"
          : "text-body hover:bg-gray-100 dark:hover:bg-dark-700"
        )}
       >
        <Icon className="w-4 h-4" />
        {label}
       </Link>
      );
     })}
    </nav>

    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-500">
     <Button variant="outline" className="w-full" onClick={handleLogout}>
      <LogOut />
      Çıkış Yap
     </Button>
    </div>
   </div>
  </aside>
 );
}
