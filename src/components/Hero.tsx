'use client'

import { useRef, useEffect } from 'react'
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
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay error:", error)
      })
    }
  }, [])
  
  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with futuristic overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale }} className="w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute min-w-full min-h-full object-cover"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/pilates-background.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Futuristic overlay grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_70%)]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px'
             }} 
        />
        
        {/* Futuristic geometric elements */}
        <motion.div 
          style={{ scale: circleScale, opacity: circleOpacity }}
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-ma-primary/20 backdrop-blur-lg"
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
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
      </div>
      
      {/* Athlete silhouettes - Left side */}
      <motion.div 
        style={{ x: athleteX1, y: athleteY, rotate: athleteRotate }}
        className="absolute left-[5%] bottom-[15%] z-5 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative h-64 w-40"
        >
          {/* Pilates silhouette */}
          <div className="absolute inset-0 bg-ma-primary/70 mask-silhouette-pilates backdrop-blur-sm rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-60">
            פילאטיס
          </div>
        </motion.div>
      </motion.div>
      
      {/* Athlete silhouettes - Right side */}
      <motion.div 
        style={{ x: athleteX2, y: athleteY, rotate: athleteRotate }}
        className="absolute right-[5%] bottom-[25%] z-5 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
          className="relative h-64 w-40"
        >
          {/* Yoga silhouette */}
          <div className="absolute inset-0 bg-white/30 mask-silhouette-yoga backdrop-blur-sm rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-60">
            יוגה
          </div>
        </motion.div>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        style={{ opacity, y }} 
        className="container relative z-10 px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl backdrop-blur-md bg-black/20 p-8 rounded-3xl border border-white/10 shadow-2xl"
        >
          {/* Tech lines in background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'] 
              }}
              transition={{ 
                duration: 15, 
                ease: "linear", 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 90%, rgba(255, 255, 255, 0.5) 95%, transparent 100%), linear-gradient(-45deg, transparent 90%, rgba(255, 255, 255, 0.5) 95%, transparent 100%)',
                backgroundSize: '300px 300px'
              }}
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 relative">
            <motion.span 
              className="text-ma-primary block mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MA TEAM
            </motion.span>
            <motion.span 
              className="text-2xl md:text-3xl font-light tracking-wider"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              הסטודיו לאימונים אישיים
              בחסות ההוא מהישרדות
            </motion.span>
            
            {/* Decorative lines */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '30%' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent absolute -bottom-2 left-[35%]"
            />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            פילאטיס, יוגה ואימון פונקציונלי בהתאמה אישית ובאווירה משפחתית
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="#contact"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/30 shadow-xl transition-all transform hover:shadow-ma-primary/20 hover:bg-white/20 hover:scale-105 hover:border-white/50 overflow-hidden"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              קבע שיעור ניסיון
            </Link>
            
            <Link 
              href="#branches"
              className="group relative px-8 py-4 bg-ma-primary/80 backdrop-blur-md text-white font-medium rounded-full border border-ma-primary/30 shadow-xl transition-all transform hover:shadow-ma-primary/50 hover:bg-ma-primary hover:scale-105 hover:border-ma-primary/50 overflow-hidden"
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              מידע על הסניפים
            </Link>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-12 h-20 border-2 border-white/30 rounded-full flex justify-center pt-3 backdrop-blur-sm bg-white/5">
          <motion.div 
            className="w-2 h-4 bg-white/70 rounded-full"
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.4, 1, 0.4]
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