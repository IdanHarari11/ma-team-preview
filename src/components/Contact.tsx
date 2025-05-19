'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

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
      { id: 'telaviv', name: 'סטודיו פילאטיס ויוגה תל אביב', address: 'מקווה ישראל 4, תל אביב', phone: '050-9222062', whatsapp: '050-9222062' }
    ],
    'ashdod': [
      { id: 'ashdod-pilates', name: 'סטודיו פילאטיס ויוגה', address: 'רחוב התאנה, אשדוד', phone: '052-3139677', whatsapp: '052-3139677' },
      { id: 'ashdod-functional', name: 'פונקציונלי אשדוד', address: 'רחוב היידן 3, אשדוד', phone: '052-3139677', whatsapp: '052-3139677' },
      { id: 'ashdod-combined', name: 'מנוי משולב סניפים', address: 'כל הסניפים באשדוד', phone: '052-3139677', whatsapp: '052-3139677' }
    ]
  }

  const trainingTypes = {
    'telaviv': ['פילאטיס מכשירים', 'פילאטיס בר', 'פילאטיס מזרן', 'יוגה'],
    'ashdod-pilates': ['פילאטיס מכשירים', 'פילאטיס מזרן', 'יוגה', 'מוביליטי/תנועה'],
    'ashdod-functional': ['אימון כח פונקציונלי', 'מוביליטי/תנועה'],
    'ashdod-combined': ['מנוי לכל סוגי האימונים בשני הסניפים']
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    // בדיקה שהשם אינו ריק
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'נא להזין שם מלא'
    }
    
    // בדיקת פורמט אימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה'
    }
    
    // בדיקת מספר טלפון - מספרים בלבד ואורך תקין
    const phoneRegex = /^0\d{8,9}$/ // מתחיל ב-0 ולאחריו 8-9 ספרות
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין (יש להזין מספר ישראלי תקין)'
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
        className="pointer-events-none select-none absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      >
        <Image
          src={require('../../public/galleryi tlv p y/RASHTA-08886.jpg')}
          alt="רקע מגניב תל אביב"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* שכבת overlay לבהירות */}
        <div className="absolute inset-0 bg-white/60 bg-gradient-to-b from-white/80 to-white/60" />
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
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
              רוצים להצטרף?
            </h2>
            <p className="text-ma-black/70 mx-auto">
              השאירו פרטים ונחזור אליכם מיד לתיאום שיעור ניסיון
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
              <h3 className="text-xl font-bold">מעולה! הפרטים נשלחו</h3>
              <p>נחזור אליך בהקדם כדי לתאם שיעור ניסיון</p>
              {formData.wantConsultation && <p className="font-medium">שיחת הייעוץ שביקשת תתואם בהקדם.</p>}
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              variants={formContainerVariants}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              {submitError && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                  <p className="font-medium">שגיאה בשליחת הטופס</p>
                  <p className="text-sm">{submitError}</p>
                </div>
              )}
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-ma-black">
                    שם מלא<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-ma-black">
                    טלפון<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-ma-black">
                    אימייל<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#8BA888] focus:ring-[#8BA888]/20'
                    } transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-ma-black">
                    עיר<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">בחרו עיר</option>
                    <option value="tel-aviv">תל אביב</option>
                    <option value="ashdod">אשדוד</option>
                  </select>
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="studio" className="block text-sm font-medium text-ma-black">
                    סטודיו<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="studio"
                    name="studio"
                    required
                    value={formData.studio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">בחרו סטודיו</option>
                    {formData.city && studios[formData.city].map(studio => (
                      <option key={studio.id} value={studio.id}>
                        {studio.name} - {studio.address}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label htmlFor="trainingType" className="block text-sm font-medium text-ma-black">
                    סוג אימון<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="trainingType"
                    name="trainingType"
                    required
                    value={formData.trainingType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-[#8BA888] focus:ring-2 focus:ring-[#8BA888]/20 transition-colors"
                  >
                    <option value="">בחרו סוג אימון</option>
                    {formData.studio && trainingTypes[formData.studio as keyof typeof trainingTypes]?.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div variants={formItemVariants} className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-ma-black mb-2">
                  הערות נוספות
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
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
                  אני מעוניין/ת בשיחת ייעוץ אישית חינם
                </label>
              </motion.div>

              <div className="border-t border-gray-200 pt-5 mt-6">
                <p className="text-xs text-gray-500 mb-4">
                  <span className="text-red-500">*</span> שדות חובה
                </p>
                <div className="flex justify-center">
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
                          שולח...
                        </span>
                      ) : (
                        'שליחה'
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
} 