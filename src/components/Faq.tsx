'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '../hooks/useLanguage';

export default function Faq() {
  const { t } = useLanguage();
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // פרלקסה ל-background
  const bgRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: bgRef })
  const y = useTransform(scrollY, [0, 400], [0, 80])

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
    {
      question: t('faq.q7'),
      answer: t('faq.a7'),
    },
    {
      question: t('faq.q8'),
      answer: t('faq.a8'),
    },
    {
      question: t('faq.q9'),
      answer: t('faq.a9'),
    },
    {
      question: t('faq.q10'),
      answer: t('faq.a10'),
    },
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
    <div ref={ref} className="w-full py-16 relative overflow-hidden" id="faq">
      {/* רקע עם תמונה ואנימציה */}
      <motion.div
        ref={bgRef}
        style={{ y }}
        className="pointer-events-none select-none absolute left-0 right-0 top-[-120px] bottom-[-120px] w-full h-[calc(100%+240px)] z-0"
        aria-hidden="true"
      >
        <Image
          src={require('../../public/ashdod function/RASHTA-00244.jpg')}
          alt="רקע מגניב אשדוד"
          fill
          className="object-cover opacity-60"
          priority
          style={{objectPosition: 'center'}}
        />
        {/* overlay לבהירות רק על התוכן */}
      </motion.div>
      {/* overlay לבהירות רק על התוכן */}
      <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none z-10" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)'}} />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold text-[#8BA888] text-center mb-12"
          >
            {t('faq.title')}
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-ma-light rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-right transition-none"
                >
                  <span className="text-lg font-medium text-ma-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 py-4 opacity-100'
                      : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <div className="text-ma-black/80 text-right whitespace-pre-line">
                    {faq.answer.split('\n').map((line, lineIndex) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        // Bold text
                        const boldText = line.slice(2, -2);
                        return (
                          <div key={lineIndex} className="font-bold text-ma-black mb-2">
                            {boldText}
                          </div>
                        );
                      } else if (line.trim() === '') {
                        // Empty line for spacing
                        return <div key={lineIndex} className="h-2"></div>;
                      } else {
                        // Regular text
                        return (
                          <div key={lineIndex} className="mb-1">
                            {line}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 