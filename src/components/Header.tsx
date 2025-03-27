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
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Handle menu item click - close mobile menu
  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/80 backdrop-blur-md shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-10 transition-transform hover:scale-105">
          <Image 
            src={isScrolled ? "/images/logo.png" : "/images/logo-white.png"} 
            alt="MA TEAM" 
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link 
            href="#about"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            אודות
          </Link>
          <Link 
            href="#training-types"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            סוגי אימונים
          </Link>
          <Link 
            href="#branches"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            הסניפים שלנו
          </Link>
          <Link 
            href="#schedule"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            לוח שיעורים
          </Link>
          <Link 
            href="#testimonials"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            המלצות
          </Link>
          <Link 
            href="#contact"
            className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-ma-black hover:text-ma-primary' : 'text-white hover:text-ma-primary'
            }`}
          >
            צור קשר
          </Link>
          <a 
            href="https://app.arboxapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-4 rounded-xl ${
              isScrolled 
                ? 'bg-ma-primary text-white shadow-lg' 
                : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
            } font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            רכישת מנוי
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-10 p-2 transition-all duration-300 hover:scale-110"
          aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
        >
          <div className={`w-6 h-0.5 ${isScrolled ? 'bg-ma-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 ${isScrolled ? 'bg-ma-black' : 'bg-white'} transition-all duration-300 mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 ${isScrolled ? 'bg-ma-black' : 'bg-white'} transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-0 bg-white/80 z-0 flex flex-col items-center justify-center pt-20"
            >
              <nav className="flex flex-col items-center space-y-6 text-center">
                <Link
                  href="#about"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  אודות
                </Link>
                <Link
                  href="#training-types"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  סוגי אימונים
                </Link>
                <Link
                  href="#branches"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  הסניפים שלנו
                </Link>
                <Link
                  href="#schedule"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  לוח שיעורים
                </Link>
                <Link
                  href="#testimonials"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  המלצות
                </Link>
                <Link
                  href="#contact"
                  onClick={handleMenuItemClick}
                  className="text-lg font-medium text-ma-black hover:text-ma-primary transition-all duration-300 hover:scale-110"
                >
                  צור קשר
                </Link>
                <a
                  href="https://app.arboxapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-8 rounded-xl bg-ma-primary text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  רכישת מנוי
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 