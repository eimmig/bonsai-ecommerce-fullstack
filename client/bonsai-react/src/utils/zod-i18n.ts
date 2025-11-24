import { useI18nStore } from '@/stores/i18n-store';

export const translateZodError = (error: string): string => {
  const { t } = useI18nStore.getState();
  
  if (error.includes('.') && !error.includes(' ')) {
    return t(error);
  }
  
  return error;
};

export const useZodErrorTranslation = () => {
  const { t } = useI18nStore.getState();
  
  return {
    translateError: (error?: { message?: string }): string | undefined => {
      if (!error?.message) return undefined;
      
      if (error.message.includes('.') && !error.message.includes(' ')) {
        return t(error.message);
      }
      
      return error.message;
    },
  };
};
