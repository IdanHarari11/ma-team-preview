"use client"
import React, { useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import NagishLi from '@/components/ui/NagishLi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LegalCenter from '@/components/LegalCenter';

export default function ClientRoot({ children, rubikClass }: { children: React.ReactNode, rubikClass: string }) {
  const { language } = useLanguage();
  
  // עדכון ה-HTML tag לפי השפה - רק בצד הלקוח
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      htmlElement.lang = language;
      htmlElement.dir = language === 'he' ? 'rtl' : 'ltr';
    }
  }, [language]);
  
  return (
    <body
      className={`${rubikClass} text-ma-black antialiased overflow-x-hidden w-full ${language === 'he' ? 'rtl' : 'ltr'}`}
      dir={language === 'he' ? 'rtl' : 'ltr'}
      lang={language}
    >
      <NagishLi />
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
      <div className="fixed bottom-16 right-6 z-50">
        <a
          href="https://linktr.ee/M.A_STUDIO_LINKS"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="כל הלינקים של MA TEAM"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#8BA888] shadow-lg hover:bg-[#6e8c6e] transition-colors duration-200 text-white text-2xl border-4 border-white"
          style={{ boxShadow: '0 4px 24px 0 rgba(139,168,136,0.25)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        </a>
      </div>
      <LegalCenter />
    </body>
  );
} 