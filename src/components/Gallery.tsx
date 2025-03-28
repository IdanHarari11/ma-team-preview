'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const images: GalleryImage[] = [
    { 
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      alt: "סטודיו פילאטיס מודרני", 
      width: 1200, 
      height: 800 
    },
    { 
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
      alt: "אימון פילאטיס על מכשירים", 
      width: 800, 
      height: 1200 
    },
    { 
      src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200",
      alt: "שיעור יוגה קבוצתי", 
      width: 1200, 
      height: 800 
    },
    { 
      src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200",
      alt: "ציוד פילאטיס מקצועי", 
      width: 1200, 
      height: 800 
    },
    { 
      src: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800",
      alt: "אימון פונקציונלי", 
      width: 800, 
      height: 1200 
    },
    { 
      src: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=1200",
      alt: "מאמנת עם מתאמנת", 
      width: 1200, 
      height: 800 
    },
    { 
      src: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=1200",
      alt: "יוגה בסטודיו", 
      width: 1200, 
      height: 800 
    }
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
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
  
  const handleOpenLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }
  
  const handleCloseLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }
  
  return (
    <div ref={ref} className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            גלריית התמונות שלנו
          </motion.h2>
          <motion.p variants={itemVariants} className="text-ma-black/70 max-w-xl mx-auto">
            הצצה אל המתחם המפנק והאווירה המיוחדת בסטודיו MA TEAM
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                image.height > image.width 
                  ? 'row-span-2'
                  : index % 3 === 0 
                    ? 'col-span-2' 
                    : ''
              }`}
              onClick={() => handleOpenLightbox(image)}
            >
              <div className="absolute inset-0 bg-ma-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
              <Image 
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="mt-12 text-center"
        >
          <a 
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            עקבו אחרינו באינסטגרם
          </a>
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ma-black/90 z-50 p-4 flex items-center justify-center"
            onClick={handleCloseLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="w-full h-auto"
              />
              
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ma-black/50 text-white flex items-center justify-center hover:bg-ma-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-ma-black/70 backdrop-blur-sm px-4 py-3 text-white">
                <p className="text-lg">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 