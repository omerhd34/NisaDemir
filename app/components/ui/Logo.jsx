import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ compact = false }) => {
 return (
  <Link href="/" aria-label="Nisa Demir — Ana Sayfa" className="group flex items-center gap-3 focus:outline-none">

   <div
    className={cn(
     'relative flex shrink-0 items-center justify-center rounded-full bg-[#1c0e04] shadow-xl shadow-black/60 transition-all duration-500 ease-out group-hover:scale-105',
     compact ? 'h-9 w-9' : 'h-11 w-11 sm:h-12 sm:w-12'
    )}
   >

    <div className="absolute inset-0 rounded-full border border-[#c9913a]/60"></div>
    <div className="absolute inset-[5px] rounded-full border border-[#7a5218]/40"></div>

    <svg viewBox="0 0 34 38" fill="none" className={cn('relative z-10', compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6')}>
     <line x1="17" y1="2" x2="17" y2="36" stroke="#e8c47a" strokeWidth="0.8" opacity="0.45" strokeLinecap="round" />
     <path d="M17 34 Q1 26 3 11 Q5 0 17 2" stroke="#e8c47a" strokeWidth="1.2" strokeLinecap="round" />
     <path d="M17 34 Q33 26 31 11 Q29 0 17 2" stroke="#e8c47a" strokeWidth="1.2" strokeLinecap="round" />
     <path d="M17 30 Q7 24 8 16 Q9 8 17 6" stroke="#e8c47a" strokeWidth="0.8" strokeLinecap="round" opacity="0.65" />
     <path d="M17 30 Q27 24 26 16 Q25 8 17 6" stroke="#e8c47a" strokeWidth="0.8" strokeLinecap="round" opacity="0.65" />
     <circle cx="17" cy="2" r="1.6" fill="#e8c47a" />
     <circle cx="17" cy="34" r="1.2" fill="#e8c47a" opacity="0.65" />
    </svg>

    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
     <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/8 to-transparent transition-all duration-1000 ease-in-out group-hover:left-[200%]"></div>
    </div>
   </div>

   <div className="flex flex-col select-none">
    <span
     className={cn(
      'font-serif font-normal tracking-wide text-gray-900 dark:text-[#f5e8cc] transition-colors duration-400 group-hover:text-primary dark:group-hover:text-[#d4a373]',
      compact ? 'text-[0.95rem]' : 'text-xl sm:text-2xl'
     )}
    >
     Nisa Demir
    </span>
    <span className="mt-0.5 flex items-center gap-2 text-[9px] sm:text-[10px] font-medium tracking-[0.35em] text-[#c9913a] uppercase opacity-90">
     <span className="h-px w-4 bg-[#c9913a]/60 transition-all duration-500 group-hover:w-7 group-hover:bg-[#c9913a]"></span>
     Klinik Psikolog
    </span>
   </div>

  </Link>
 );
};

export default Logo;