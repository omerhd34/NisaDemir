import Link from 'next/link';

const Logo = () => {
 return (
  <Link href="/" aria-label="Nisa Demir — Ana Sayfa">
   <div className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-orange-a transition-transform duration-500 hover:scale-105">
    <span className="font-serif text-white text-lg sm:text-xl leading-none tracking-tight select-none">
     ND
    </span>
    <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/15"></span>
   </div>
  </Link>
 );
};

export default Logo;
