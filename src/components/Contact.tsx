'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <div ref={ref} className="w-full py-16" id="contact">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-8">
            צרו איתנו קשר
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            השאירו פרטים ונחזור אליכם בהקדם
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-ma-black/80 text-sm mb-2">שם מלא</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-ma-black/80 text-sm mb-2">טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-ma-black/80 text-sm mb-2">אימייל</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-ma-black/80 text-sm mb-2">הודעה</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-ma-gray/50 focus:outline-none focus:ring-2 focus:ring-ma-primary/30 focus:border-ma-primary/50"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#8BA888] text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
            >
              שליחה
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
} 