/**
 * Formata um valor numérico para o formato de moeda brasileira (BRL)
 * @param value - Valor numérico ou string a ser formatado
 * @returns String formatada em moeda brasileira
 */
export const formatCurrencyBRL = (value: number | string): string => {
  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
};
