'use client';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const HomeWelcome = () => {
 const { data } = useAppContext();

 if (!data?.home) return null;

 const { texts = [], images = [], titles = [], books = [] } = data.home;

 return (
  <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-dark-900 section-curve-top">
   <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
    style={{
     backgroundImage:
      'radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 50%), radial-gradient(circle at 10% 90%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 50%)',
    }}
   />

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
     <div className="text-center mb-14 md:mb-20 animate-fadeIn">
      <span className="eyebrow text-primary dark:text-primary-dark-light">
       <span className="w-6 h-px bg-primary dark:bg-primary-dark-light" />
       Sözler
       <span className="w-6 h-px bg-primary dark:bg-primary-dark-light" />
      </span>
      <h2 className="display-serif text-4xl sm:text-5xl md:text-6xl mt-5 mb-4 text-heading">
       <span className="italic font-normal">Dinlemenin</span> sanatı
      </h2>
      <p className="text-base sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
       Psikoterapi yolculuğunda bize eşlik eden bazı sözler ve düşünürler.
      </p>
     </div>

     <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {texts.map((text, index) => {
       const image = images[index];
       const title = titles[index];
       const book = books[index];
       const isEven = index % 2 === 0;

       if (!image) return null;

       return (
        <article
         key={index}
         className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center animate-slideUp"
         style={{ animationDelay: `${index * 120}ms` }}
        >
         <div
          className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
         >
          <div className="relative group">
           <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5">
            <Image
             src={image}
             fill
             alt={text}
             className="object-cover transition-transform duration-700 group-hover:scale-105"
             sizes="(max-width: 1024px) 90vw, 40vw"
             quality={90}
             unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 via-transparent to-transparent" />
           </div>

           <div
            className={`hidden md:block absolute -z-10 w-full h-full rounded-2xl border border-primary/25 dark:border-primary-dark/20 ${isEven ? '-bottom-4 -right-4' : '-bottom-4 -left-4'}`}
           />
          </div>
         </div>

         <div
          className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
         >
          <Quote
           className="w-10 h-10 text-primary/30 dark:text-primary-dark/30 mb-4"
           strokeWidth={1.5}
          />

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.35rem] leading-[1.3] font-normal text-heading">
           {text}
          </blockquote>

          {title && (
           <div className="mt-7 flex items-center gap-4">
            <span className="w-10 h-px bg-primary dark:bg-primary-dark" />
            <div>
             <div className="text-base sm:text-lg font-medium text-heading">
              {title}
             </div>
             {book && book.trim() && (
              <div className="font-serif italic text-sm sm:text-base text-muted mt-0.5">
               {book}
              </div>
             )}
            </div>
           </div>
          )}
         </div>
        </article>
       );
      })}
     </div>
    </div>
   </div>
  </section>
 );
};

export default HomeWelcome;
