import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppCircle from "@/components/WhatsAppCircle";
import NagishLi from '@/components/ui/NagishLi';
import { LanguageProvider } from "@/context/LanguageProvider";
import ClientRoot from './ClientRoot';

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MA TEAM - סטודיו לפילאטיס, יוגה ואימון פונקציונלי",
  description: "סטודיו MA TEAM מציע חוויית אימון אישית של פילאטיס, יוגה ואימון פונקציונלי באווירה משפחתית ומקצועית עם מדריכים מנוסים.",
  keywords: "פילאטיס, יוגה, אימון פונקציונלי, תל אביב, אשדוד, סטודיו, כושר, בריאות, סטודיו לפילאטיס",
  icons: {
    icon: [
      { url: '/images/ma-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/ma-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/ma-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/ma-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth">
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/ma-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/ma-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/ma-logo.png" />
        <link rel="shortcut icon" href="/images/ma-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileImage" content="/images/ma-logo.png" />
        <meta name="msapplication-TileColor" content="#8BA888" />
        <meta name="theme-color" content="#8BA888" />
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
      <LanguageProvider>
        <ClientRoot rubikClass={`${rubik.className} ${rubik.variable}`}>{children}</ClientRoot>
      </LanguageProvider>
    </html>
  );
}
