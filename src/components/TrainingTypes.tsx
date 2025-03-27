'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

type TrainingType = 'pilates' | 'yoga' | 'functional'

interface TrainingInfo {
  id: TrainingType
  title: string
  description: string
  benefits: string[]
  imageSrc: string
  videoSrc?: string
}

export default function TrainingTypes() {
  const [activeType, setActiveType] = useState<TrainingType>('pilates')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const trainingTypes: TrainingInfo[] = [
    {
      id: 'pilates',
      title: 'פילאטיס',
      description: 'פילאטיס הוא שיטת אימון המתמקדת בחיזוק שרירי הליבה, שיפור היציבה, והגמישות. האימונים מתבצעים על מזרן או באמצעות מכשירים ייעודיים, תוך הקפדה על תנועות מדויקות ושליטה בנשימה. בסטודיו MA TEAM אנו מציעים שיעורי פילאטיס מזרן ומכשירים בקבוצות קטנות או באימונים אישיים.',
      benefits: [
        'חיזוק שרירי הבטן, הגב והאגן',
        'שיפור היציבה והקלה בכאבי גב',
        'הגברת הגמישות והמודעות הגופנית',
        'עיצוב וחיטוב הגוף',
        'הפחתת מתח ושיפור איכות החיים'
      ],
      imageSrc: '/images/about-main.jpg',
      videoSrc: '/videos/hero-background.mp4'
    },
    {
      id: 'yoga',
      title: 'יוגה',
      description: 'יוגה היא שיטת אימון עתיקה המשלבת תנוחות גוף (אסאנות), נשימה ומדיטציה. האימון מסייע לשפר את הגמישות, לחזק את השרירים ולהפחית מתחים. בסטודיו שלנו אנו מציעים מגוון סגנונות יוגה המותאמים לכל רמות הניסיון, מתחילים ועד מתקדמים, באווירה תומכת ונעימה.',
      benefits: [
        'שיפור משמעותי בגמישות הגוף',
        'חיזוק שרירים והגברת היציבות',
        'הפחתת מתח ולחץ',
        'שיפור הריכוז והקשב',
        'איזון בין גוף לנפש'
      ],
      imageSrc: '/images/about-main.jpg',
      videoSrc: '/videos/hero-background.mp4'
    },
    {
      id: 'functional',
      title: 'אימון פונקציונלי',
      description: 'אימון פונקציונלי מבוסס על תנועות טבעיות המחקות פעולות יומיומיות. הדגש הוא על חיזוק הגוף באופן כוללני ושיפור היכולת התפקודית, תוך שימוש במשקל הגוף ובאביזרי אימון שונים. האימונים בסטודיו שלנו מותאמים אישית ליכולות ומטרות של כל מתאמן, ומשלבים אלמנטים של כוח, יציבות, קואורדינציה וסיבולת.',
      benefits: [
        'שיפור היכולת התפקודית בחיי היומיום',
        'חיזוק הגוף באופן מאוזן ואחיד',
        'שיפור הקואורדינציה והיציבות',
        'הגברת הסיבולת והכוח',
        'הפחתת הסיכון לפציעות'
      ],
      imageSrc: '/images/about-main.jpg',
      videoSrc: '/videos/hero-background.mp4'
    }
  ]
  
  const currentTraining = trainingTypes.find(type => type.id === activeType) || trainingTypes[0]
  
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
    <div ref={ref} className="w-full py-16" id="training-types">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            סוגי האימונים שלנו
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            בסטודיו MA TEAM אנחנו מציעים מגוון שיטות אימון, כל אחת עם היתרונות הייחודיים שלה
          </p>
        </motion.div>
        
        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="inline-flex bg-ma-gray/30 p-1.5 rounded-full">
            {trainingTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeType === type.id 
                    ? 'text-ma-black bg-white shadow-lg transform scale-105' 
                    : 'text-ma-black/60 hover:text-ma-black'
                }`}
              >
                {type.title}
                {activeType === type.id && (
                  <motion.div 
                    layoutId="trainingIndicator"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Training Type Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Video/Image */}
          <motion.div
            key={currentTraining.id}
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden h-[300px] md:h-[450px] shadow-xl"
          >
            {currentTraining.videoSrc ? (
              <video
                src={currentTraining.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={currentTraining.imageSrc}
                alt={currentTraining.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ma-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-2xl font-semibold mb-2">{currentTraining.title}</h3>
            </div>
          </motion.div>
          
          {/* Description & Benefits */}
          <motion.div 
            key={`${currentTraining.id}-info`}
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <p className="text-ma-black/80 mb-6 text-lg leading-relaxed">
              {currentTraining.description}
            </p>
            
            <h4 className="text-xl font-semibold text-ma-black mb-4">היתרונות העיקריים:</h4>
            <ul className="space-y-3">
              {currentTraining.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-2 p-1 bg-ma-primary/10 rounded-full">
                    <svg className="w-3 h-3 text-ma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-ma-black/80">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <a 
                href="#schedule"
                className="inline-flex items-center px-6 py-3 bg-ma-primary text-white rounded-full font-medium shadow-lg shadow-ma-primary/20 hover:shadow-ma-primary/30 hover:bg-ma-primary/90 transition-all"
              >
                צפו בלוח השיעורים
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 