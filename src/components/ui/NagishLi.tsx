'use client';

import { useEffect } from 'react';

export default function NagishLi() {
  useEffect(() => {
    const isNagishLiLoaded = document.querySelector("#NagishLiBar");
    if (isNagishLiLoaded) {
      return;
    }
    const script = document.createElement("script");
    script.src = "/js/nagishli.js"; // תיקון הנתיב - הקובץ נמצא בתיקיית /js/
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setTimeout(() => {
        const nagishLiBar = document.querySelector("#NagishLiBar");
        if (nagishLiBar) {
          (nagishLiBar as HTMLElement).style.position = "fixed";
          (nagishLiBar as HTMLElement).style.bottom = "80px";
          (nagishLiBar as HTMLElement).style.right = "20px";
          (nagishLiBar as HTMLElement).style.left = "auto";
          (nagishLiBar as HTMLElement).style.zIndex = "9999";
          (nagishLiBar as HTMLElement).style.top = "auto";
        }
      }, 10);
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // קומפוננטה ללא רינדור נראה לעין
  return null;
} 