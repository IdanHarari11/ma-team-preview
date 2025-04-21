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
        <WhatsAppCircle />
        <NagishLi />
      </body>
    </html>
  );
}
