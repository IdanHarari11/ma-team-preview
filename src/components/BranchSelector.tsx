'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BranchSelector() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedCity, setSelectedCity] = useState<'tel-aviv' | 'ashdod'>('tel-aviv')
  const [activeBranchTab, setActiveBranchTab] = useState<Record<string, 'schedule' | 'prices'>>({})

  // הטיפול בטאבים לכל סניף בנפרד
  const handleTabChange = (branchId: string, tab: 'schedule' | 'prices') => {
    setActiveBranchTab(prev => ({
      ...prev,
      [branchId]: tab
    }))
  }

  // קבלת הטאב הפעיל לסניף מסוים
  const getActiveBranchTab = (branchId: string): 'schedule' | 'prices' => {
    return activeBranchTab[branchId] || 'schedule'
  }

  const branches = {
    'tel-aviv': [
      {
        id: 'telaviv-pilates',
        name: 'סטודיו פילאטיס ויוגה תל אביב',
        address: 'מקווה ישראל 4, תל אביב',
        details: '100 מטר מרוטשילד, צמוד לתחנת הרכבת הקלה "אלנבי"',
        phone: '050-9222062',
        image: '/images/classes/pilatis.jpeg',
        trainingTypes: [
          'פילאטיס מכשירים',
          'פילאטיס בר',
          'פילאטיס מזרן',
          'יוגה'
        ],
        scheduleEmbed: 'https://gvJCXnmN.web.arboxapp.com/group?whitelabel=Arbox&lang=he&location=18873&referrer=PLUGIN',
        priceListEmbed: 'https://gvJCXnmN.web.arboxapp.com/membership?whitelabel=Arbox&lang=he&location=18873&referrer=PLUGIN'
      }
    ],
    'ashdod': [
      {
        id: 'ashdod-functional',
        name: 'פונקציונלי אשדוד',
        address: 'רחוב היידן 3, אשדוד',
        details: 'בית קרקע, חניה בשפע ללא עלות',
        phone: '052-3139677',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        trainingTypes: [
          'אימון כוח פונקציונלי',
          'מוביליטי'
        ],
        scheduleEmbed: 'https://aZTOzQDI.web.arboxapp.com/group?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN',
        priceListEmbed: 'https://aZTOzQDI.web.arboxapp.com/membership?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN'
      },
      {
        id: 'ashdod-pilates',
        name: 'פילאטיס ויוגה אשדוד',
        address: 'רחוב התאנה, אשדוד',
        details: 'בית קרקע, חנייה ללא עלות בבית קפה דוגה/פארינו והסביבה - לא בתוך הרחוב',
        phone: '052-3139677',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
        trainingTypes: [
          'פילאטיס מכשירים',
          'פילאטיס מזרן',
          'יוגה',
          'מוביליטי'
        ],
        scheduleEmbed: 'https://aZTOzQDI.web.arboxapp.com/group?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN',
        priceListEmbed: 'https://aZTOzQDI.web.arboxapp.com/membership?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN'
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
              <div className="inline-flex p-1.5 rounded-full bg-gray-100 shadow-inner">
                {['tel-aviv', 'ashdod'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city as 'tel-aviv' | 'ashdod')}
                    className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCity === city 
                        ? 'text-white z-10' 
                        : 'text-ma-black/70 hover:text-ma-black'
                    }`}
                  >
                    {city === 'tel-aviv' ? 'תל אביב' : 'אשדוד'}
                    {selectedCity === city && (
                      <motion.div
                        layoutId="cityIndicator"
                        className="absolute inset-0 bg-ma-primary rounded-full -z-10 shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className={`grid gap-8 ${selectedCity === 'tel-aviv' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {branches[selectedCity].map((branch) => {
              // קבלת הטאב הפעיל לסניף הנוכחי
              const branchActiveTab = getActiveBranchTab(branch.id);
              
              return (
                <motion.div
                  key={branch.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-[750px] overflow-hidden">
                    <Image
                      src={branch.image}
                      alt={branch.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">{branch.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {branch.trainingTypes.map((type, index) => (
                            <span 
                              key={index} 
                              className="bg-ma-primary/90 px-3 py-1 rounded-full text-sm text-white"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                        
                        <div className="space-y-3 text-white">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                              <p>{branch.address}</p>
                              <p className="text-sm text-white/70">{branch.details}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${branch.phone}`} className="text-white hover:text-ma-primary transition-colors">
                              {branch.phone}
                            </a>
                          </div>
                          
                          {/* <div className="pt-2">
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>שיעור ניסיון ראשון: ₪50 בלבד</span>
                              </li>
                            </ul>
                          </div> */}
                          
                          <div className="pt-3 flex flex-wrap gap-2">
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              <span>מפה</span>
                            </a>
                            <a
                              href="#contact"
                              className="bg-ma-primary hover:bg-ma-primary/90 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>שיעור ניסיון</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6 border-b border-gray-200">
                      <div className="flex justify-between">
                        {['schedule', 'prices'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => handleTabChange(branch.id, tab as 'schedule' | 'prices')}
                            className={`pb-3 px-2 font-medium transition-all relative ${
                              branchActiveTab === tab
                                ? 'text-ma-primary'
                                : 'text-ma-black/60 hover:text-ma-black'
                            }`}
                          >
                            {tab === 'schedule' && 'לו״ז שיעורים'}
                            {tab === 'prices' && 'מחירון'}
                            {branchActiveTab === tab && (
                              <motion.div
                                layoutId={`tabIndicator-${branch.id}`}
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-ma-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {branchActiveTab === 'schedule' && (
                      <div className="relative h-[600px] overflow-hidden rounded-lg bg-ma-light/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl w-full h-full border border-ma-primary/20">
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="text-lg font-medium text-ma-black">לוח שיעורים - {branch.name}</h4>
                              <div className="bg-ma-primary text-white text-sm px-3 py-1 rounded-full">מתעדכן אוטומטית</div>
                            </div>
                            <iframe 
                              src={branch.scheduleEmbed}
                              width="100%" 
                              height="100%" 
                              className="border-0 w-full rounded-lg"
                              title={`לוח שיעורים - ${branch.name}`}
                              frameBorder="0"
                              loading="lazy"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    )}

                    {branchActiveTab === 'prices' && (
                      <div className="relative h-[600px] overflow-hidden rounded-lg bg-ma-light/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl w-full h-full border border-ma-primary/20">
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="text-lg font-medium text-ma-black">מחירון - {branch.name}</h4>
                              <div className="bg-ma-primary text-white text-sm px-3 py-1 rounded-full">מתעדכן אוטומטית</div>
                            </div>
                            <iframe 
                              src={branch.priceListEmbed}
                              width="100%" 
                              height="100%" 
                              className="border-0 w-full rounded-lg"
                              title={`מחירון - ${branch.name}`}
                              frameBorder="0"
                              loading="lazy"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center pt-6">
            <Link
              href="mailto:mafstudio3@gmail.com"
              className="flex items-center gap-2 text-ma-black/80 hover:text-ma-primary transition-colors"
            >
              <span>לשאלות ופרטים נוספים:</span>
              <span className="font-medium">mafstudio3@gmail.com</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 