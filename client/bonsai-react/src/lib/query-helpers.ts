/**
 * Helper para configurar retry em queries do React Query
 */
export const getRetryConfig = (maxRetries: number = 2) => ({
  retry: (failureCount: number, error: any) => {
    // Não fazer retry em erros de autenticação (401)
    if (error?.response?.status === 401) {
      return false;
    }

    // Não fazer retry em erros de validação (400, 422)
    if (error?.response?.status === 400 || error?.response?.status === 422) {
      return false;
    }

    // Não fazer retry em erros 403 (forbidden)
    if (error?.response?.status === 403) {
      return false;
    }

    // Fazer retry apenas em erros de rede ou servidor (500+)
    return failureCount < maxRetries;
  },
  retryDelay: (attemptIndex: number) => {
    // Exponential backoff: 1s, 2s, 4s...
    return Math.min(1000 * 2 ** attemptIndex, 30000);
  },
});

/**
 * Helper para extrair mensagem de erro de requisições
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'Erro desconhecido';

  const anyError = error as any;

  // Mensagem customizada do interceptor
  if (anyError.userMessage) {
    return anyError.userMessage;
  }

  // Mensagem da resposta da API
  if (anyError.response?.data) {
    const data = anyError.response.data;
    return data.message || data.error || data.mensagem || 'Erro desconhecido';
  }

  // Mensagem do erro
  if (anyError.message) {
    return anyError.message;
  }

  return 'Erro desconhecido';
};
