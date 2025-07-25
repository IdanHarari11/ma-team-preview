'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage';

export default function BranchSelector() {
  const { t } = useLanguage();
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
        id: 'telaviv',
        name: t('branch.tlv.title'),
        address: t('branch.tlv.address').split('\n')[0],
        details: t('branch.tlv.address').split('\n')[1],
        phone: t('branch.tlv.phone'),
        whatsapp: t('branch.tlv.phone'),
        image: '/tlv-shipuz.webp',
        trainingTypes: t('branch.tlv.tags'),
        scheduleEmbed: 'https://gvjcxnmn.web.arboxapp.com/group?whitelabel=Arbox&amp;lang=he&amp;location=18873&amp;referrer=PLUGIN',
        priceListEmbed: ''
      }
    ],
    'ashdod': [
      {
        id: 'ashdod-functional',
        name: t('branch.ashdod2.title'),
        address: t('branch.ashdod2.address').split('\n')[0],
        details: t('branch.ashdod2.address').split('\n')[1],
        phone: t('branch.ashdod2.phone'),
        whatsapp: t('branch.ashdod2.phone'),
        image: '/functional-shipuz.webp',
        trainingTypes: t('branch.ashdod2.tags'),
        scheduleEmbed: 'https://aZTOzQDI.web.arboxapp.com/group?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN',
        priceListEmbed: 'https://aZTOzQDI.web.arboxapp.com/membership?whitelabel=Arbox&lang=he&location=8394&referrer=PLUGIN'
      },
      {
        id: 'ashdod-yoga',
        name: t('branch.ashdod1.title'),
        address: t('branch.ashdod1.address').split('\n')[0],
        details: t('branch.ashdod1.address').split('\n')[1],
        phone: t('branch.ashdod1.phone'),
        whatsapp: t('branch.ashdod1.phone'),
        image: '/ashdod-shipuz.webp',
        trainingTypes: t('branch.ashdod1.tags'),
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
    <section ref={ref} className="w-full py-16 bg-ma-light" id="branches">
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
              {t('branches.title')}
            </motion.h2>

            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="inline-flex p-1.5 rounded-full bg-gray-100 shadow-inner">
                {[{key: 'tel-aviv', label: t('branches.tab.telAviv')}, {key: 'ashdod', label: t('branches.tab.ashdod')}].map((city) => (
                  <button
                    key={city.key}
                    onClick={() => setSelectedCity(city.key as 'tel-aviv' | 'ashdod')}
                    className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCity === city.key 
                        ? 'text-white z-10' 
                        : 'text-ma-black/70 hover:text-ma-black'
                    }`}
                  >
                    {city.label}
                    {selectedCity === city.key && (
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
                    <div className="absolute inset-0 bg-gray-200 border border-gray-300">
                      <Image
                        src={branch.image}
                        alt={branch.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        unoptimized
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-white mb-2">{branch.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Array.isArray(branch.trainingTypes) ? branch.trainingTypes.map((type, index) => (
                            <span 
                              key={index} 
                              className="bg-ma-primary/90 px-3 py-1 rounded-full text-sm text-white"
                            >
                              {type}
                            </span>
                          )) : null}
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
                            <a
                              href={`https://wa.me/972${branch.whatsapp.replace(/^0/, '').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-green-500 transition-colors"
                              aria-label="שלח הודעת ווצאפ"
                            >
                              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                  <path d="M16 3C9.383 3 4 8.383 4 15c0 2.646.867 5.09 2.357 7.09L4 29l7.184-2.31C12.99 27.56 14.47 28 16 28c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 22c-1.37 0-2.71-.27-3.97-.8l-.28-.12-4.27 1.37 1.4-4.15-.18-.29C7.13 18.13 6.5 16.6 6.5 15c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5z" fill="#FFF"/>
                                  <path d="M20.13 18.63c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.62-1.54-.85-2.1-.22-.55-.45-.48-.62-.49-.16-.01-.34-.01-.53-.01-.19 0-.5.07-.76.36-.26.29-.99 1-1 2.44 0 1.44 1.05 2.83 1.2 3.03.15.2 2.08 3.09 5.04 4.22.7.3 1.25.48 1.68.62.71.23 1.36.2 1.87.12.57-.09 1.75-.7 2-1.37.25-.67.25-1.24.17-1.36-.08-.12-.29-.19-.6-.34z" fill="#25D366"/>
                                </g>
                              </svg>
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
                              <span>{t('branch.buttons.map')}</span>
                            </a>
                            <a
                              href="#contact"
                              className="bg-ma-primary hover:bg-ma-primary/90 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{t('branch.buttons.trial')}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6 border-b border-gray-200">
                      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                        {[{tab: 'schedule', label: t('branch.buttons.schedule')}, ...(branch.priceListEmbed ? [{tab: 'prices', label: t('branch.buttons.pricing')}] : [])].map((tabObj) => (
                          <button
                            key={tabObj.tab}
                            onClick={() => handleTabChange(branch.id, tabObj.tab as 'schedule' | 'prices')}
                            className={`
                              py-2.5 px-6 font-medium transition-all duration-300 relative flex items-center gap-2
                              rounded-t-lg shadow-sm border-t border-l border-r border-gray-200
                              ${branchActiveTab === tabObj.tab
                                ? 'bg-white text-ma-primary translate-y-0.5 shadow-md'
                                : 'text-ma-black/70 bg-gray-50 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md'
                              }
                            `}
                            aria-selected={branchActiveTab === tabObj.tab}
                            role="tab"
                          >
                            {tabObj.tab === 'schedule' && (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{t('branch.buttons.schedule')}</span>
                              </>
                            )}
                            {tabObj.tab === 'prices' && (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('branch.buttons.pricing')}</span>
                              </>
                            )}
                            {branchActiveTab === tabObj.tab && (
                              <motion.div
                                layoutId={`tabIndicator-${branch.id}`}
                                className="absolute bottom-0 left-0 right-0 h-1 bg-ma-primary"
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
                              <div className="bg-ma-primary text-white text-center text-sm px-3 py-1 rounded-full">מתעדכן אוטומטית</div>
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
                              <div className="bg-ma-primary text-white text-center text-sm px-3 py-1 rounded-full">מתעדכן אוטומטית</div>
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
              <span>{t('branches.contact.question')}:</span>
              <span className="font-medium">{t('branches.contact.email')}</span>
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