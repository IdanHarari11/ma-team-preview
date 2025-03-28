'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
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
    <div ref={ref} className="w-full py-16 bg-[#F5F2EA]" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold text-ma-black text-center mb-12"
          >
            הלקוחות מדברים
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-white/50 transition-colors"
                >
                  <span className="text-lg font-medium text-ma-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
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
                      ? 'max-h-48 py-4 opacity-100'
                      : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="text-ma-black/80">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 