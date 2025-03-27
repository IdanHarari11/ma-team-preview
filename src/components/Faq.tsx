'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface FaqItem {
  question: string
  answer: string
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const faqItems: FaqItem[] = [
    {
      question: "האם צריך ניסיון קודם באימוני פילאטיס?",
      answer: "לא, אין צורך בניסיון קודם. המדריכים שלנו מותאמים לכל רמות הניסיון, מתחילים ועד מתקדמים. בשיעור הראשון תקבלו הדרכה אישית והכוונה מותאמת לרמתכם."
    },
    {
      question: "כמה שיעורים בשבוע מומלץ לעשות?",
      answer: "אנו ממליצים על 2-3 אימונים בשבוע לתוצאות אופטימליות. עם זאת, גם אימון אחד בשבוע יביא לשיפור משמעותי בטווח הארוך. המדריכים שלנו ישמחו להתאים עבורכם תוכנית אימונים אישית המתאימה לצרכים ולמטרות שלכם."
    },
    {
      question: "האם האימונים מתאימים גם לאנשים עם בעיות גב?",
      answer: "בהחלט! פילאטיס נחשב לאחת השיטות המומלצות ביותר לחיזוק שרירי הליבה ושיפור יציבה, מה שמסייע במניעה וטיפול בכאבי גב. המדריכים שלנו מוסמכים ומנוסים בעבודה עם מתאמנים הסובלים מבעיות גב שונות, ויתאימו עבורכם תרגילים ספציפיים שמתאימים למצבכם."
    },
    {
      question: "מה ההבדל בין שיעורי סטודיו ושיעורים פרטיים?",
      answer: "בשיעורי סטודיו תתאמנו בקבוצה קטנה של עד 12 משתתפים, באווירה אנרגטית ומעודדת. בשיעורים פרטיים תקבלו תשומת לב אישית מלאה מהמדריך, תוכנית מותאמת לצרכים שלכם, וקצב התקדמות מותאם אישית. שיעורים פרטיים מומלצים במיוחד למתאמנים חדשים, אנשים הסובלים מפציעות, או למי שמעוניין להתקדם במהירות."
    },
    {
      question: "האם צריך להביא ציוד לאימון?",
      answer: "לא, הסטודיו מצויד בכל הציוד הדרוש לאימונים. אנו מספקים מזרנים, גלילים, כדורים, משקולות ואביזרי עזר נוספים. כל שעליכם להביא הוא בגדי אימון נוחים, בקבוק מים, ומגבת קטנה (אופציונלי)."
    },
    {
      question: "האם ניתן לבטל או לדחות שיעור?",
      answer: "כן, ניתן לבטל או לדחות שיעור עד 12 שעות לפני מועד השיעור ללא חיוב. ביטול בהתראה קצרה יותר עשוי להיות כרוך בחיוב מלא עבור השיעור. אנו מבינים שלפעמים יש אילוצים, ולכן במקרים חריגים נשמח לבחון כל מקרה לגופו."
    }
  ]
  
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
    <div ref={ref} className="w-full py-12 bg-gradient-to-br from-ma-gray/20 to-transparent">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">שאלות נפוצות</h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            כאן תוכלו למצוא תשובות לשאלות הנפוצות ביותר. אם לא מצאתם תשובה לשאלה שלכם, אל תהססו ליצור קשר.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
                openIndex === index ? 'shadow-xl' : 'hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-right"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-ma-black text-lg">{item.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-ma-gray/10 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg 
                    className="w-4 h-4 text-ma-black/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-ma-black/80 border-t border-ma-gray/10 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-ma-black/70 mb-4">יש לכם שאלה נוספת?</p>
          <a 
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-ma-primary text-white rounded-full font-medium shadow-lg shadow-ma-primary/20 hover:shadow-ma-primary/30 hover:bg-ma-primary/90 transition-all"
          >
            צרו קשר עכשיו
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 