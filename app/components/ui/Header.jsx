'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, FileText, Mail, Menu, Moon, Sun } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const menuItems = [
 { id: 'home', label: 'Ana Sayfa', icon: Home, href: '/' },
 { id: 'about', label: 'Tanışalım', icon: User, href: '/tanisalim' },
 { id: 'work', label: 'Çalışma Alanlarım', icon: Briefcase, href: '/calisma_alanlarim' },
 { id: 'articles', label: 'Yazılarım', icon: FileText, href: '/yazilarim' },
 { id: 'contact', label: 'İletişim', icon: Mail, href: '/iletisim' },
];

const Header = () => {
 const { theme, toggleTheme } = useAppContext();
 const [open, setOpen] = useState(false);
 const pathname = usePathname();

 const isActive = (href) => {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
 };

 return (
  <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-dark-900/80 border-b border-gray-200/70 dark:border-dark-500/40">
   <div className="container mx-auto px-5 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16 lg:h-20">
     <div className="flex items-center gap-3">
      <Logo />
      <div className="hidden sm:flex flex-col leading-none">
       <span className="font-serif text-lg lg:text-xl text-heading">Nisa Demir</span>
       <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted mt-0.5">Klinik Psikolog</span>
      </div>
     </div>

     <nav className="hidden lg:flex items-center gap-1">
      {menuItems.map((item) => {
       const active = isActive(item.href);
       return (
        <Link
         key={item.id}
         href={item.href}
         className={`relative px-3.5 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-300 ${
          active
           ? 'text-primary dark:text-primary-dark-light'
           : 'text-gray-700 dark:text-dark-100 hover:text-primary dark:hover:text-primary-dark-light'
         }`}
        >
         {item.label}
         <span
          className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-primary dark:bg-primary-dark transition-all duration-300 ${
           active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
          }`}
         />
        </Link>
       );
      })}
     </nav>

     <div className="flex items-center gap-2">
      <Button asChild size="sm" className="hidden md:inline-flex">
       <Link href="/iletisim">Randevu Al</Link>
      </Button>

      <Button
       type="button"
       onClick={toggleTheme}
       variant="ghost"
       size="icon"
       aria-label="Toggle theme"
       className="rounded-full"
      >
       {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
       <SheetTrigger asChild>
        <Button
         variant="ghost"
         size="icon"
         className="lg:hidden rounded-full"
         aria-label="Menüyü aç"
        >
         <Menu size={20} />
        </Button>
       </SheetTrigger>
       <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader>
         <SheetTitle className="text-2xl">
          Nisa <span className="italic text-primary dark:text-primary-dark-light">Demir</span>
         </SheetTitle>
         <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Klinik Psikolog
         </p>
        </SheetHeader>

        <Separator />

        <nav className="flex-1 overflow-y-auto px-3 py-4">
         {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
           <Link
            key={item.id}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors duration-300 ${
             active
              ? 'text-primary dark:text-primary-dark-light bg-primary/10 dark:bg-primary-dark/15'
              : 'text-gray-800 dark:text-dark-100 hover:bg-gray-100 dark:hover:bg-dark-800'
            }`}
           >
            <item.icon size={18} className="shrink-0" />
            <span>{item.label}</span>
           </Link>
          );
         })}
        </nav>

        <div className="p-5 border-t border-gray-200 dark:border-dark-500/40">
         <Button asChild className="w-full" size="lg">
          <Link href="/iletisim" onClick={() => setOpen(false)}>
           Randevu Al
          </Link>
         </Button>
        </div>
       </SheetContent>
      </Sheet>
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
