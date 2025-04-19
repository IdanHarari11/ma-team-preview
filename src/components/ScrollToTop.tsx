'use client';

import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // בדיקת מיקום הגלילה והצגת/הסתרת הכפתור בהתאם
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // גלילה לראש העמוד בלחיצה על הכפתור
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-ma-primary text-white shadow-md transition-all hover:bg-ma-primary/80 focus:outline-none"
          aria-label="גלול לראש העמוד"
        >
          <IoIosArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 