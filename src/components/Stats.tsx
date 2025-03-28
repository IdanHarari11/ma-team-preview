'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
      id: 1,
      value: '3+',
      label: 'שנות ניסיון',
      href: '#about',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      value: '100%',
      label: 'שביעות רצון',
      href: '#testimonials',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      id: 3,
      value: '480+',
      label: 'מתאמנים',
      href: '#branches',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 4,
      value: '10+',
      label: 'מאמנים מוסמכים',
      href: '#team',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
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
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            נתונים עלינו
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.a
              key={stat.id}
              href={stat.href}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-ma-primary/10 text-ma-primary flex items-center justify-center group-hover:bg-ma-primary group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-ma-primary">{stat.value}</div>
                <div className="text-ma-black/70 text-sm font-medium">{stat.label}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 