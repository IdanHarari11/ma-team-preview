'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // פרלקסה ל-background
  const bgRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: bgRef })
  const y = useTransform(scrollY, [0, 400], [0, 80])

  const faqs = [
    {
      question: "כמה סניפים יש ל-M.A והיכן הם נמצאים?",
      answer: (
        <div>
          נכון להיום יש לנו שלושה סניפים פעילים:<br />
          <ul className="list-disc pr-4 mt-2 space-y-2">
            <li>
              <b>סניף אשדוד פילאטיס מכשירים, פילאטיס מזרן, יוגה ומוביליטי</b> (נמצא ברחוב התאנה, אשדוד)
              <a
                href="https://maps.google.com/?q=רחוב התאנה, אשדוד"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block bg-ma-primary text-white px-3 py-1 rounded-full text-xs hover:bg-ma-primary/80 transition-colors"
              >
                מפה
              </a>
            </li>
            <li>
              <b>סניף אשדוד כוח פונקציונלי</b> (נמצא ברחוב היידן, אשדוד)
              <a
                href="https://maps.google.com/?q=רחוב היידן, אשדוד"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block bg-ma-primary text-white px-3 py-1 rounded-full text-xs hover:bg-ma-primary/80 transition-colors"
              >
                מפה
              </a>
            </li>
            <li>
              <b>סניף תל אביב</b> – כולל פילאטיס מכשירים, פילאטיס מזרן ויוגה. (נמצא במקווה ישראל 4, תל אביב)
              <a
                href="https://maps.google.com/?q=מקווה ישראל 4, תל אביב"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block bg-ma-primary text-white px-3 py-1 rounded-full text-xs hover:bg-ma-primary/80 transition-colors"
              >
                מפה
              </a>
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "איך נרשמים לשיעור?",
      answer: (
        <span>
          אנחנו קודם כל משפחה – ולפני ההרשמה, חשוב לנו להכיר אתכם, להבין את הצרכים שלכם ולתכנן יחד את האימון שמתאים לכם.<br />
          לאחר ההיכרות, תהליך ההרשמה פשוט ומהיר – ניתן לרכוש כרטיסיית היכרות, שיעור ניסיון או להירשם ישירות למנוי או כרטיסייה לפי בחירתכם.<br />
          <a
            href="#contact"
            className="inline-block mt-2 bg-ma-primary text-white px-4 py-2 rounded-full font-medium hover:bg-ma-primary/80 transition-colors mr-2"
          >
            השאירו פרטים כאן
          </a>
          ונחזור אליכם עוד היום.
        </span>
      )
    },
    {
      question: "האם ניתן להגיע לשיעור ניסיון?",
      answer: "בוודאי. יש אפשרות לשיעור ניסיון בודד, או לרכוש כרטיסיית היכרות הכוללת שני שיעורים – כדי לחוות לעומק את הסטודיו, האווירה והצוות."
    },
    {
      question: "כמה משתתפים יש בכל שיעור?",
      answer: (
        <span>
          השיעורים מתקיימים בקבוצות קטנות ואינטימיות:<br />
          – באימוני כוח פונקציונליים: בין 3 ל-7 משתתפים<br />
          – בפילאטיס וביוגה: עד 8 משתתפים בשיעור<br />
          הדגש שלנו הוא על איכות, יחס אישי ודיוק מקצועי.
        </span>
      )
    },
    {
      question: "האם יש מנויים מוזלים?",
      answer: (
        <span>
          כן. בכל מנוי קיימת אפשרות להתחייב לתקופה ארוכה יותר (3, 6 או 12 חודשים) ולקבל הנחה של עד 25% מהמחיר הרגיל.<br />
          בנוסף, חיילים בשירות סדיר זכאים ל-10% הנחה קבועה.
        </span>
      )
    },
    {
      question: "האם יש מנוי משולב של אימוני כוח ופילאטיס?",
      answer: (
        <span>
          כן. בסניפי אשדוד בלבד ניתן להצטרף למנוי משולב שמאפשר להשתתף גם באימוני כוח פונקציונליים וגם בשיעורי פילאטיס – במחיר מוזל ושווה במיוחד.<br />
          כמו כן, ניתן לרכוש כרטיסיית היכרות הכוללת שני שיעורים בכל תחום.
        </span>
      )
    },
    {
      question: "האם צריך ניסיון קודם לפני שמצטרפים?",
      answer: (
        <span>
          ממש לא. בגלל שאנחנו סטודיו בוטיק עם קבוצות קטנות, אנחנו יודעים לקבל כל רמה – ממתחילים ועד מתקדמים – ולהתאים לכל אחד ואחת את הקצב, ההכוונה והיחס האישי.
        </span>
      )
    },
    {
      question: "מאיזה גיל אפשר להצטרף?",
      answer: (
        <span>
          האימונים הקבוצתיים מתאימים לגילאי 12 ומעלה.<br />
          אימונים אישיים ניתן להתחיל כבר מגיל 6. אנחנו מתאימים את סוג האימון לכל גיל ולפי הצרכים של כל מתאמן.
        </span>
      )
    },
    {
      question: "האם הסטודיו מתאים גם לגברים?",
      answer: (
        <span>
          בוודאי. הסטודיו פתוח לנשים ולגברים כאחד, ויש לנו מגוון רחב של מתאמנים ומתאמנות מכל הגילאים והרמות.
        </span>
      )
    },
    {
      question: "האם יש חניה באיזור?",
      answer: (
        <div>
          <b>סניף אשדוד פילאטיס מכשירים:</b> חנייה בשפע ללא עלות באזור הדוגה / פארינו (אסור לחנות ברחוב התאנה)<br />
          <b>סניף אשדוד כוח פונקציונלי:</b> חנייה בשפע ללא עלות, רק לא לחסום את כניסת הרחוב והכורכר<br />
          <b>בתל אביב:</b> תחנת רכבת הקלה "אלנבי" ממש על הכניסה לסטודיו, קיימת חניה בשפע כחול לבן וחניונים בתשלום בחלק משעות היום, ויש נגישות גבוהה לתחבורה ציבורית/קורקינט/אופניים.
        </div>
      )
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
            שאלות נפוצות – סטודיו M.A
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
                  <div className="text-ma-black/80 text-right">
                    {faq.answer}
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