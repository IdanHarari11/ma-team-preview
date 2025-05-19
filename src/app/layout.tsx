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
      <body className={`${rubik.className} ${rubik.variable} bg-ma-light text-ma-black antialiased`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <div className="fixed bottom-6 left-6 z-50">
          <a
            href="https://linktr.ee/M.A_STUDIO_LINKS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="כל הלינקים של MA TEAM"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#8BA888] shadow-lg hover:bg-[#6e8c6e] transition-colors duration-200 text-white text-2xl border-4 border-white"
            style={{ boxShadow: '0 4px 24px 0 rgba(139,168,136,0.25)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
