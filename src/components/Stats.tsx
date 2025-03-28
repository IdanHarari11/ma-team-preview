'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<NodeJS.Timeout>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    startTimeRef.current = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTimeRef.current!) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        countRef.current = setTimeout(step, 1000 / 60)
      }
    }
    
    step()
    
    return () => {
      if (countRef.current) {
        clearTimeout(countRef.current)
      }
    }
  }, [end, duration])

  return <>{count}</>
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    {
      number: 3,
      suffix: '+',
      label: 'שנות ניסיון'
    },
    {
      number: 100,
      suffix: '%',
      label: 'שביעות רצון'
    },
    {
      number: 5,
      suffix: '+',
      label: 'מאמנים'
    },
    {
      number: 10,
      suffix: '+',
      label: 'מאמנים מוסמכים'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div ref={ref} className="w-full py-16 bg-[#F5F2EA]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-ma-black mb-12"
          >
            נתונים עלינו
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#8BA888] mb-2">
                  {isInView && (
                    <>
                      <CountUp end={stat.number} />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="text-ma-black/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-12"
          >
            <Link
              href="#schedule"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
            >
              <span>ללוח הזמנים</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 