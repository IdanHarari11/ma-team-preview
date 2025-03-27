'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  photoUrl: string
  branch: 'tel-aviv' | 'ashdod'
}

interface VideoTestimonial {
  id: string
  title: string
  description: string
  thumbnailSrc: string
  videoSrc: string
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  // Example reviews - replace with actual data later
  const reviews: Review[] = [
    {
      id: '1',
      name: 'מיכל לוי',
      rating: 5,
      text: 'אימוני הפילאטיס במכון הם ברמה גבוהה מאוד. המדריכים מקצועיים, והאווירה נעימה וביתית. מומלץ בחום!',
      date: '15.04.2023',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      branch: 'tel-aviv'
    },
    {
      id: '2',
      name: 'אבי כהן',
      rating: 5,
      text: 'אימוני היוגה שינו לי את החיים. גמישות, כוח וריכוז - הכל השתפר. צוות מקצועי שתמיד מקשיב ועוזר.',
      date: '03.02.2023',
      photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      branch: 'tel-aviv'
    },
    {
      id: '3',
      name: 'רונית שרון',
      rating: 4,
      text: 'מקום מעולה לאימונים, הסניף נקי, מאובזר היטב ונוח להגעה. מנויים יקרים מעט אבל שווים את המחיר.',
      date: '27.12.2022',
      photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      branch: 'ashdod'
    },
    {
      id: '4',
      name: 'יוסי לוינסון',
      rating: 5,
      text: 'מתאמן במסגרת אימונים פונקציונליים כבר שנה. התוצאות מדהימות! המאמנים מעולים ומותאמים אישית לכל מתאמן.',
      date: '05.03.2023',
      photoUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
      branch: 'tel-aviv'
    },
    {
      id: '5',
      name: 'דנה ישראלי',
      rating: 5,
      text: 'הצטרפתי לחוגי פילאטיס אחרי לידה והתוצאות מדהימות. המדריכות מקצועיות ותומכות. מומלץ לכל אישה!',
      date: '19.01.2023',
      photoUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      branch: 'ashdod'
    },
    {
      id: '6',
      name: 'עמית ברק',
      rating: 4,
      text: 'מגיע לאימוני יוגה פעמיים בשבוע. האווירה רגועה ונעימה והמדריכים ברמה גבוהה. מיקום מעולה במרכז העיר.',
      date: '08.05.2023',
      photoUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
      branch: 'tel-aviv'
    }
  ]
  
  // Example video testimonials
  const videoTestimonials: VideoTestimonial[] = [
    {
      id: 'v1',
      title: 'איך הפילאטיס שינה את חיי',
      description: 'רותי מספרת על השינוי שעברה בעקבות אימוני הפילאטיס',
      thumbnailSrc: '/images/about-main.jpg',
      videoSrc: '/videos/hero-background.mp4'
    },
    {
      id: 'v2',
      title: 'איך חזרתי לכושר אחרי לידה',
      description: 'מיכל מספרת על החזרה לכושר אחרי לידה עם המאמנים שלנו',
      thumbnailSrc: '/images/about-main.jpg',
      videoSrc: '/videos/hero-background.mp4'
    }
  ]
  
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
  
  // Helper function to render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1 space-x-reverse">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }
  
  return (
    <div ref={ref} className="w-full py-16 bg-white" id="testimonials">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            מה לקוחותינו אומרים
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            הצטרפו למאות הלקוחות המרוצים שלנו ושנו את חייכם עם אימונים איכותיים ותוצאות מוכחות
          </p>
        </motion.div>
        
        {/* Video testimonials section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-ma-black mb-6">
            סיפורי הצלחה
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTestimonials.map(video => (
              <div 
                key={video.id}
                className="relative overflow-hidden rounded-2xl shadow-lg group bg-ma-black aspect-video"
              >
                <Image 
                  src={video.thumbnailSrc}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-ma-black/80 via-ma-black/40 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {video.title}
                  </h4>
                  <p className="text-white/80 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <a 
                    href={video.videoSrc}
                    className="inline-flex items-center text-white bg-ma-primary/90 py-2 px-4 rounded-full w-max font-medium shadow-lg hover:bg-ma-primary transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    צפו בסיפור
                  </a>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-ma-primary flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Google reviews section */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-xl md:text-2xl font-semibold text-ma-black mb-6">
            ביקורות גוגל
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div 
                key={review.id}
                className="p-6 bg-white border border-ma-gray/20 rounded-2xl shadow-md transition-all hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm mr-4">
                    <Image
                      src={review.photoUrl}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-ma-black">{review.name}</h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-xs text-ma-black/60">{review.date}</span>
                      <span className="text-xs text-ma-black/60">•</span>
                      <span className="text-xs text-ma-primary font-medium">סניף {review.branch === 'tel-aviv' ? 'תל אביב' : 'אשדוד'}</span>
                    </div>
                  </div>
                </div>
                
                {renderStars(review.rating)}
                
                <p className="mt-3 text-ma-black/80 line-clamp-4">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA button */}
        <motion.div variants={itemVariants} className="text-center">
          <a
            href="https://www.google.com/search?q=MA+TEAM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-ma-gray/30 text-ma-black rounded-full font-medium hover:bg-ma-gray/50 transition-all"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V13H17V11H13V7Z"/>
            </svg>
            לכל הביקורות שלנו בגוגל
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 