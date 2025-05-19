'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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
  const [activeClass, setActiveClass] = useState(0)
  
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
  
  // Class types data
  const classTypes = [
    {
      name: "פילאטיס מכשירים",
      images: ["/pilates/RASHTA-00526.jpg"],
      description: "האימון הכי מדויק שיש – על מיטות רפורמר מקצועיות מבית align. כאן עובדים על חיזוק עמוק, ייצוב, טווחי תנועה גמישות ושרירי ליבה. מתאים לכל רמות הכושר, גם למי שצריכה שיקום או התאמות. שורף לאורך כל השיעור, אבל ההרגשה אחרי זה שווה הכל!",
      locations: "זמין בסניפי אשדוד ותל אביב"
    },
    {
      name: "פונקציונלי",
      images: ["/function/RASHTA-00254.jpg"],
      description: "אימון פונקציונלי המשלב תרגילים מגוונים לשיפור כוח, סיבולת, יציבות ותנועה יומיומית. מתאים לכל הרמות, משפר ביצועים ומונע פציעות.",
      locations: "זמין בסניפי אשדוד ותל אביב"
    },
    {
      name: "יוגה",
      images: ["/yoga/RASHTA-09041.jpg", "/yoga/RASHTA-00594.jpg"],
      description: 'כאן כל הקסם קורה, בעזרת הסטודיואים הנעימים שהכנו עבורכם בשילוב המדריכות המיוחדות ביותר תחוו שיעור שמחזק, מגמיש ומחזיר לגוף שלך את מה שהוא צריך. עובדים על תנועות זורמות, נשימה נכונה, שיווי משקל ויציבה – בקצב נעים שמתאים לכולם. זה הזמן שלך לעצור רגע, להזיז את הגוף, ולהרגיש יותר קליל, פתוח ונינוח – גם בגוף וגם בראש. מתאים לכל רמה ומומלץ לכל מי שאומר עכשיו ״אולי זה לא בשבילי"',
      locations: "זמין בסניפי אשדוד ותל אביב"
    },
    {
      name: "פילאטיס מזרן",
      images: [
        "/RASHTA-00476.jpg",
        "/RASHTA-08927.jpg"
      ],
      description: "בלי מכשירים – רק את/ה, המזרן, והנשימה שלך. אך אל תתנו למזרן להטעות אתכם, יש האומרים שזה השיעור הקשה והמהנה ביותר. עובדים על ליבה חזקה, גמישות, יציבה ודיוק בתנועה. זה שיעור שמחזק מבפנים, ומרגיש קצת כמו מדיטציה בתנועה.",
      locations: "זמין בסניפי אשדוד ותל אביב"
    },
    {
      name: "מוביליטי",
      images: ["/mobility/RASHTA-00416.jpg"],
      description: "תנועה, שחרור וטווחים פתוחים יותר. זה שיעור שמשפר את התנועה שלך באימונים, במדרגות, ואפילו כשתרים את הקניות. עובדים על מפרקים, גידים וטווחי תנועה – בצורה בטוחה ונעימה. קליל, אפקטיבי, והכי חשוב – מרגישים תוצאות.",
      locations: "זמין בסניפי אשדוד"
    }
  ];
  
  // קרוסלה פנימית לכל שיעור עם יותר מתמונה אחת
  const [classImageIndexes, setClassImageIndexes] = useState(classTypes.map(() => 0));
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    classTypes.forEach((type, idx) => {
      if (type.images.length > 1) {
        intervals[idx] = setInterval(() => {
          setClassImageIndexes(prev => {
            const copy = [...prev];
            copy[idx] = (copy[idx] + 1) % type.images.length;
            return copy;
          });
        }, 3000);
      }
    });
    return () => intervals.forEach(i => i && clearInterval(i));
  }, []);

  // Reset carousel index when changing class type
  useEffect(() => {
    setClassImageIndexes(prev => {
      const copy = [...prev];
      copy[activeClass] = 0;
      return copy;
    });
  }, [activeClass]);
  
  return (
    <div ref={ref} id='about' className="w-full py-16 bg-ma-light">
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
                  src="/our story/RASHTA-00323.jpg"
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
        
        {/* Class Types */}
        <motion.div variants={itemVariants} className="mb-10 relative" id="training">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#8BA888]/10 via-[#9DB89A]/30 to-[#8BA888]/10 rounded-3xl blur-xl -z-10"></div>
          <div className="absolute -inset-8 bg-[url('/images/noise.png')] opacity-30 mix-blend-soft-light"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3338] mb-8 text-center flex items-center justify-center gap-0 relative">
            <span className="drop-shadow-[0_0_15px_rgba(139,168,136,0.3)]">סוגי השיעורים ב</span>
            <Image 
              src="/images/logo-green.png"
              alt="MA Team Logo"
              width={140}
              height={140}
              className="h-auto w-auto max-h-[2.5em] -mr-2 drop-shadow-[0_0_10px_rgba(139,168,136,0.5)]"
            />
          </h2>
          
          <div className="bg-white/40 backdrop-blur-xl backdrop-filter rounded-2xl shadow-lg p-4 md:p-8 overflow-hidden border border-white/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8BA888]/10 via-white/5 to-[#8BA888]/10 rounded-2xl blur-md -z-10"></div>
            
            {/* Tab Navigation */}
            <div className="relative z-10">
              <div className="hidden sm:flex flex-wrap justify-center mb-8 gap-3">
                {classTypes.map((classType, index) => (
                  <motion.button
                    key={index}
                    className={`px-4 py-3 md:px-6 md:py-3 rounded-xl text-base md:text-lg font-medium relative overflow-hidden transition-all duration-300 ${
                      activeClass === index 
                        ? 'text-white shadow-lg' 
                        : 'text-[#8BA888] hover:bg-white/50 backdrop-blur-sm'
                    }`}
                    onClick={() => setActiveClass(index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">{classType.name}</span>
                    {activeClass === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A]"
                        layoutId="activeClassBackground"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* מובייל - מבנה גריד 2x2 */}
              <div className="grid grid-cols-2 gap-3 sm:hidden mb-8">
                {classTypes.map((classType, index) => (
                  <motion.button
                    key={index}
                    className={`px-3 py-3 rounded-xl text-sm font-medium relative overflow-hidden transition-all duration-300 ${
                      activeClass === index 
                        ? 'text-white shadow-lg' 
                        : 'text-[#8BA888] hover:bg-white/50 backdrop-blur-sm'
                    }`}
                    onClick={() => setActiveClass(index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">{classType.name}</span>
                    {activeClass === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A]"
                        layoutId="activeClassBackgroundMobile"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="relative min-h-[400px] md:min-h-[450px] z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClass}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  {/* Image Side */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-96 group">
                    {classTypes[activeClass].images.length > 1 ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={classImageIndexes[activeClass]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-full absolute inset-0"
                        >
                    <Image
                            src={classTypes[activeClass].images[classImageIndexes[activeClass]]}
                      alt={classTypes[activeClass].name}
                            width={600}
                            height={800}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888]/20 to-transparent mix-blend-overlay"></div>
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <Image
                        src={classTypes[activeClass].images[0]}
                        alt={classTypes[activeClass].name}
                        width={600}
                        height={800}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>
                  
                  {/* Content Side */}
                  <div className="space-y-6 backdrop-blur-sm bg-white/30 p-6 rounded-xl border border-white/40 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#2C3338] flex items-center">
                      {classTypes[activeClass].name}
                      <div className="h-1 w-16 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] rounded-full mr-4"></div>
                    </h3>
                    
                    <p className="text-[#4A5568] leading-relaxed">
                      {classTypes[activeClass].description}
                    </p>
                    
                    <div className="pt-4 flex items-center gap-2 text-[#8BA888] font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {classTypes[activeClass].locations}
                    </div>
                    
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(139, 168, 136, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#8BA888]/90 to-[#9DB89A]/90 text-white rounded-xl font-medium shadow-md hover:shadow-xl transition-all relative group overflow-hidden backdrop-blur-md"
                    >
                      <span className="relative z-10">לשיעור ניסיון חינם</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 