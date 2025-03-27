'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

type Branch = 'tel-aviv' | 'ashdod'

interface BranchInfo {
  id: Branch
  name: string
  address: string
  phone: string
  mapUrl: string
  trainingTypes: string[]
  hours: { day: string, hours: string }[]
  photos: string[]
  description: string
}

interface AshdodStudio {
  id: 'pilates' | 'functional'
  name: string
  address: string
  phone: string
  mapUrl: string
  photos: string[]
}

export default function BranchSelector() {
  const [activeBranch, setActiveBranch] = useState<Branch>('tel-aviv')
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const branches: BranchInfo[] = [
    {
      id: 'tel-aviv',
      name: 'תל אביב',
      address: 'רחוב הברזל 30, תל אביב',
      phone: '03-1234567',
      mapUrl: 'https://maps.google.com/?q=הברזל+30+תל+אביב',
      trainingTypes: ['פילאטיס מכשירים', 'פילאטיס מזרן', 'יוגה', 'אימון פונקציונלי'],
      hours: [
        { day: 'ראשון - חמישי', hours: '06:00 - 22:00' },
        { day: 'שישי', hours: '08:00 - 16:00' },
        { day: 'שבת', hours: '09:00 - 13:00' }
      ],
      photos: [
        '/images/branch-tel-aviv-1.jpg',
        '/images/branch-tel-aviv-2.jpg',
        '/images/branch-tel-aviv-3.jpg'
      ],
      description: 'הסניף המרכזי שלנו בתל אביב'
    }
  ]

  const ashdodStudios: AshdodStudio[] = [
    {
      id: 'pilates',
      name: 'סטודיו פילאטיס ויוגה',
      address: 'רחוב האורגים 5, אשדוד',
      phone: '08-9876543',
      mapUrl: 'https://maps.google.com/?q=האורגים+5+אשדוד',
      photos: [
        '/images/branch-ashdod-1.jpg',
        '/images/branch-ashdod-2.jpg',
        '/images/branch-ashdod-3.jpg'
      ]
    },
    {
      id: 'functional',
      name: 'סטודיו פונקציונלי',
      address: 'רחוב האורגים 5, אשדוד',
      phone: '08-9876543',
      mapUrl: 'https://maps.google.com/?q=האורגים+5+אשדוד',
      photos: [
        '/images/branch-ashdod-1.jpg',
        '/images/branch-ashdod-2.jpg',
        '/images/branch-ashdod-3.jpg'
      ]
    }
  ]

  const branchFeatures = [
    'סטודיו מאובזר במיטב הציוד המקצועי',
    'מדריכים מנוסים ומוסמכים',
    'חדרי שירותים ומקלחות מרווחים',
    'חנייה חינם ללקוחות',
    'אווירה ביתית וחמה'
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setActivePhotoIndex(prev => 
          (prev + 1) % (activeBranch === 'tel-aviv' 
            ? branches[0].photos.length 
            : ashdodStudios[0].photos.length)
        )
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isAutoPlaying, activeBranch])

  const nextPhoto = () => {
    const photos = activeBranch === 'tel-aviv' 
      ? branches[0].photos 
      : ashdodStudios[0].photos
    setActivePhotoIndex(prev => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    const photos = activeBranch === 'tel-aviv' 
      ? branches[0].photos 
      : ashdodStudios[0].photos
    setActivePhotoIndex(prev => 
      prev === 0 ? photos.length - 1 : prev - 1
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div ref={ref} className="w-full py-16 bg-[#F5F2EA]" id="branches">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-8">
            הסניפים שלנו
          </h2>
        </motion.div>

        {/* Branch selector tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full shadow-inner bg-white/50">
            {['tel-aviv', 'ashdod'].map(branch => (
              <button
                key={branch}
                onClick={() => {
                  setActiveBranch(branch as Branch)
                  setActivePhotoIndex(0)
                }}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeBranch === branch 
                    ? 'text-ma-black bg-white shadow-lg transform scale-105' 
                    : 'text-ma-black/60 hover:text-ma-black'
                }`}
              >
                {branch === 'tel-aviv' ? 'תל אביב' : 'אשדוד'}
                {activeBranch === branch && (
                  <motion.div 
                    layoutId="branchIndicator"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Branch content */}
        <motion.div variants={itemVariants} className="space-y-8">
          {activeBranch === 'tel-aviv' ? (
            // Tel Aviv layout
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image section */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={branches[0].photos[activePhotoIndex]}
                  alt="סניף תל אביב"
                  fill
                  className="object-cover"
                />
                
                {/* Gallery controls */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevPhoto}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Photo indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {branches[0].photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activePhotoIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 p-4">
                  <a
                    href={branches[0].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
                  >
                    נווט אל הסניף
                  </a>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="px-6 py-3 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
                  >
                    לשיעור ניסיון
                  </button>
                </div>
              </div>

              {/* Info section */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-ma-black mb-6">
                    {branches[0].name}
                  </h3>
                  
                  <div className="space-y-4">
                    <p className="flex items-center text-ma-black/80">
                      <span className="ml-2">סוגי האימונים:</span>
                      {branches[0].trainingTypes.join(', ')}
                    </p>
                    
                    <p className="flex items-center text-ma-black/80">
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {branches[0].phone}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-ma-black mb-6">מה בסניף?</h3>
                  <ul className="space-y-4">
                    {branchFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-ma-black/80">
                        <svg className="w-5 h-5 ml-2 text-[#8BA888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Ashdod layout
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ashdodStudios.map((studio, index) => (
                <div key={studio.id} className="space-y-6">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={studio.photos[activePhotoIndex]}
                      alt={studio.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Gallery controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <button
                        onClick={prevPhoto}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Photo indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {studio.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActivePhotoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activePhotoIndex ? 'bg-white w-4' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 p-4">
                      <a
                        href={studio.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
                      >
                        נווט אל הסניף
                      </a>
                      <button
                        onClick={() => setShowContactForm(true)}
                        className="px-6 py-3 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
                      >
                        לשיעור ניסיון
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-ma-black mb-6">
                      {studio.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <p className="flex items-center text-ma-black/80">
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {studio.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Opening hours - below the image */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-ma-black mb-6">שעות פעילות</h3>
            <div className="space-y-4">
              {branches[0].hours.map((time, index) => (
                <div key={index} className="flex justify-between text-ma-black/80">
                  <span>{time.day}</span>
                  <span>{time.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 