/**
 * Helper para configurar retry em queries do React Query
 */
export const getRetryConfig = (maxRetries: number = 2) => ({
  retry: (failureCount: number, error: any) => {
    if (error?.response?.status === 401) {
      return false;
    }

    if (error?.response?.status === 400 || error?.response?.status === 422) {
      return false;
    }

    if (error?.response?.status === 403) {
      return false;
    }

    return failureCount < maxRetries;
  },
  retryDelay: (attemptIndex: number) => {
    return Math.min(1000 * 2 ** attemptIndex, 30000);
  },
});

/**
 * Helper para extrair mensagem de erro de requisições
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'Erro desconhecido';

  const anyError = error as any;

  if (anyError.userMessage) {
    return anyError.userMessage;
  }

  if (anyError.response?.data) {
    const data = anyError.response.data;
    return data.message || data.error || data.mensagem || 'Erro desconhecido';
  }

  if (anyError.message) {
    return anyError.message;
  }

  return 'Erro desconhecido';
};
