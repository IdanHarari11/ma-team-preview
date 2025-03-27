'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: '',
    trainingType: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
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
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ma-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-ma-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-ma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 text-white">תודה על הרשמתך!</h3>
          <p className="text-white/80 mb-8">
            פרטיך התקבלו בהצלחה. נציג יצור איתך קשר בהקדם כדי לתאם שיעור ניסיון.
          </p>
          
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-white/10 text-white rounded-full border border-white/30 transition-all hover:bg-white/20 hover:shadow-lg"
          >
            חזרה לטופס
          </button>
        </div>
      </motion.div>
    )
  }
  
  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-8 md:p-10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-ma-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2 text-white text-center">הרשמה לשיעור ניסיון</motion.h2>
        <motion.p variants={itemVariants} className="text-white/80 mb-8 text-center">השאירו פרטים ונחזור אליכם בהקדם</motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={itemVariants}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם מלא *"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="טלפון *"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="אימייל"
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white/90 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "left 1rem center", backgroundSize: "1.5rem" }}
            >
              <option value="" className="bg-ma-black text-white">בחר/י סניף</option>
              <option value="tel-aviv" className="bg-ma-black text-white">תל אביב</option>
              <option value="ashdod" className="bg-ma-black text-white">אשדוד</option>
            </select>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-2">
            <select
              name="trainingType"
              value={formData.trainingType}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white/90 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "left 1rem center", backgroundSize: "1.5rem" }}
            >
              <option value="" className="bg-ma-black text-white">סוג אימון מועדף</option>
              <option value="pilates" className="bg-ma-black text-white">פילאטיס</option>
              <option value="yoga" className="bg-ma-black text-white">יוגה</option>
              <option value="functional" className="bg-ma-black text-white">אימון פונקציונלי</option>
            </select>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="הערות נוספות"
              rows={4}
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/50 focus:border-transparent backdrop-blur-sm resize-none"
            ></textarea>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 py-4 bg-ma-primary/80 text-white rounded-xl backdrop-blur-sm shadow-lg transition-all hover:bg-ma-primary hover:shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>בתהליך...</span>
              </div>
            ) : (
              <span>השאירו פרטים</span>
            )}
          </button>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-white/50 text-center text-sm mt-4">
          * שדות חובה
        </motion.p>
      </div>
    </motion.form>
  )
} 