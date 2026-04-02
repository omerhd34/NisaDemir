"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ArticleDetailClient({ article }) {
  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-24 transition-colors duration-300 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
            <Link
              href="/yazilarim"
              className="flex items-center gap-2 mb-6 sm:mb-8 hover:gap-3 transition-all duration-300 font-semibold text-sm sm:text-base text-primary dark:text-primary-dark hover:text-dark-950 dark:hover:text-gray-50"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Yazılara Dön</span>
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-dark-950 dark:text-gray-50">
              {article.title}
            </h1>

            {article.writer && (
              <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
                <span className="font-medium italic text-sm sm:text-base text-body">
                  {article.writer}
                </span>
              </div>
            )}

            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>

            {article.poem && (
              <div className="card p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8 text-center">
                <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line italic text-body">
                  {article.poem}
                </p>
                <p className="text-base sm:text-lg mt-3 sm:mt-4 font-semibold leading-relaxed whitespace-pre-line italic text-primary dark:text-primary-dark border-b border-primary dark:border-primary-dark pb-2 inline-block">
                  {article.writer2}
                </p>
              </div>
            )}

            <div className="card p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg leading-relaxed sm:leading-loose whitespace-pre-line text-body">
                {article.content}
              </p>
            </div>

            {article.source && (
              <div className="card p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8">
                <div className="leading-relaxed whitespace-pre-line">
                  <p className="text-base sm:text-lg font-semibold text-primary dark:text-primary-dark border-b border-primary dark:border-primary-dark inline-block">
                    Kaynak:
                  </p>
                  <p className="text-xs sm:text-sm font-bold italic text-body mt-2 sm:mt-3">
                    {article.source}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
