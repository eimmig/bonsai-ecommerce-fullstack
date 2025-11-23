import { useEffect } from 'react';
import { useI18nStore } from '@/stores/i18n-store';
import ptTranslations from '@/translations/pt.json';
import enTranslations from '@/translations/en.json';

const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

export const useTranslation = () => {
  const { language, setLanguage, t } = useI18nStore();

  useEffect(() => {
    // Carregar traduções do idioma atual
    useI18nStore.getState().loadTranslations(translations[language]);
  }, [language]);

  const changeLanguage = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    useI18nStore.getState().loadTranslations(translations[lang]);
  };

  // Helper para tradução com interpolação
  const translate = (key: string, params?: Record<string, string | number>) => {
    let translation = t(key);
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  // Helper para traduções com plural
  const translatePlural = (key: string, count: number, params?: Record<string, string | number>) => {
    const pluralKey = count === 1 ? key : `${key}_plural`;
    return translate(pluralKey, { count, ...params });
  };

  return {
    t: translate,
    tp: translatePlural,
    language,
    changeLanguage,
  };
};
