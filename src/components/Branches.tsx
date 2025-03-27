'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

type Branch = 'tel-aviv' | 'ashdod'

interface BranchInfo {
  id: Branch
  name: string
  address: string
  phone: string
  openingHours: {
    days: string
    hours: string
  }[]
  features: string[]
  mapUrl: string
  imageSrc: string
}

export default function Branches() {
  const [activeBranch, setActiveBranch] = useState<Branch>('tel-aviv')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const branches: BranchInfo[] = [
    {
      id: 'tel-aviv',
      name: 'תל אביב',
      address: 'רחוב הברזל 30, תל אביב',
      phone: '03-1234567',
      openingHours: [
        { days: 'ראשון - חמישי', hours: '06:00 - 22:00' },
        { days: 'שישי', hours: '08:00 - 16:00' },
        { days: 'שבת', hours: '09:00 - 13:00' }
      ],
      features: [
        'סטודיו מאובזר במיטב הציוד המקצועי',
        'מדריכים מנוסים ומוסמכים',
        'חדרי שירותים ומקלחות מרווחים',
        'חנייה חינם ללקוחות',
        'אווירה ביתית וחמה'
      ],
      mapUrl: 'https://maps.google.com/?q=הברזל+30+תל+אביב',
      imageSrc: '/images/about-main.jpg'
    },
    {
      id: 'ashdod',
      name: 'אשדוד',
      address: 'רחוב האורגים 15, אשדוד',
      phone: '08-9876543',
      openingHours: [
        { days: 'ראשון - חמישי', hours: '07:00 - 22:00' },
        { days: 'שישי', hours: '08:00 - 15:00' },
        { days: 'שבת', hours: 'סגור' }
      ],
      features: [
        'סטודיו מאובזר במיטב הציוד המקצועי',
        'אזור אימון פונקציונלי',
        'מדריכים מנוסים ומוסמכים',
        'חדרי שירותים ומקלחות מרווחים',
        'חנייה חינם בשפע'
      ],
      mapUrl: 'https://maps.google.com/?q=האורגים+15+אשדוד',
      imageSrc: '/images/about-main.jpg'
    }
  ]
  
  const currentBranch = branches.find(branch => branch.id === activeBranch) || branches[0]
  
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
    <div ref={ref} className="w-full py-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto"
      >
        {/* Branch selector tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12 relative">
          <div className="inline-flex p-1.5 rounded-full shadow-inner bg-ma-gray/30">
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(branch.id)}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeBranch === branch.id 
                    ? 'text-ma-black bg-white shadow-lg transform scale-105' 
                    : 'text-ma-black/60 hover:text-ma-black'
                }`}
              >
                {branch.name}
                {activeBranch === branch.id && (
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
        
        {/* Branch info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Branch image */}
          <motion.div
            variants={itemVariants}
            className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white p-2"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src={currentBranch.imageSrc}
                alt={`סניף ${currentBranch.name}`}
                fill
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <a
              href={currentBranch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center text-ma-black hover:bg-white transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>מפה</span>
            </a>
          </motion.div>
          
          {/* Branch details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg overflow-hidden">
              <h3 className="text-2xl font-bold text-ma-black mb-1">{currentBranch.name}</h3>
              <p className="text-ma-black/70 mb-4">{currentBranch.address}</p>
              
              <hr className="border-ma-gray/50 my-4" />
              
              <h4 className="font-semibold text-ma-black mb-3">שעות פעילות</h4>
              <ul className="space-y-2 mb-4">
                {currentBranch.openingHours.map((item, index) => (
                  <li key={index} className="flex justify-between text-ma-black/80">
                    <span>{item.days}</span>
                    <span className="font-medium">{item.hours}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center">
                <a 
                  href={`tel:${currentBranch.phone}`}
                  className="flex items-center text-ma-primary hover:text-ma-primary/80 transition"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{currentBranch.phone}</span>
                </a>
                
                <Link 
                  href="#contact" 
                  className="bg-ma-black/10 text-ma-black/80 px-4 py-2 rounded-full hover:bg-ma-black/20 transition"
                >
                  צור קשר
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h4 className="font-semibold text-ma-black mb-4">מה בסניף?</h4>
              <ul className="space-y-3">
                {currentBranch.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-2 p-1 bg-ma-primary/10 rounded-full">
                      <svg className="w-3 h-3 text-ma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-ma-black/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 