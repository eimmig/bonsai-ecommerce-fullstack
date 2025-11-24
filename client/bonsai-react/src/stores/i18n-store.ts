import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'pt' | 'en';

interface I18nState {
  language: Language;
  translations: Record<string, any>;
  setLanguage: (language: Language) => void;
  loadTranslations: (translations: Record<string, any>) => void;
  t: (key: string) => string;
}

const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; 
    }
  }
  
  return typeof result === 'string' ? result : path;
};

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'pt',
      translations: {},

      setLanguage: (language) => set({ language }),

      loadTranslations: (translations) => set({ translations }),

      t: (key) => {
        const { translations } = get();
        return getNestedValue(translations, key);
      },
    }),
    {
      name: 'i18n-storage',
    }
  )
);
