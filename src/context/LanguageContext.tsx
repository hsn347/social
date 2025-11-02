import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../locales/translations';
import { translations } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Auto-detect system language
  useEffect(() => {
    const detectLanguage = () => {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && ['en', 'ar', 'tr'].includes(savedLang)) {
        setLanguage(savedLang);
        return;
      }

      const systemLang = navigator.language.toLowerCase();
      
      if (systemLang.startsWith('ar')) {
        setLanguage('ar');
      } else if (systemLang.startsWith('tr')) {
        setLanguage('tr');
      } else {
        setLanguage('en');
      }
    };

    detectLanguage();
  }, []);

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
