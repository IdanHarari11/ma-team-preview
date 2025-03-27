'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  
  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: '/images/icons/instagram.svg', url: 'https://instagram.com/' },
    { name: 'Facebook', icon: '/images/icons/facebook.svg', url: 'https://facebook.com/' },
    { name: 'WhatsApp', icon: '/images/icons/whatsapp.svg', url: 'https://wa.me/972123456789' },
  ]
  
  // Quick links
  const quickLinks = [
    { name: 'אודות', href: '#about' },
    { name: 'סוגי אימונים', href: '#training-types' },
    { name: 'הסניפים שלנו', href: '#branches' },
    { name: 'לוח שיעורים', href: '#schedule' },
    { name: 'שאלות נפוצות', href: '#faq' },
    { name: 'צור קשר', href: '#contact' },
  ]
  
  // Branch info
  const branches = [
    { name: 'תל אביב', address: 'רחוב הברזל 30, תל אביב', phone: '03-1234567' },
    { name: 'אשדוד', address: 'רחוב האורגים 15, אשדוד', phone: '08-9876543' },
  ]
  
  return (
    <footer className="bg-ma-black text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 - Logo and about */}
          <div>
            <Link href="/" className="block mb-6">
              <Image 
                src="/images/logo-white.png"
                alt="MA TEAM"
                width={140}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm mb-6">
              סטודיו MA TEAM מציע מגוון רחב של אימוני פילאטיס, יוגה ואימון פונקציונלי בהתאמה אישית ובאווירה משפחתית.
            </p>
            
            {/* Social media links */}
            <div className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/ma.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>עקבו אחרינו</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">קישורים מהירים</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center"
                  >
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">צור קשר</h3>
            <ul className="space-y-4">
              {branches.map((branch, index) => (
                <li key={index} className="mb-4">
                  <p className="font-medium mb-1">{branch.name}</p>
                  <p className="text-white/70 text-sm mb-1">{branch.address}</p>
                  <a 
                    href={`tel:${branch.phone}`}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center"
                  >
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {branch.phone}
                  </a>
                </li>
              ))}
              <li>
                <p className="font-medium mb-1">דוא"ל</p>
                <a 
                  href="mailto:info@mateam.co.il" 
                  className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center"
                >
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@mateam.co.il
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">הישארו מעודכנים</h3>
            <p className="text-white/70 text-sm mb-4">
              הירשמו לניוזלטר שלנו וקבלו עדכונים, מבצעים ותכנים מקצועיים
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="כתובת אימייל" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent" 
              />
              <button 
                type="submit" 
                className="bg-ma-primary text-white py-2 px-4 rounded-lg hover:bg-ma-primary/90 transition-colors"
              >
                הרשמה
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} MA TEAM. כל הזכויות שמורות.
          </p>
          
          <div className="flex items-center space-x-6 space-x-reverse">
            <Link href="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-sm transition-colors">
              תנאי שימוש
            </Link>
            <Link href="/accessibility" className="text-white/50 hover:text-white text-sm transition-colors">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 