/**
 * Calcula o preço com desconto aplicado
 * @param original - Preço original
 * @param percent - Percentual de desconto
 * @returns Preço final com desconto aplicado
 */
export const calculateDiscountedPrice = (
  original: number,
  percent: number
): number => {
  return original - (original * percent / 100);
};
