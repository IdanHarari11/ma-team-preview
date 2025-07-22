'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage';

interface FormData {
  fullName: string
  phone: string
  email: string
  city: 'tel-aviv' | 'ashdod'
  studio: string
  trainingType: string
  message: string
  wantConsultation: boolean
}

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    city: 'tel-aviv',
    studio: '',
    trainingType: '',
    message: '',
    wantConsultation: false
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const studios = {
    'tel-aviv': [
      { id: 'telaviv', name: t('contact.studio.telaviv') }
    ],
    'ashdod': [
      { id: 'ashdodPilates', name: t('contact.studio.ashdodPilates') },
      { id: 'ashdodFunctional', name: t('contact.studio.ashdodFunctional') },
      { id: 'ashdodCombined', name: t('contact.studio.ashdodCombined') }
    ]
  }

  const trainingTypes = {
    'telaviv': [t('contact.trainingType.telaviv.0'), t('contact.trainingType.telaviv.1'), t('contact.trainingType.telaviv.2'), t('contact.trainingType.telaviv.3')],
    'ashdodPilates': [t('contact.trainingType.ashdodPilates.0'), t('contact.trainingType.ashdodPilates.1'), t('contact.trainingType.ashdodPilates.2'), t('contact.trainingType.ashdodPilates.3')],
    'ashdodFunctional': [t('contact.trainingType.ashdodFunctional.0'), t('contact.trainingType.ashdodFunctional.1')],
    'ashdodCombined': [t('contact.trainingType.ashdodCombined.0')]
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    // בדיקה שהשם אינו ריק
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('contact.error.fullName')
    }
    
    // בדיקת פורמט אימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.error.email')
    }
    
    // בדיקת מספר טלפון - מספרים בלבד ואורך תקין
    const phoneRegex = /^0\d{8,9}$/ // מתחיל ב-0 ולאחריו 8-9 ספרות
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('contact.error.phone')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // מציאת מידע הסטודיו
      const studioInfo = formData.city && formData.studio ? 
        studios[formData.city].find(s => s.id === formData.studio) : null
      
      // בניית אובייקט הנתונים לשליחה
      const emailData = {
        // פרטים בסיסיים
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        
        // פרטי פעילות
        city: formData.city === "tel-aviv" ? "תל אביב" : 
              formData.city === "ashdod" ? "אשדוד" : "",
        studio: studioInfo?.name || "",
        trainingType: formData.trainingType,
        
        // מיקום
        businessName: studioInfo?.name || '',
        businessLocation: studioInfo?.address || '',
        
        // פרטים נוספים
        wantConsultation: formData.wantConsultation,
        notes: formData.message || ""
      }

      // שליחת הנתונים ל-API
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'אירעה שגיאה בשליחת הטופס')
      }
      
      console.log('Form submitted successfully:', result)
      setIsSubmitted(true)
      
      // איפוס הטופס לאחר 5 שניות
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          city: 'tel-aviv',
          studio: '',
          trainingType: '',
          message: '',
          wantConsultation: false
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'אירעה שגיאה בשליחת הטופס')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => {
      const newData = { 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }
      
      // Reset dependent fields when city changes
      if (name === 'city') {
        newData.studio = ''
        newData.trainingType = ''
      }
      
      // Reset training type when studio changes
      if (name === 'studio') {
        newData.trainingType = ''
      }
      
      return newData
    })
    
    // נקה שגיאות בעת שינוי השדה
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 6px 15px rgba(139, 168, 136, 0.4)",
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.97
    }
  }

  // פרלקסה ל-background
  const bgRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: bgRef })
  const y = useTransform(scrollY, [0, 400], [0, 80])

  return (
    <section id="contact" className="py-16 md:py-24 bg-ma-light relative overflow-hidden">
      {/* רקע עם תמונה ואנימציה */}
      <motion.div
        ref={bgRef}
        style={{ y }}
        className="pointer-events-none select-none absolute left-0 right-0 top-[-120px] bottom-[-120px] w-full h-[calc(100%+240px)] z-0"
        aria-hidden="true"
      >
        <Image
          src={require('../../public/galleryi tlv p y/RASHTA-08886.jpg')}
          alt="רקע מגניב תל אביב"
          fill
          className="object-cover opacity-60"
          priority
          style={{objectPosition: 'center'}}
        />
        {/* overlay לבהירות רק על התוכן */}
      </motion.div>
      <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none z-10" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)'}} />
      <style jsx>{`
        @media (max-width: 640px) {
          .contact-mobile-fullwidth {
            max-width: 100vw !important;
            width: 100vw !important;
            margin: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            overflow-x: hidden !important;
          }
        }
      `}</style>
      <div className="container mx-auto px-2 sm:px-4 relative z-10 contact-mobile-fullwidth">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="text-center"
            variants={titleVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-2">
              {t('contact.title')}
            </h2>
            <p className="text-ma-black/70 mx-auto">
              {t('contact.desc')}
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 backdrop-blur-md border-2 border-green-200/50 text-green-700 p-8 rounded-3xl text-center space-y-4 shadow-xl shadow-green-100"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold">{t('contact.success.title')}</h3>
              <p>{t('contact.success.desc')}</p>
              {formData.wantConsultation && <p className="font-medium">{t('contact.success.consultation')}</p>}
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              variants={formContainerVariants}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              {submitError && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                  <p className="font-medium">{t('contact.error.submitTitle')}</p>
                  <p className="text-sm">{submitError || t('contact.error.submit')}</p>
                </div>
              )}
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.fullName')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('contact.placeholder.fullName')}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs">{t('contact.error.fullName')}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.phone')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.placeholder.phone')}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{t('contact.error.phone')}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.email')}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholder.email')}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{t('contact.error.email')}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.city')}<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">{t('contact.placeholder.city')}</option>
                    <option value="tel-aviv">{t('contact.city.telAviv')}</option>
                    <option value="ashdod">{t('contact.city.ashdod')}</option>
                  </select>
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="studio" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.studio')}<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="studio"
                    name="studio"
                    required
                    value={formData.studio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">{t('contact.placeholder.studio')}</option>
                    {formData.city && studios[formData.city].map(studio => (
                      <option key={studio.id} value={studio.id}>
                        {studio.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="trainingType" className="block text-sm font-medium text-ma-black">
                    {t('contact.label.trainingType')}<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="trainingType"
                    name="trainingType"
                    required
                    value={formData.trainingType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">{t('contact.placeholder.trainingType')}</option>
                    {formData.studio && trainingTypes[formData.studio as keyof typeof trainingTypes]?.map((type, idx) => (
                      <option key={type + idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div variants={formItemVariants} className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-ma-black mb-2">
                  {t('contact.label.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder={t('contact.placeholder.message')}
                  className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                ></textarea>
              </motion.div>

              <motion.div variants={formItemVariants} className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  id="wantConsultation"
                  name="wantConsultation"
                  checked={formData.wantConsultation}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8BA888] rounded-full border-gray-300 focus:ring-[#8BA888]/30"
                />
                <label htmlFor="wantConsultation" className="text-ma-black mr-2 text-sm">
                  {t('contact.label.wantConsultation')}
                </label>
              </motion.div>

              <div className="border-t border-gray-200 pt-5 mt-6">
                <p className="text-xs text-gray-500 mb-4">
                  <span className="text-red-500">*</span> {t('contact.label.required')}
                </p>
                <div className="flex flex-col gap-3 justify-center items-center mt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative px-10 py-3 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg shadow-[#8BA888]/20 hover:shadow-[#8BA888]/40 transition-all overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.button.sending')}
                        </span>
                      ) : (
                        t('contact.button.submit')
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                  <a
                    href="https://linktr.ee/M.A_STUDIO_LINKS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-10 py-3 border-2 border-[#8BA888] text-[#8BA888] rounded-xl font-medium text-center transition-all hover:bg-[#8BA888]/10 focus:outline-none"
                    style={{marginTop: '0.5rem'}}
                  >
                    {t('contact.button.sendMessage')}
                  </a>
                </div>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
} 