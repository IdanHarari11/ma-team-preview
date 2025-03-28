'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ['hero', 'about', 'branches', 'schedule', 'testimonials', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      setActiveSection(currentSection || '')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'about', label: 'עלינו' },
    { id: 'branches', label: 'סניפים' },
    { id: 'schedule', label: 'לוח זמנים' },
    { id: 'testimonials', label: 'המלצות' },
    { id: 'contact', label: 'צור קשר' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="MA TEAM"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-lg font-medium transition-all relative group overflow-hidden ${
                  activeSection === item.id
                    ? 'bg-[#8BA888] text-white shadow-lg shadow-[#8BA888]/20'
                    : 'text-[#8BA888] hover:bg-[#8BA888]/10'
                }`}
                onClick={() => {
                  const section = document.getElementById(item.id)
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-50 blur-sm"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#8BA888] hover:bg-[#8BA888]/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="bg-white/95 backdrop-blur-md shadow-lg px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`block px-4 py-2 rounded-lg font-medium transition-all relative group overflow-hidden ${
                  activeSection === item.id
                    ? 'bg-[#8BA888] text-white shadow-lg shadow-[#8BA888]/20'
                    : 'text-[#8BA888] hover:bg-[#8BA888]/10'
                }`}
                onClick={() => {
                  setIsMenuOpen(false)
                  const section = document.getElementById(item.id)
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-50 blur-sm"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  )
} 