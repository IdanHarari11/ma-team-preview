'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface BranchGallery {
  id: string
  name: string
  instagramHandle: string
  profileImage: string
  images: GalleryImage[]
}

interface GalleryProps {
  selectedBranchId?: string
}

export default function Gallery({ selectedBranchId }: GalleryProps) {
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const STORY_DURATION = 5000 // 5 seconds per image
  const LONG_PRESS_DURATION = 200 // 200ms to detect a long press
  
  // Mock data - this would be replaced with actual data from your application
  const branchGalleries: BranchGallery[] = [
    {
      id: 'tel-aviv',
      name: 'תל אביב',
      instagramHandle: 'ma_team_telaviv',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      images: [
        { 
          src: "/images/new/DSC_8175.JPG",
          alt: "סטודיו פילאטיס מודרני - תל אביב", 
          width: 1200, 
          height: 800 
        },
        { 
          src: "/images/new/DSC_8266.JPG",
          alt: "אימון פילאטיס על מכשירים - תל אביב", 
          width: 800, 
          height: 1200 
        },
        { 
          src: "/images/new/DSC_8332.JPG",
          alt: "שיעור יוגה קבוצתי - תל אביב", 
          width: 1200, 
          height: 800 
        },
        { 
          src: "/images/new/pilatismachines.JPG",
          alt: "שיעור יוגה קבוצתי - תל אביב", 
          width: 1200, 
          height: 800 
        },
        { 
          src: "/images/new/pilatismachinewomen.jpg",
          alt: "שיעור יוגה קבוצתי - תל אביב", 
          width: 1200, 
          height: 800 
        },
      ]
    },
    {
      id: 'ashdod',
      name: 'אשדוד',
      instagramHandle: 'ma_team_ashdod',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      images: [
        { 
          src: "/images/new/men.jpg",
          alt: "ציוד פילאטיס מקצועי - אשדוד", 
          width: 1200, 
          height: 800 
        },
        { 
          src: "/images/new/men2.jpg",
          alt: "אימון פונקציונלי - אשדוד", 
          width: 800, 
          height: 1200 
        },
        { 
          src: "/images/new/weight.jpg",
          alt: "אימון פונקציונלי - אשדוד", 
          width: 800, 
          height: 1200 
        },
        { 
          src: "/images/new/balls.jpg",
          alt: "אימון פונקציונלי - אשדוד", 
          width: 800, 
          height: 1200 
        },
        { 
          src: "/images/new/steps.jpg",
          alt: "אימון פונקציונלי - אשדוד", 
          width: 800, 
          height: 1200 
        },
      ]
    },
    {
      id: 'haifa',
      name: 'חיפה',
      instagramHandle: 'ma_team_haifa',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      images: [
        { 
          src: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=1200",
          alt: "מאמנת עם מתאמנת - חיפה", 
          width: 1200, 
          height: 800 
        },
        { 
          src: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=1200",
          alt: "יוגה בסטודיו - חיפה", 
          width: 1200, 
          height: 800 
        }
      ]
    }
  ]
  
  const storyImages: GalleryImage[] = [
    { src: '/pilates ashdod/DSC_8491.JPG', alt: 'סטודיו פילאטיס אשדוד - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates ashdod/DSC_8272.JPG', alt: 'סטודיו פילאטיס אשדוד - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates ashdod/DSC_8150.JPG', alt: 'סטודיו פילאטיס אשדוד - מבט נוסף', width: 1200, height: 800 },
    { src: '/function ashdod/DANI2841_Original.jpg', alt: 'סטודיו פונקציונלי אשדוד - מבט נוסף', width: 1200, height: 800 },
    { src: '/function ashdod/Facetune_26-10-2022-16-57-39_Original.jpg', alt: 'סטודיו פונקציונלי אשדוד - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates tlv/RASHTA-09076.jpg', alt: 'סטודיו תל אביב - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates tlv/RASHTA-09070.jpg', alt: 'סטודיו תל אביב - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates tlv/RASHTA-09059.jpg', alt: 'סטודיו תל אביב - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates tlv/RASHTA-08992.jpg', alt: 'סטודיו תל אביב - מבט נוסף', width: 1200, height: 800 },
    { src: '/pilates tlv/RASHTA-08975.jpg', alt: 'סטודיו תל אביב - מבט נוסף', width: 1200, height: 800 },
  ];
  
  // Find the correct branch to display based on selectedBranchId
  useEffect(() => {
    if (selectedBranchId) {
      const branchIndex = branchGalleries.findIndex(branch => branch.id === selectedBranchId)
      if (branchIndex !== -1) {
        setCurrentBranchIndex(branchIndex)
        setCurrentImageIndex(0) // Reset to first image when branch changes
        resetProgress() // Reset progress bar
      }
    }
  }, [selectedBranchId])
  
  const currentBranch = branchGalleries[currentBranchIndex]
  const currentImages = storyImages;
  
  // Handle progress and auto-advancement
  useEffect(() => {
    resetProgress()
    return () => clearProgressInterval()
  }, [currentImageIndex, currentBranchIndex])
  
  const resetProgress = () => {
    clearProgressInterval()
    setProgressWidth(0)
    
    if (!paused) {
      progressIntervalRef.current = setInterval(() => {
        setProgressWidth(prev => {
          const newWidth = prev + (100 / (STORY_DURATION / 100))
          
          if (newWidth >= 100) {
            goToNextImage()
            return 0
          }
          
          return newWidth
        })
      }, 100)
    }
  }
  
  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }
  
  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }
  
  // Navigate to next image with elegant looping
  const goToNextImage = () => {
    // Set direction to forward
    setDirection(1)
    
    if (currentImageIndex < currentImages.length - 1) {
      // More images in current branch
      setCurrentImageIndex(prev => prev + 1)
    } else if (currentBranchIndex < branchGalleries.length - 1) {
      // Move to next branch
      setCurrentBranchIndex(prev => prev + 1)
      setCurrentImageIndex(0)
    } else {
      // Loop back to first branch and image with elegant transition
      setCurrentBranchIndex(0)
      setCurrentImageIndex(0)
    }
  }
  
  const goToPrevImage = () => {
    // Set direction to backward
    setDirection(-1)
    
    if (currentImageIndex > 0) {
      // Previous image in current branch
      setCurrentImageIndex(prev => prev - 1)
    } else if (currentBranchIndex > 0) {
      // Move to previous branch, last image
      setCurrentBranchIndex(prev => prev - 1)
      setCurrentImageIndex(branchGalleries[currentBranchIndex - 1].images.length - 1)
    } else {
      // Loop to the last image of the last branch
      setCurrentBranchIndex(branchGalleries.length - 1)
      setCurrentImageIndex(branchGalleries[branchGalleries.length - 1].images.length - 1)
    }
  }
  
  const handlePause = () => {
    setPaused(true)
    clearProgressInterval()
  }
  
  const handleResume = () => {
    setPaused(false)
    resetProgress()
  }
  
  const handlePointerDown = () => {
    // Start a timer for long press
    longPressTimerRef.current = setTimeout(() => {
      handlePause()
    }, LONG_PRESS_DURATION)
  }
  
  const handlePointerUp = () => {
    clearLongPressTimer()
    
    // If it was a short press and paused, resume
    if (paused) {
      handleResume()
    }
  }

  const handlePointerLeave = () => {
    clearLongPressTimer()
  }
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevImage() // Changed direction - left arrow goes to previous image
      } else if (e.key === 'ArrowRight') {
        goToNextImage() // Changed direction - right arrow goes to next image
      } else if (e.key === ' ') {
        if (paused) {
          handleResume()
        } else {
          handlePause()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paused, currentImageIndex, currentBranchIndex])
  
  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      clearProgressInterval()
      clearLongPressTimer()
    }
  }, [])
  
  if (!currentBranch || currentImages.length === 0) {
    return <div className="flex items-center justify-center h-96">אין תמונות זמינות</div>
  }
  
  // Define smooth transition for the animation
  const transition = {
    type: "tween", 
    ease: "easeInOut", 
    duration: 0.4
  }
  
  return (
    <div className="w-full bg-ma-black py-8 md:py-12">
      <div id='gallery' dir="ltr" className="w-full max-w-5xl mx-auto h-[80vh] bg-ma-black overflow-hidden relative px-6 sm:px-10 md:px-16 rounded-lg shadow-2xl">
        {/* Progress indicators - Forced LTR direction */}
        <div dir="ltr" className="absolute left-6 right-6 z-20 flex" style={{ direction: 'ltr' }}>
          {[...currentImages].map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden mx-0.5">
              {index < currentImageIndex && (
                <div className="h-full w-full bg-white" />
              )}
              {index === currentImageIndex && (
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ 
                    width: `${progressWidth}%`,
                    transformOrigin: 'left',
                    direction: 'ltr'
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Instagram-like header - moved to left side */}
        <div className="absolute top-8 left-6 z-20 flex items-center">
          <div dir="rtl" className="flex items-center bg-ma-black/50 backdrop-blur-sm p-1.5 pr-4 rounded-full">
            <div dir="rtl" className="text-white ml-2">
              {/* Instagram handle first without @ and in bold */}
              <p className="text-sm font-bold text-right">{currentBranch.instagramHandle}</p>
              {/* Location tag style */}
              <p className="text-xs opacity-70 text-right flex items-center">
                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {currentBranch.name}
              </p>
            </div>
            {/* Image moved to the far left */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500">
              <Image 
                src={currentBranch.profileImage} 
                alt={currentBranch.name}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Main image with smooth slide animation */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${currentBranchIndex}-${currentImageIndex}`}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
            transition={transition}
            className="w-full flex items-center justify-center"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            <div className="relative w-full aspect-[9/16] max-w-[400px] max-h-[90vh] mx-auto bg-black rounded-xl overflow-hidden shadow-lg">
              <Image 
                src={currentImages?.[currentImageIndex]?.src}
                alt={currentImages?.[currentImageIndex]?.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Touch navigation areas - Left to right navigation */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <div 
            className="w-1/2 h-full pointer-events-auto"
            onClick={goToPrevImage}
          />
          <div 
            className="w-1/2 h-full pointer-events-auto" 
            onClick={goToNextImage}
          />
        </div>
        
        {/* Pause/Play indicator */}
        {paused && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-ma-black/50 p-4 rounded-full">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
} 