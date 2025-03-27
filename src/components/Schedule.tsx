'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
type Branch = 'tel-aviv' | 'ashdod'
type TrainingType = 'pilates' | 'yoga' | 'functional'

interface ScheduleClass {
  id: string
  day: Day
  startTime: string
  endTime: string
  title: string
  trainer: string
  type: TrainingType
  branch: Branch
  maxParticipants: number
  currentParticipants: number
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<Day>('sunday')
  const [activeBranch, setActiveBranch] = useState<Branch>('tel-aviv')
  const [activeFilter, setActiveFilter] = useState<TrainingType | 'all'>('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const days: { id: Day; label: string }[] = [
    { id: 'sunday', label: 'ראשון' },
    { id: 'monday', label: 'שני' },
    { id: 'tuesday', label: 'שלישי' },
    { id: 'wednesday', label: 'רביעי' },
    { id: 'thursday', label: 'חמישי' },
    { id: 'friday', label: 'שישי' },
    { id: 'saturday', label: 'שבת' }
  ]
  
  const branches: { id: Branch; label: string }[] = [
    { id: 'tel-aviv', label: 'תל אביב' },
    { id: 'ashdod', label: 'אשדוד' }
  ]
  
  const filters: { id: TrainingType | 'all'; label: string }[] = [
    { id: 'all', label: 'הכל' },
    { id: 'pilates', label: 'פילאטיס' },
    { id: 'yoga', label: 'יוגה' },
    { id: 'functional', label: 'פונקציונלי' }
  ]
  
  // Sample schedule data
  const scheduleData: ScheduleClass[] = [
    // Sunday
    { id: '1', day: 'sunday', startTime: '07:00', endTime: '08:00', title: 'פילאטיס מכשירים', trainer: 'מור', type: 'pilates', branch: 'tel-aviv', maxParticipants: 8, currentParticipants: 5 },
    { id: '2', day: 'sunday', startTime: '08:15', endTime: '09:15', title: 'יוגה', trainer: 'אריאל', type: 'yoga', branch: 'tel-aviv', maxParticipants: 12, currentParticipants: 8 },
    { id: '3', day: 'sunday', startTime: '09:30', endTime: '10:30', title: 'פילאטיס מזרן', trainer: 'שירה', type: 'pilates', branch: 'tel-aviv', maxParticipants: 12, currentParticipants: 10 },
    { id: '4', day: 'sunday', startTime: '17:00', endTime: '18:00', title: 'אימון פונקציונלי', trainer: 'אריאל', type: 'functional', branch: 'tel-aviv', maxParticipants: 10, currentParticipants: 6 },
    { id: '5', day: 'sunday', startTime: '18:15', endTime: '19:15', title: 'פילאטיס מכשירים', trainer: 'מור', type: 'pilates', branch: 'tel-aviv', maxParticipants: 8, currentParticipants: 8 },
    { id: '6', day: 'sunday', startTime: '19:30', endTime: '20:30', title: 'יוגה', trainer: 'שירה', type: 'yoga', branch: 'tel-aviv', maxParticipants: 12, currentParticipants: 7 },
    
    // Sunday - Ashdod
    { id: '7', day: 'sunday', startTime: '07:30', endTime: '08:30', title: 'פילאטיס מזרן', trainer: 'מיכל', type: 'pilates', branch: 'ashdod', maxParticipants: 12, currentParticipants: 6 },
    { id: '8', day: 'sunday', startTime: '08:45', endTime: '09:45', title: 'יוגה', trainer: 'אסף', type: 'yoga', branch: 'ashdod', maxParticipants: 12, currentParticipants: 9 },
    { id: '9', day: 'sunday', startTime: '18:00', endTime: '19:00', title: 'אימון פונקציונלי', trainer: 'אסף', type: 'functional', branch: 'ashdod', maxParticipants: 10, currentParticipants: 5 },
    
    // Monday
    { id: '10', day: 'monday', startTime: '07:00', endTime: '08:00', title: 'פילאטיס מכשירים', trainer: 'מור', type: 'pilates', branch: 'tel-aviv', maxParticipants: 8, currentParticipants: 4 },
    { id: '11', day: 'monday', startTime: '09:30', endTime: '10:30', title: 'יוגה', trainer: 'אריאל', type: 'yoga', branch: 'tel-aviv', maxParticipants: 12, currentParticipants: 7 },
    { id: '12', day: 'monday', startTime: '17:00', endTime: '18:00', title: 'פילאטיס מזרן', trainer: 'שירה', type: 'pilates', branch: 'tel-aviv', maxParticipants: 12, currentParticipants: 9 },
    { id: '13', day: 'monday', startTime: '18:15', endTime: '19:15', title: 'אימון פונקציונלי', trainer: 'אריאל', type: 'functional', branch: 'tel-aviv', maxParticipants: 10, currentParticipants: 8 },
    { id: '14', day: 'monday', startTime: '19:30', endTime: '20:30', title: 'פילאטיס מכשירים', trainer: 'מור', type: 'pilates', branch: 'tel-aviv', maxParticipants: 8, currentParticipants: 6 },
    
    // Monday - Ashdod
    { id: '15', day: 'monday', startTime: '08:00', endTime: '09:00', title: 'פילאטיס מזרן', trainer: 'מיכל', type: 'pilates', branch: 'ashdod', maxParticipants: 12, currentParticipants: 7 },
    { id: '16', day: 'monday', startTime: '17:30', endTime: '18:30', title: 'יוגה', trainer: 'אסף', type: 'yoga', branch: 'ashdod', maxParticipants: 12, currentParticipants: 10 },
    { id: '17', day: 'monday', startTime: '19:00', endTime: '20:00', title: 'אימון פונקציונלי', trainer: 'אסף', type: 'functional', branch: 'ashdod', maxParticipants: 10, currentParticipants: 8 },
    
    // Add more classes for other days...
  ]
  
  // Filter classes based on active day, branch, and filter
  const filteredClasses = scheduleData.filter(cls => {
    const dayMatch = cls.day === activeDay
    const branchMatch = cls.branch === activeBranch
    const typeMatch = activeFilter === 'all' || cls.type === activeFilter
    
    return dayMatch && branchMatch && typeMatch
  })
  
  // Sort classes by start time
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })
  
  // Type to get proper icon
  const getTypeIcon = (type: TrainingType) => {
    switch (type) {
      case 'pilates':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'yoga':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'functional':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        )
    }
  }
  
  // Get class status
  const getClassStatus = (cls: ScheduleClass) => {
    if (cls.currentParticipants >= cls.maxParticipants) {
      return { label: 'מלא', color: 'bg-red-100 text-red-800' }
    } else if (cls.currentParticipants >= cls.maxParticipants * 0.8) {
      return { label: 'כמעט מלא', color: 'bg-orange-100 text-orange-800' }
    } else {
      return { label: 'פתוח להרשמה', color: 'bg-green-100 text-green-800' }
    }
  }
  
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
  
  return (
    <div ref={ref} className="w-full py-16 bg-gradient-to-b from-ma-gray/10 to-transparent" id="schedule">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-ma-black mb-4">
            לוח השיעורים שלנו
          </h2>
          <p className="text-ma-black/70 max-w-xl mx-auto">
            בחרו יום, סניף וסוג אימון כדי לצפות בשיעורים הזמינים
          </p>
        </motion.div>
        
        {/* Filters */}
        <motion.div variants={itemVariants} className="mb-8 space-y-4">
          {/* Branch selector */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-md">
              {branches.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeBranch === branch.id
                      ? 'bg-ma-primary text-white'
                      : 'text-ma-black/70 hover:text-ma-black/90'
                  }`}
                >
                  {branch.label}
                </button>
              ))}
            </div>
          </div>
        
          {/* Days selector */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`py-3 rounded-xl font-medium transition-all ${
                  activeDay === day.id
                    ? 'bg-ma-black text-white shadow-md'
                    : 'bg-white text-ma-black/70 hover:bg-ma-gray/20 shadow-sm'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
          
          {/* Type filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  activeFilter === filter.id
                    ? 'bg-ma-primary/90 text-white shadow-md'
                    : 'bg-white text-ma-black/70 hover:bg-ma-gray/20 shadow-sm'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Classes */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          {sortedClasses.length > 0 ? (
            <div className="divide-y divide-ma-gray/20">
              {sortedClasses.map(cls => {
                const status = getClassStatus(cls)
                
                return (
                  <div key={cls.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Time and title */}
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-16 md:w-20 text-center">
                          <div className="text-lg font-semibold text-ma-black">{cls.startTime}</div>
                          <div className="text-xs text-ma-black/60">{cls.endTime}</div>
                        </div>
                        
                        <div className="mr-4 flex-grow">
                          <div className="flex items-center">
                            <span className="text-lg font-medium text-ma-black">{cls.title}</span>
                            <div className="mr-2 p-1 rounded-full bg-ma-primary/10">
                              {getTypeIcon(cls.type)}
                            </div>
                          </div>
                          <div className="text-sm text-ma-black/70">מדריך: {cls.trainer}</div>
                        </div>
                      </div>
                      
                      {/* Status and booking */}
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </div>
                        
                        <a
                          href="https://app.arboxapp.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded-lg text-white bg-ma-black font-medium hover:bg-ma-black/80 transition ${
                            cls.currentParticipants >= cls.maxParticipants ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => {
                            if (cls.currentParticipants >= cls.maxParticipants) {
                              e.preventDefault()
                            }
                          }}
                        >
                          הרשמה
                        </a>
                      </div>
                    </div>
                    
                    {/* Participants indicator */}
                    <div className="mt-3 flex items-center">
                      <div className="flex-grow h-2 bg-ma-gray/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            cls.currentParticipants >= cls.maxParticipants 
                              ? 'bg-red-500'
                              : cls.currentParticipants >= cls.maxParticipants * 0.8
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${(cls.currentParticipants / cls.maxParticipants) * 100}%` }}
                        />
                      </div>
                      <span className="mr-3 text-sm text-ma-black/70">
                        {cls.currentParticipants}/{cls.maxParticipants} משתתפים
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg className="w-16 h-16 mx-auto text-ma-gray/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-ma-black mb-2">אין שיעורים זמינים</h3>
              <p className="text-ma-black/70">לא נמצאו שיעורים העונים לקריטריונים שנבחרו. נסו לשנות את הסינון או לבחור יום אחר.</p>
            </div>
          )}
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-ma-black/70 mb-4">מעוניינים בשיעור פרטי? אנחנו כאן בשבילכם</p>
          <a 
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-ma-primary text-white rounded-full font-medium shadow-lg shadow-ma-primary/20 hover:shadow-ma-primary/30 hover:bg-ma-primary/90 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            צרו קשר עכשיו
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 