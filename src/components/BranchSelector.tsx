'use client'

import { useState, useRef } from 'react'
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
  hours: { day: string; hours: string }[]
  photos: string[]
  videoSrc?: string
  arboxLink: string
}

export default function BranchSelector() {
  const [activeBranch, setActiveBranch] = useState<Branch>('tel-aviv')
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const branches: BranchInfo[] = [
    {
      id: 'tel-aviv',
      name: 'תל אביב',
      address: 'רחוב הברזל 30, רמת החייל, תל אביב',
      phone: '03-1234567',
      mapUrl: 'https://maps.google.com/?q=הברזל+30+תל+אביב',
      trainingTypes: ['פילאטיס מכשירים', 'פילאטיס מזרן', 'יוגה', 'אימון פונקציונלי'],
      hours: [
        { day: 'ראשון - חמישי', hours: '06:00 - 22:00' },
        { day: 'שישי', hours: '08:00 - 16:00' },
        { day: 'שבת', hours: '09:00 - 13:00' }
      ],
      photos: [
        '/images/about-main.jpg',
        '/images/about-main.jpg',
        '/images/about-main.jpg',
      ],
      videoSrc: '/videos/hero-background.mp4',
      arboxLink: 'https://app.arboxapp.com/'
    },
    {
      id: 'ashdod',
      name: 'אשדוד',
      address: 'רחוב האורגים 15, אשדוד',
      phone: '08-9876543',
      mapUrl: 'https://maps.google.com/?q=האורגים+15+אשדוד',
      trainingTypes: ['פילאטיס מזרן', 'יוגה', 'אימון פונקציונלי'],
      hours: [
        { day: 'ראשון - חמישי', hours: '07:00 - 22:00' },
        { day: 'שישי', hours: '08:00 - 15:00' },
        { day: 'שבת', hours: 'סגור' }
      ],
      photos: [
        '/images/about-main.jpg',
        '/images/about-main.jpg',
        '/images/about-main.jpg',
      ],
      videoSrc: '/videos/hero-background.mp4',
      arboxLink: 'https://app.arboxapp.com/'
    }
  ]
  
  const currentBranch = branches.find(branch => branch.id === activeBranch) || branches[0]
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally submit the form to your backend
    console.log('Form submitted:', formData)
    alert('תודה שפנית אלינו! נציג יחזור אליך בהקדם.')
    setFormData({ name: '', phone: '', email: '', message: '' })
    setShowContactForm(false)
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
    <div ref={ref} className="w-full py-16 bg-gradient-to-b from-ma-gray/10 to-transparent" id="branch-selector">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            הסניפים שלנו
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            בחרו סניף כדי לראות פרטים, תמונות ומידע על שעות הפעילות
          </p>
        </motion.div>
        
        {/* Branch selector tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full shadow-inner bg-ma-gray/30">
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => {
                  setActiveBranch(branch.id)
                  setActivePhotoIndex(0)
                }}
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
        
        {/* Media gallery */}
        <motion.div 
          key={`${currentBranch.id}-gallery`}
          variants={itemVariants}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl mb-8"
        >
          {currentBranch.videoSrc && activePhotoIndex === 0 ? (
            <video
              src={currentBranch.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              poster={currentBranch.photos[0]}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={currentBranch.photos[activePhotoIndex]}
              alt={`סניף ${currentBranch.name}`}
              fill
              className="object-cover"
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-ma-black/70 via-transparent to-transparent" />
          
          {/* Branch name */}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
            <h3 className="text-lg font-semibold text-ma-black">סניף {currentBranch.name}</h3>
          </div>
          
          {/* Contact button */}
          <div className="absolute bottom-6 right-6 flex flex-col sm:flex-row gap-3">
            <a
              href={currentBranch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-white/90 backdrop-blur-sm text-ma-black rounded-full font-medium shadow-lg hover:bg-white transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              נווט לסניף
            </a>
            
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="inline-flex items-center px-5 py-2.5 bg-ma-primary text-white rounded-full font-medium shadow-lg hover:bg-ma-primary/90 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {showContactForm ? 'סגור טופס' : 'השאירו פרטים'}
            </button>
          </div>
          
          {/* Thumbnail selectors */}
          <div className="absolute bottom-6 left-6 flex space-x-2 space-x-reverse">
            {currentBranch.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`w-12 h-8 rounded-md overflow-hidden border-2 transition ${
                  activePhotoIndex === index ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image 
                  src={photo} 
                  alt="" 
                  width={48} 
                  height={32} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Branch details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-xl font-semibold text-ma-black mb-4">פרטי הסניף</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-1 p-1 text-ma-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-ma-black/80">{currentBranch.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-1 p-1 text-ma-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <a href={`tel:${currentBranch.phone}`} className="text-ma-black/80 hover:text-ma-primary transition-colors">
                      {currentBranch.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-xl font-semibold text-ma-black mb-4">סוגי אימונים</h4>
              <div className="flex flex-wrap gap-2">
                {currentBranch.trainingTypes.map((type, index) => (
                  <span key={index} className="px-3 py-1.5 bg-ma-gray/30 text-ma-black/80 rounded-full text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-xl font-semibold text-ma-black mb-4">שעות פעילות</h4>
              <div className="space-y-3">
                {currentBranch.hours.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-ma-black/80">{item.day}</span>
                    <span className="font-medium text-ma-black">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Contact form */}
          <motion.div variants={itemVariants}>
            {showContactForm ? (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h4 className="text-xl font-semibold text-ma-black mb-4">השאירו פרטים ונחזור אליכם</h4>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-ma-black/80 text-sm mb-1">שם מלא</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-ma-black/80 text-sm mb-1">טלפון</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-ma-black/80 text-sm mb-1">אימייל</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-ma-black/80 text-sm mb-1">הודעה</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-ma-primary text-white rounded-xl font-medium shadow-lg hover:bg-ma-primary/90 transition-all"
                  >
                    שליחה
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-xl font-semibold text-ma-black mb-4">הרשמה לשיעור</h4>
                  <p className="text-ma-black/80 mb-6">
                    הרשמו לשיעור נסיון או רכשו מנוי למגוון האימונים בסניף {currentBranch.name}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#schedule"
                      className="text-center flex-1 px-4 py-3 bg-ma-gray/30 text-ma-black rounded-xl font-medium hover:bg-ma-gray/50 transition-all"
                    >
                      לוח שיעורים
                    </a>
                    
                    <a
                      href={currentBranch.arboxLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center flex-1 px-4 py-3 bg-ma-primary text-white rounded-xl font-medium shadow-lg hover:bg-ma-primary/90 transition-all"
                    >
                      רכישת מנוי
                    </a>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-xl font-semibold text-ma-black mb-4">גלריית הסניף</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {currentBranch.photos.map((photo, index) => (
                      <div 
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setActivePhotoIndex(index)}
                      >
                        <Image 
                          src={photo} 
                          alt="" 
                          width={150} 
                          height={150}
                          className="w-full h-full object-cover transition hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 