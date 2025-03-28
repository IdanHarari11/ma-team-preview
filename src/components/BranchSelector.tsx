'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function BranchSelector() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedCity, setSelectedCity] = useState<'tel-aviv' | 'ashdod'>('tel-aviv')

  const branches = {
    'tel-aviv': [
      {
        id: 'telaviv',
        name: 'סניף תל אביב',
        address: 'רחוב המסגר 42, תל אביב',
        phone: '054-7454897',
        image: 'https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?q=80&w=1200',
        trainingTypes: [
          'אימוני כושר אישיים',
          'אימוני TRX',
          'פילאטיס מכשירים',
          'פילאטיס מזרן',
          'אימוני כושר קבוצתיים'
        ]
      }
    ],
    'ashdod': [
      {
        id: 'ashdod-pilates',
        name: 'סטודיו פילאטיס ויוגה',
        address: 'רחוב האורגים 7, אשדוד',
        phone: '054-7454897',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
        trainingTypes: [
          'פילאטיס מכשירים',
          'פילאטיס מזרן',
          'יוגה'
        ]
      },
      {
        id: 'ashdod-functional',
        name: 'סטודיו פונקציונלי',
        address: 'רחוב האורגים 7, אשדוד',
        phone: '054-7454897',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        trainingTypes: [
          'אימוני כושר אישיים',
          'אימוני TRX',
          'אימוני כושר קבוצתיים'
        ]
      }
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section ref={ref} className="w-full py-16 bg-white" id="branches">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <div className="text-center space-y-8">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-ma-black"
            >
              הסניפים שלנו
            </motion.h2>

            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="inline-flex p-1.5 rounded-full bg-gray-100">
                {['tel-aviv', 'ashdod'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city as 'tel-aviv' | 'ashdod')}
                    className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCity === city 
                        ? 'text-white' 
                        : 'text-ma-black/60 hover:text-ma-black'
                    }`}
                  >
                    {city === 'tel-aviv' ? 'תל אביב' : 'אשדוד'}
                    {selectedCity === city && (
                      <motion.div
                        layoutId="cityIndicator"
                        className="absolute inset-0 bg-ma-primary rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className={`grid gap-8 ${selectedCity === 'tel-aviv' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {branches[selectedCity].map((branch) => (
              <motion.div
                key={branch.id}
                variants={itemVariants}
                className={`relative rounded-2xl overflow-hidden group ${
                  selectedCity === 'tel-aviv' ? 'h-[600px]' : 'h-[500px]'
                }`}
              >
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-4">{branch.name}</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {branch.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {branch.phone}
                    </p>
                    <div className="pt-4">
                      <p className="font-medium mb-2">סוגי אימונים:</p>
                      <ul className="list-disc list-inside space-y-1 opacity-90">
                        {branch.trainingTypes.map((type, index) => (
                          <li key={index}>{type}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex pt-4">
                      <a
                        href="#contact"
                        className="bg-ma-primary hover:bg-ma-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        שיעור ניסיון
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 