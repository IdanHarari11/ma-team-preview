import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppCircle from "@/components/WhatsAppCircle";
import NagishLi from '@/components/ui/NagishLi';

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MA TEAM - סטודיו לפילאטיס, יוגה ואימון פונקציונלי",
  description: "סטודיו MA TEAM מציע חוויית אימון אישית של פילאטיס, יוגה ואימון פונקציונלי באווירה משפחתית ומקצועית עם מדריכים מנוסים.",
  keywords: "פילאטיס, יוגה, אימון פונקציונלי, תל אביב, אשדוד, סטודיו, כושר, בריאות, סטודיו לפילאטיס",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <head>
         {/* הגדרות בסיסיות עבור נגיש לי */}
         <script dangerouslySetInnerHTML={{ __html: `
           var nl_lang = 'he';
           var nl_pos = 'br';
           var nl_compact = '0';
           var nl_offset_right = '25';
           var nl_offset_bottom = '160';
           var nl_color = 'green';
           var nl_url = '';
           var nl_contact = '0543199489';
         `}} />
       </head>
      <body className={`${rubik.className} ${rubik.variable} text-ma-black antialiased`}>
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
      </body>
    </html>
  );
}
