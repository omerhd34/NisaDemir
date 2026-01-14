'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, FileText, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Logo from './Logo';

const Header = () => {
 const { theme, toggleTheme } = useAppContext();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const pathname = usePathname();

 const menuItems = [
  { id: 'home', label: "Ana Sayfa", icon: Home, href: '/' },
  { id: 'about', label: "Tanışalım", icon: User, href: '/tanisalim' },
  { id: 'work', label: "Çalışma Alanlarım", icon: Briefcase, href: '/calisma_alanlarim' },
  { id: 'articles', label: "Yazılarım", icon: FileText, href: '/yazilarim' },
  { id: 'contact', label: "İletişim", icon: Mail, href: '/iletisim' }
 ];

 const isActive = (href) => {
  if (href === '/') {
   return pathname === '/';
  }
  return pathname.startsWith(href);
 };

 return (
  <header className="sticky top-0 z-50 backdrop-blur-xl bg-linear-to-b from-gray-100/95 via-gray-100/90 to-gray-100/85 dark:from-dark-800/95 dark:via-dark-800/90 dark:to-dark-800/85 border-b border-gray-300/30 dark:border-dark-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
   <div className="container mx-auto px-4 lg:px-8">
    <div className="flex justify-between items-center py-4 lg:py-5">
     <Logo />

     <nav className="hidden lg:flex items-center space-x-3 xl:space-x-4">
      {menuItems.map(item => {
       const active = isActive(item.href);
       return (
        <Link
         key={item.id}
         href={item.href}
         className={`group relative flex items-center space-x-2 px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl transition-all duration-700 ease-out overflow-hidden ${active
          ? 'bg-orange-a shadow-lg shadow-orange-500/20 dark:shadow-orange-500/10 text-black dark:text-white'
          : 'text-black dark:text-white hover:shadow-md hover:bg-orange-a'
          }`}
        >
         <item.icon
          size={18}
          className={`relative z-10 transition-all duration-700 ${active
           ? 'text-black dark:text-white drop-shadow-sm'
           : 'group-hover:text-black dark:group-hover:text-white'
           }`}
         />
         <span className={`relative z-10 text-sm xl:text-base font-medium transition-all duration-700 ${active
          ? 'font-bold text-black dark:text-white drop-shadow-sm'
          : 'group-hover:font-semibold'
          }`}>
          {item.label}
         </span>
        </Link>
       );
      })}
     </nav>

     <div className="flex items-center gap-2 xl:gap-3">
      <button
       type="button"
       onClick={toggleTheme}
       className="relative p-2.5 xl:p-3 rounded-xl bg-orange-a backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/30 dark:hover:shadow-orange-500/20 shadow-lg group overflow-hidden cursor-pointer"
       aria-label="Toggle theme"
      >
       {/* Glow effect */}
       <div className="absolute inset-0 bg-linear-to-br from-white/30 via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       <div className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

       {/* Pulse ring */}
       <span className="absolute inset-0 rounded-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>

       {theme === 'dark' ? (
        <Sun size={20} className="relative z-10 text-gray-800 dark:text-gray-100 group-hover:rotate-180 transition-all duration-500 drop-shadow-sm" />
       ) : (
        <Moon size={20} className="relative z-10 text-gray-800 dark:text-gray-100 group-hover:rotate-180 transition-all duration-500 drop-shadow-sm" />
       )}
      </button>

      <button
       className="lg:hidden p-2.5 rounded-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:shadow-md hover:bg-orange-a relative overflow-hidden group cursor-pointer"
       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
       aria-label="Toggle menu"
      >
       <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></span>
       {mobileMenuOpen ? (
        <X size={24} className="relative z-10 transition-all duration-300 rotate-90" />
       ) : (
        <Menu size={24} className="relative z-10 transition-all duration-300" />
       )}
      </button>
     </div>
    </div>

    <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
     }`}>
     <nav className="pb-6 border-t border-gray-300/30 dark:border-dark-500/30 mt-2 pt-4">
      {menuItems.map((item, index) => {
       const active = isActive(item.href);
       return (
        <Link
         key={item.id}
         href={item.href}
         onClick={() => setMobileMenuOpen(false)}
         className={`group relative flex items-center space-x-3 py-3.5 px-5 rounded-xl transition-all duration-500 w-full mb-2 overflow-hidden ${active
          ? 'bg-orange-a text-black dark:text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-500/10'
          : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-linear-to-r hover:from-gray-200/70 hover:to-gray-200/50 dark:hover:from-dark-700/70 dark:hover:to-dark-700/50 hover:shadow-md'
          }`}
         style={{ animationDelay: `${index * 50}ms` }}
        >
         {active && (
          <>
           <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-white/90 via-white to-white/90 rounded-r-full shadow-lg shadow-white/50"></span>
           <span className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 rounded-xl"></span>
          </>
         )}

         {!active && (
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></span>
         )}

         <item.icon
          size={20}
          className={`relative z-10 transition-all duration-500 ${active
           ? 'text-black dark:text-white drop-shadow-sm group-hover:rotate-6'
           : 'group-hover:rotate-6 group-hover:text-black dark:group-hover:text-white'
           }`}
         />
         <span className={`relative z-10 font-medium transition-all duration-500 ${active
          ? 'font-bold text-black dark:text-white drop-shadow-sm'
          : 'group-hover:font-semibold'
          }`}>
          {item.label}
         </span>
        </Link>
       );
      })}
     </nav>
    </div>
   </div>
  </header>
 );
};

export default Header;