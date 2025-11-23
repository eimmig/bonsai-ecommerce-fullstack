import { useI18nStore } from '@/stores/i18n-store';

// Intercepta mensagens de erro do Zod e traduz se for uma chave
export const translateZodError = (error: string): string => {
  const { t } = useI18nStore.getState();
  
  // Se a mensagem parece ser uma chave (contém pontos e não tem espaços)
  if (error.includes('.') && !error.includes(' ')) {
    return t(error);
  }
  
  return error;
};

// Hook para usar em formulários React Hook Form
export const useZodErrorTranslation = () => {
  const { t } = useI18nStore.getState();
  
  return {
    translateError: (error?: { message?: string }): string | undefined => {
      if (!error?.message) return undefined;
      
      // Se parece ser uma chave de tradução
      if (error.message.includes('.') && !error.message.includes(' ')) {
        return t(error.message);
      }
      
      return error.message;
    },
  };
};
