'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  fullName: string
  phone: string
  email: string
  city: 'tel-aviv' | 'ashdod'
  studio: string
  trainingType: string
  message: string
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
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const studios = {
    'tel-aviv': [
      { id: 'telaviv', name: 'סניף תל אביב - המסגר 42' }
    ],
    'ashdod': [
      { id: 'ashdod-pilates', name: 'סטודיו פילאטיס ויוגה - האורגים 7' },
      { id: 'ashdod-functional', name: 'סטודיו פונקציונלי - האורגים 7' }
    ]
  }

  const trainingTypes = {
    'tel-aviv': ['פילאטיס מכשירים', 'פילאטיס מזרן', 'אימוני כושר אישיים', 'אימוני TRX', 'אימוני כושר קבוצתיים'],
    'ashdod-pilates': ['פילאטיס מכשירים', 'פילאטיס מזרן', 'יוגה'],
    'ashdod-functional': ['אימוני כושר אישיים', 'אימוני TRX', 'אימוני כושר קבוצתיים']
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
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
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      
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
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  }

  return (
    <section className="w-full py-16 bg-[#F5F2EA]" id="contact">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div 
            className="text-center"
            variants={titleVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
              צרו איתנו קשר
            </h2>
            <p className="text-ma-black/70">
              השאירו פרטים ונחזור אליכם בהקדם
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={formContainerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="fullName" className="block text-sm font-medium text-ma-black">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                  placeholder="הכניסו את שמכם המלא"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-ma-black">
                  טלפון
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                  placeholder="הכניסו מספר טלפון"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-ma-black">
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                  placeholder="הכניסו כתובת אימייל"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="city" className="block text-sm font-medium text-ma-black">
                  עיר
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                >
                  <option value="">בחרו עיר</option>
                  <option value="tel-aviv">תל אביב</option>
                  <option value="ashdod">אשדוד</option>
                </select>
              </motion.div>

              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="studio" className="block text-sm font-medium text-ma-black">
                  סטודיו
                </label>
                <select
                  id="studio"
                  name="studio"
                  required
                  value={formData.studio}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                >
                  <option value="">בחרו סטודיו</option>
                  {formData.city && studios[formData.city].map(studio => (
                    <option key={studio.id} value={studio.id}>
                      {studio.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="trainingType" className="block text-sm font-medium text-ma-black">
                  סוג אימון
                </label>
                <select
                  id="trainingType"
                  name="trainingType"
                  required
                  value={formData.trainingType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
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

            <motion.div className="space-y-2" variants={formItemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-ma-black">
                הודעה (אופציונלי)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-ma-primary focus:ring-2 focus:ring-ma-primary/20 transition-colors"
                placeholder="הוסיפו הודעה או בקשה מיוחדת"
              />
            </motion.div>

            <motion.div 
              className="flex justify-center"
              variants={formItemVariants}
            >
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 bg-ma-primary text-white rounded-xl font-medium shadow-lg shadow-ma-primary/20 hover:shadow-ma-primary/30 hover:bg-ma-primary/90 transition-all"
              >
                {isSubmitted ? 'ההודעה נשלחה בהצלחה!' : 'שליחה'}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
} 