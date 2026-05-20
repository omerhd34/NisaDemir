import Link from 'next/link';

const Logo = () => {
 return (
  <Link href="/" aria-label="Nisa Demir — Ana Sayfa" className="group flex items-center gap-4 focus:outline-none">

   <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#d4a373] via-[#a67c52] to-[#4a280d] shadow-xl shadow-black/60 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-orange-950/50">

    <div className="absolute inset-1 rounded-full border border-[#fefae0]/20 shadow-xs"></div>

    <div className="absolute inset-[5px] rounded-full border border-[#3a2311]/60 bg-linear-to-tr from-[#7f5539]/50 to-transparent shadow-inner"></div>
    <div className="absolute inset-[7px] rounded-full border border-[#fefae0]/10 opacity-70"></div>

    <div className="relative z-10 text-[#fefae0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-105">
     <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8 opacity-90"
     >
      <path d="M12 22V13M12 13C10 13 9 14.5 7 15M12 13C14 13 15 14.5 17 15" />
      <path d="M12 9C12 6 9.5 4.5 9.5 4.5M12 10.5C12 8 14.5 6.5 14.5 6.5" />
      <path d="M12 13C12 11 10 9.5 8 10M12 12C12 10.5 13.5 9 15.5 9.5" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="7" cy="6" r="0.8" fill="currentColor" />
      <circle cx="17" cy="6" r="0.8" fill="currentColor" />
      <circle cx="5" cy="10" r="0.8" fill="currentColor" />
      <circle cx="19" cy="10" r="0.8" fill="currentColor" />
      <circle cx="9.5" cy="4.5" r="0.5" />
      <circle cx="14.5" cy="6.5" r="0.5" />
     </svg>
    </div>

    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
     <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 ease-in-out group-hover:left-[200%]"></div>
    </div>
   </div>

   <div className="flex flex-col select-none">
    <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#f3eedd] transition-colors duration-400 group-hover:text-[#d4a373]">
     Nisa Demir
    </span>

    <span className="mt-1 flex items-center gap-2.5 text-[10px] sm:text-[11px] font-medium tracking-[0.3em] text-[#d4a373] uppercase opacity-90">
     <span className="h-px w-6 bg-[#d4a373]/60 transition-all duration-500 group-hover:w-9 group-hover:bg-[#d4a373]"></span>
     Klinik Psikolog
    </span>
   </div>

  </Link>
 );
};

export default Logo;