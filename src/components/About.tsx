'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  bio: string
  imageSrc: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const teamMembers: TeamMember[] = [
    {
      name: 'מור אטיאס',
      role: 'מייסדת ומנהלת מקצועית',
      bio: 'מדריכת פילאטיס מוסמכת עם יותר מ-8 שנות ניסיון. בוגרת תואר ראשון בחינוך גופני ותעודת הוראה מטעם מכון וינגייט. התמחות בשיקום פציעות ספורט ובעיות יציבה.',
      imageSrc: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800',
      socialMedia: {
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/'
      }
    },
    {
      name: 'אריאל כהן',
      role: 'מדריך בכיר',
      bio: 'מדריך פילאטיס ויוגה בעל ניסיון של 6 שנים. בוגר קורס פילאטיס מכשירים ומזרן, וקורס מדריכי יוגה. מתמחה בשיפור יציבה ואיזון גוף-נפש.',
      imageSrc: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
      socialMedia: {
        instagram: 'https://www.instagram.com/'
      }
    },
    {
      name: 'שירה לוי',
      role: 'מדריכת פילאטיס ויוגה',
      bio: 'מדריכת פילאטיס מזרן ומכשירים, ומדריכת יוגה מוסמכת. בעלת 5 שנות ניסיון בהדרכה. מתמחה בעבודה עם נשים בהריון ולאחר לידה.',
      imageSrc: 'https://images.unsplash.com/photo-1597347343908-2937e7dcc560?q=80&w=800',
      socialMedia: {
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/'
      }
    }
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  }
  
  const SocialIcon = ({ type }: { type: 'instagram' | 'facebook' | 'linkedin' }) => {
    switch (type) {
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        )
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      default:
        return null
    }
  }
  
  return (
    <div ref={ref} id='about' className="w-full py-16 bg-[#F5F2EA]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        {/* About Studio */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3338] mb-8 text-center">
            הסיפור שלנו
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <h3 className="text-2xl font-semibold text-[#2C3338]">סטודיו MA TEAM</h3>
              <p className="text-[#4A5568] leading-relaxed">
                איזה כיף שהגעתם למשפחה שלנו!
                אנחנו מעוז ואיה – אחים, משפחה על אמת.
                את הרשת שלנו - M.A (כן, שם די מקורי…), הקמנו ב-2020.
              </p>
              <p className="text-[#4A5568] leading-relaxed md:block hidden">
                הסטודיו הראשון נולד מתוך תחביב בזמן הקורונה, ממש בבית שלנו – בלי תוכניות גדולות, רק עם רצון לתת מקום לתנועה, לחיבור ולאנשים.
                מסתבר שהקלישאה "תעשה מה שאתה אוהב – וזה יצליח" באמת עבדה.
                בלי לשים לב, גדלנו - שלושה סניפים, אלפי מתאמנים, קהילה עצומה, ואהבה אחת גדולה שממשיכה להניע אותנו כל יום מחדש.
              </p>
              <p className="text-[#4A5568] leading-relaxed block md:hidden">
                הסטודיו הראשון נולד מתוך תחביב בזמן הקורונה, ובלי לשים לב, גדלנו לשלושה סניפים, אלפי מתאמנים וקהילה עצומה.
              </p>
              <p className="text-[#4A5568] leading-relaxed md:block hidden">
                אנחנו מאמינים באיכות על פני כמות.
                לכן אנחנו עובדים בקבוצות קטנות, עם צוות מאמנים שעבר הכשרה ייחודית – כדי שנוכל באמת לגעת בכל אחד ואחת, להתאים את האימון לצרכים שלך, וללוות אותך עם היחס הכי אישי שניתן לאורך כל הדרך.
              </p>
              <p className="text-[#4A5568] leading-relaxed block md:hidden">
                אנחנו מאמינים באיכות על פני כמות - קבוצות קטנות, צוות מיומן, ויחס אישי לכל מתאמן.
              </p>
              <p className="text-[#4A5568] leading-relaxed md:block hidden">
                אצלנו לא תמצאו הבטחות לתוצאות תוך שבועיים.
                מה שכן תמצאו, זו דרך – כזו שתגרום לך להנות מהאימונים כמו שמעולם לא חווית.
                ובזכות ההנאה הזו, לאמץ אורח חיים בריא, ספורטיבי ומאוזן – כזה שיביא אותך בדיוק להרגשה ולגוף שתמיד חלמת.
                בזמן שלך, בקצב שלך, ובאהבה גדולה.
              </p>
              <p className="text-[#4A5568] leading-relaxed block md:hidden">
                אצלנו תמצאו דרך להנות מאימונים כמו שמעולם לא חווית, ולאמץ אורח חיים בריא ומאוזן - בזמן שלך, בקצב שלך, ובאהבה גדולה.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-10 py-4 text-lg bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all relative group overflow-hidden w-full md:w-auto"
                onClick={() => {
                  const branchesSection = document.getElementById('branches');
                  if (branchesSection) {
                    branchesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative z-10">הסניפים שלנו</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="order-1 md:order-2 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/studio/about-studio.png" 
                  alt="סטודיו MA TEAM" 
                  width={600} 
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 w-full h-full -mr-4 -mt-4 rounded-2xl bg-[#8BA888]/20 -z-10" />
            </motion.div>
          </div>
        </motion.div>
        
        
        {/* Values */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3338] mb-12 text-center">
            הערכים שלנו
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8BA888]/10 text-[#8BA888]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2C3338] mb-4">התאמה אישית</h3>
              <p className="text-[#4A5568] leading-relaxed">
                אנו מאמינים שכל אדם הוא ייחודי, ולכן מתאימים את האימונים באופן אישי לצרכים, למטרות וליכולות של כל מתאמן.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8BA888]/10 text-[#8BA888]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2C3338] mb-4">בטיחות ומקצועיות</h3>
              <p className="text-[#4A5568] leading-relaxed">
                הבטיחות של המתאמנים שלנו היא בראש סדר העדיפויות. המדריכים שלנו מוסמכים ומתעדכנים באופן שוטף בשיטות האימון החדשות ביותר.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8BA888]/10 text-[#8BA888]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2C3338] mb-4">קהילתיות</h3>
              <p className="text-[#4A5568] leading-relaxed">
                בסטודיו שלנו אנחנו מטפחים קהילה תומכת ומעצימה, שבה כל אחד מרגיש שייך ומקבל עידוד להתקדם ולהתפתח.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 