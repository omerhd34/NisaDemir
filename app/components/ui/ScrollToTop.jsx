'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  const toggleVisibility = () => {
   if (window.scrollY > 300) {
    setIsVisible(true);
   } else {
    setIsVisible(false);
   }
  };

  window.addEventListener('scroll', toggleVisibility);

  return () => {
   window.removeEventListener('scroll', toggleVisibility);
  };
 }, []);

 const scrollToTop = () => {
  window.scrollTo({
   top: 0,
   behavior: 'smooth',
  });
 };

 return (
  <>
   {isVisible && (
    <button
     onClick={scrollToTop}
     className="hidden lg:flex fixed! bottom-8 z-50 w-12 h-12 xl:w-14 xl:h-14 cursor-pointer rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 text-white animate-fadeIn items-center justify-center bg-orange-a right-5!"
     aria-label="Yukarı çık"
    >
     <ArrowUp className="w-5 h-5 xl:w-6 xl:h-6 relative z-10" />
    </button>
   )}
  </>
 );
};

export default ScrollToTop;