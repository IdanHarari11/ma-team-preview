'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

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
    <div className="w-full py-16 bg-[#F5F2EA]" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-8">
            מה הלקוחות אומרים
          </h2>
          <p className="text-ma-black/70 text-lg max-w-2xl mx-auto">
            אנחנו גאים לשמוע את המשוב החיוביתאמנים שלנו. הנה מה שיש להם לומר על החוויה שלהם ב-MA TEAM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={review.photoUrl}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-ma-black">{review.name}</h3>
                  <p className="text-ma-black/60 text-sm">סניף {review.branch === 'tel-aviv' ? 'תל אביב' : 'אשדוד'}</p>
                </div>
              </div>
              <p className="text-ma-black/80 mb-6">{review.text}</p>
              <div className="flex text-[#8BA888]">
                {renderStars(review.rating)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-4 px-8 py-4 bg-[#8BA888] text-white rounded-xl font-medium shadow-lg hover:bg-[#8BA888]/90 transition-all"
          >
            <span>לכל הביקורות</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
} 