'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0])
  
  const stats: Stat[] = [
    { value: 8, label: 'שנות ניסיון', prefix: '+' },
    { value: 5000, label: 'מתאמנים מרוצים', prefix: '+' },
    { value: 98, label: 'שביעות רצון', suffix: '%' },
    { value: 24, label: 'מאמנים מוסמכים' }
  ]
  
  useEffect(() => {
    if (isInView) {
      // Set up counters for each stat
      stats.forEach((stat, index) => {
        const duration = 2000 // 2 seconds
        const frameDuration = 1000 / 60 // 60fps
        const totalFrames = Math.round(duration / frameDuration)
        let frame = 0
        
        const counter = setInterval(() => {
          frame++
          // Easing calculation: easeOutExpo
          const progress = 1 - Math.pow(2, -10 * frame / totalFrames)
          const currentCount = Math.floor(progress * stat.value)
          
          if (frame === totalFrames) {
            clearInterval(counter)
            setCounts(prevCounts => {
              const newCounts = [...prevCounts]
              newCounts[index] = stat.value
              return newCounts
            })
          } else {
            setCounts(prevCounts => {
              const newCounts = [...prevCounts]
              newCounts[index] = currentCount
              return newCounts
            })
          }
        }, frameDuration)
      })
    }
  }, [isInView, stats])
  
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
    <div ref={ref} className="w-full py-16 bg-gradient-to-b from-ma-gray/10 to-transparent">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            ה-MA TEAM במספרים
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            הסטודיו של MA TEAM הוא אחד הסטודיואים המובילים בארץ לפילאטיס, יוגה ואימון פונקציונלי
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-2xl shadow-lg"
            >
              <div className="flex justify-center mb-2">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ma-primary to-ma-primary/70 bg-clip-text text-transparent">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {counts[index].toLocaleString()}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </span>
              </div>
              <p className="text-ma-black/70 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <a 
            href="#schedule"
            className="inline-flex items-center px-6 py-3 bg-white text-ma-black rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-ma-gray/10 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            בדקו את לוח הזמנים
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 