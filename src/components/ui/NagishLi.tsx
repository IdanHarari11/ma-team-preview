'use client';

import { useEffect } from 'react';

export default function NagishLi() {
  useEffect(() => {
    // מחיקת אלמנט קיים של NagishLi אם קיים
    const existingNagishLi = document.querySelector("#NagishLiBarStrip");
    if (existingNagishLi) {
      existingNagishLi.remove();
    }

    const isNagishLiLoaded = document.querySelector("#NagishLiBar");
    if (isNagishLiLoaded) {
      return;
    }
    const script = document.createElement("script");
    script.src = "/js/nagishli.js"; // תיקון הנתיב - הקובץ נמצא בתיקיית /js/
    script.async = true;
    document.body.appendChild(script);


    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // קומפוננטה ללא רינדור נראה לעין
  return null;
} 