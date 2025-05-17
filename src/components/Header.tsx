'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      // רק במסכים רחבים (דסקטופ) שנה את הסגנון בזמן גלילה
      const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
      if (!isMobile) {
      setIsScrolled(window.scrollY > 50)
      } else {
        setIsScrolled(false) // תמיד ישאר כמו בהתחלה במובייל
      }
    }
    
    // האזנה לשינוי גודל החלון
    const handleResize = () => {
      handleScroll();
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    // הפעל את בדיקת גודל המסך מיד בטעינה
    handleScroll()
    
    // נקה את האירועים בעת unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Handle menu item click - close mobile menu
  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }
  
  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/30 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-28 w-full">
        {/* Logo */}
        {isScrolled ? 
          <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-green.png"
            alt="MA TEAM"
            width={180}
            height={60}
            className="h-16 w-auto [filter:drop-shadow(0_0_3px_rgba(255,255,255,0.7))] transition-all duration-300"
            />
        </Link>
        :
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/ma-logo.png"
            alt="MA TEAM" 
            width={180}
            height={60}
            className="h-16 w-auto"
          />
        </Link>
        }
        {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 space-x-reverse">
          <Link 
            href="#about"
              className={`text-lg font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
              מי אנחנו
          </Link>
          <Link 
              href="#training"
              className={`text-lg font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            סוגי אימונים
          </Link>
          <Link 
            href="#branches"
              className={`text-lg font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            הסניפים שלנו
          </Link>
          <Link 
              href="#gallery"
              className={`text-lg font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
              גלריה
          </Link>
          <Link 
            href="#contact"
              className={`text-lg font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            צור קשר
          </Link>
          <a 
              href="#contact"
              className={`py-3 px-6 rounded-xl text-lg ${
              isScrolled 
                ? 'bg-ma-primary text-white shadow-lg' 
                : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
            } font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
              בואו נתחיל
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-10 p-2 transition-all duration-300 hover:scale-110"
          aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
        >
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 my-1.5 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 top-0 bg-white/90 z-0 flex flex-col items-center justify-center pt-28"
            >
                <nav className="flex flex-col items-center space-y-8 text-center">
                <Link
                  href="#about"
                  onClick={handleMenuItemClick}
                    className="text-xl font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                    מי אנחנו
                </Link>
                <Link
                    href="#training"
                  onClick={handleMenuItemClick}
                    className="text-xl font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  סוגי אימונים
                </Link>
                <Link
                  href="#branches"
                  onClick={handleMenuItemClick}
                    className="text-xl font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  הסניפים שלנו
                </Link>
                <Link
                    href="#gallery"
                  onClick={handleMenuItemClick}
                    className="text-xl font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                    גלריה
                </Link>
                <Link
                  href="#contact"
                  onClick={handleMenuItemClick}
                    className="text-xl font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  צור קשר
                </Link>
                <a
                    href="#contact"
                    className="py-3 px-10 rounded-xl bg-ma-primary text-white text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                    בואו נתחיל
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </header>
  )
} 