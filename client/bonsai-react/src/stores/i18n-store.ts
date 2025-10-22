import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'pt' | 'en';

interface I18nState {
  language: Language;
  translations: Record<string, string>;
  setLanguage: (language: Language) => void;
  loadTranslations: (translations: Record<string, string>) => void;
  t: (key: string) => string;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'pt',
      translations: {},

      setLanguage: (language) => set({ language }),

      loadTranslations: (translations) => set({ translations }),

      t: (key) => {
        const { translations } = get();
        return translations[key] || key;
      },
    }),
    {
      name: 'i18n-storage',
    }
  )
);
