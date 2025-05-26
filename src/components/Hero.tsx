'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  
  // Circle backdrop animations
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const circleOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0])
  
  // Athlete icons animations
  const athleteX1 = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const athleteX2 = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  const athleteY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  const athleteRotate = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  
  // Slideshow images from the new folders
  const slideshowImages = [
    '/hero/RASHTA-00456.jpg',
    '/hero/RASHTA-00555.jpg',
    '/hero/RASHTA-00647.jpg',
    '/ashdod function/RASHTA-00215.jpg',
    '/ashdod function/RASHTA-00244.jpg',
    '/ashdod function/RASHTA-00256.jpg',
    '/tlv p y/RASHTA-08836.jpg',
    '/tlv p y/RASHTA-08859.jpg',
    '/tlv p y/RASHTA-09041.jpg',
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay error:", error)
      })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden w-full hero-mobile-fullwidth">
      {/* Background Slideshow with overlays */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* All images rendered with opacity animation */}
        {slideshowImages.map((image, index) => (
          <motion.div
            key={index}
            className="w-full h-full absolute inset-0"
            animate={{ 
              opacity: index === currentImage ? 1 : 0 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
            style={{ zIndex: index === currentImage ? 2 : 1 }}
          >
            <Image
              src={image}
              alt="MA TEAM Studio Slide"
              fill
              priority={index < 3}
              className="object-cover"
            />
          </motion.div>
        ))}
        
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" style={{ zIndex: 3 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center items-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl [box-shadow:_0_0_30px_rgba(139,168,136,0.3)] max-w-xl mx-auto w-full" style={{paddingBottom: '2.5rem'}}>
          {/* Responsive width fix for mobile */}
          <style jsx>{`
            @media (max-width: 640px) {
              section.hero-mobile-fullwidth, .hero-mobile-fullwidth, .hero-center-box-narrow {
                max-width: 100vw !important;
                width: 100vw !important;
                overflow-x: hidden !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .hero-center-box-narrow {
                max-width: 320px;
                width: 90vw;
                margin-left: auto;
                margin-right: auto;
                padding: 0.75rem 0.5rem !important;
                min-height: unset !important;
              }
              .hero-center-box-narrow-blur {
                backdrop-filter: blur(18px) !important;
                -webkit-backdrop-filter: blur(18px) !important;
                background: rgba(255,255,255,0.10) !important;
              }
              .hero-center-box-narrow p, .hero-center-box-narrow .hero-text-sm {
                font-size: 0.95rem !important;
                line-height: 1.4 !important;
                margin-top: 0.5rem !important;
                margin-bottom: 0.5rem !important;
              }
              .hero-center-box-narrow .hero-logo {
                margin-bottom: 0.5rem !important;
              }
              .hero-center-box-narrow .hero-btn {
                margin-top: 0.5rem !important;
              }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 flex flex-col items-center text-center hero-center-box-narrow hero-center-box-narrow-blur hero-mobile-fullwidth"
          >
            <div className="relative flex flex-col items-center">
              <Image 
                src="/images/heroimage.png" 
                alt="MA TEAM" 
                width={210}
                height={105}
                className="shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform duration-300 mb-2 sm:mb-0 w-[180px] h-auto sm:w-[330px]"
                priority
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in'
                }}
              />
            </div>
            <p className="text-lg md:text-2xl text-white/90 drop-shadow-lg [text-shadow:_0_0_8px_rgba(139,168,136,0.4)] max-w-md leading-relaxed tracking-wide" style={{ marginTop: '-1.2rem'}}>
              ברוכים הבאים לבית החדש שלך.<br/>רשת הבוטיק המשלבת את כל העולמות – באווירה משפחתית ואינטימית
            </p>
            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#2C3338] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all relative group overflow-hidden text-base md:text-lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative z-10">לאימון ניסיון</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8BA888] to-[#9DB89A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 rounded-xl bg-white/20 blur-xl group-hover:bg-white/40 transition-all duration-300"></div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {/* Mouse outline */}
        <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center items-start pt-2.5">
          {/* Inner scrolling wheel */}
          <motion.div
            className="w-1.5 h-3 bg-white/70 rounded-full"
            animate={{
              y: [0, 8, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  )
} 