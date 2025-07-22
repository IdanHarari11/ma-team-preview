'use client'

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import translations from '../../lib/i18n/translations.json';

interface LanguageContextProps {
  language: 'he' | 'en';
  setLanguage: (lang: 'he' | 'en') => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<'he' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'he' | 'en') || 'he';
    }
    return 'he';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const setLanguage = useCallback((lang: 'he' | 'en') => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const t = useCallback((key: string) => {
    return (
      (translations as any)?.[language]?.[key] || key
    );
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 