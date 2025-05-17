'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
    '/pilates ashdod/DSC_8894.JPG',
    '/pilates ashdod/DSC_8747.JPG',
    '/pilates ashdod/DSC_8673.JPG',
    '/pilates ashdod/DSC_8603.JPG',
    '/function ashdod/Facetune_26-10-2022-16-47-38_Original.jpg',
    '/function ashdod/DANI2854_Original.jpg',
    '/function ashdod/IMG_0524_Facetune_26-10-2022-15-52-19_Original.jpg',
    '/function ashdod/DANI2735_Original.jpg',
    '/pilates tlv/RASHTA-09094.jpg',
    '/pilates tlv/RASHTA-09087.jpg',
    '/pilates tlv/RASHTA-09086.jpg',
    '/pilates tlv/RASHTA-09083.jpg',
    '/pilates tlv/RASHTA-09080.jpg',
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
    }, 3000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Slideshow with overlays */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Slideshow images */}
        {slideshowImages.map((src, idx) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full absolute inset-0"
            style={{ zIndex: idx }}
          >
            <Image
              src={src}
              alt="MA TEAM Studio Slide"
              fill
              priority={idx === 0}
              className="object-cover transition-opacity duration-700"
            />
          </motion.div>
        ))}
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_70%)]" />
        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-[#8BA888]/20 mix-blend-multiply" />
        {/* Futuristic geometric elements */}
        <motion.div 
          style={{ scale: circleScale, opacity: circleOpacity }}
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#8BA888]/20 backdrop-blur-lg"
        />
        <motion.div 
          style={{ scale: circleScale, opacity: circleOpacity }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 backdrop-blur-lg"
        />
        {/* Triangular element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 left-[20%] w-32 h-32"
          style={{ 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', 
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2))',
            backdropFilter: 'blur(4px)'
          }}
        />
        {/* Rectangular element */}
        <motion.div 
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.3, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute bottom-40 right-[15%] w-40 h-20 backdrop-blur-sm bg-white/10 border border-white/20 rounded"
        />
        {/* Flowing particle effect */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center items-center px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl [box-shadow:_0_0_30px_rgba(139,168,136,0.3)] max-w-xl mx-auto w-full" style={{paddingBottom: '2.5rem'}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 flex flex-col items-center text-center"
          >
            <div className="relative flex flex-col items-center">
              <Image 
                src="/images/heroimage.png" 
                alt="MA TEAM" 
                width={220} 
                height={110} 
                className="shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform duration-300"
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