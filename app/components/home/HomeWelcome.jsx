import Image from 'next/image';
import { Quote } from 'lucide-react';
import { home } from '@/lib/siteData';

const HomeWelcome = () => {
 const { texts, images, titles, books } = home;

 return (
  <section className="relative py-10 sm:py-12 md:py-14 bg-gray-50 dark:bg-dark-900 section-curve-top">
   <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
    style={{
     backgroundImage:
      'radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 50%), radial-gradient(circle at 10% 90%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 50%)',
    }}
   />

   <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
     <div className="text-center mb-8 md:mb-10 animate-fadeIn">
      <h2 className="display-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 mb-2 text-heading">
       <span className="italic font-normal">Dinlemenin</span> sanatı
      </h2>
      <p className="text-sm sm:text-base text-body max-w-xl mx-auto leading-relaxed">
       Psikoterapi yolculuğunda bize eşlik eden bazı söz ve düşünürler.
      </p>
     </div>

     <div className="space-y-8 md:space-y-10">
      {texts.map((text, index) => {
       const image = images[index];
       const title = titles[index];
       const book = books[index];
       const isEven = index % 2 === 0;

       if (!image) return null;

       return (
        <article
         key={index}
         className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 xl:gap-16 items-center animate-slideUp"
         style={{ animationDelay: `${index * 120}ms` }}
        >
         <div
          className={`lg:col-span-3 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
         >
          <div className="relative group max-w-[200px] sm:max-w-[220px] lg:max-w-none mx-auto">
           <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 dark:ring-white/5">
            <Image
             src={image}
             fill
             alt={text}
             className="object-cover transition-transform duration-700 group-hover:scale-105"
             sizes="(max-width: 1024px) 40vw, 20vw"
             quality={85}
             unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 via-transparent to-transparent" />
           </div>

           <div
            className={`hidden md:block absolute -z-10 w-full h-full rounded-xl border border-primary/20 dark:border-primary-dark/15 ${isEven ? '-bottom-2 -right-2' : '-bottom-2 -left-2'}`}
           />
          </div>
         </div>

         <div
          className={`lg:col-span-9 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
         >
          <Quote
           className="w-7 h-7 text-primary/30 dark:text-primary-dark/30 mb-2.5"
           strokeWidth={1.5}
          />

          <blockquote className="font-serif text-lg sm:text-xl md:text-2xl leading-[1.35] font-normal text-heading">
           {text}
          </blockquote>

          {title && (
           <div className="mt-4 flex items-center gap-3">
            <span className="w-8 h-px bg-primary dark:bg-primary-dark" />
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
