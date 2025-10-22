import { describe, it, expect } from 'vitest';

import { formatCurrencyBRL } from '@/utils/currency';

describe('currency utils', () => {
  describe('formatCurrencyBRL', () => {
    it('should format positive numbers correctly', () => {
      const result1 = formatCurrencyBRL(100);
      expect(result1).toContain('100,00');
      expect(result1).toContain('R$');
      
      const result2 = formatCurrencyBRL(1234.56);
      expect(result2).toContain('1.234,56');
      
      const result3 = formatCurrencyBRL(0.99);
      expect(result3).toContain('0,99');
    });

    it('should format zero correctly', () => {
      const result = formatCurrencyBRL(0);
      expect(result).toContain('0,00');
      expect(result).toContain('R$');
    });

    it('should handle decimal precision', () => {
      const result1 = formatCurrencyBRL(10.5);
      expect(result1).toContain('10,50');
      
      const result2 = formatCurrencyBRL(10.123);
      expect(result2).toContain('10,12');
    });

    it('should format large numbers with thousands separator', () => {
      const result1 = formatCurrencyBRL(1000000);
      expect(result1).toContain('1.000.000,00');
      
      const result2 = formatCurrencyBRL(999999.99);
      expect(result2).toContain('999.999,99');
    });
  });
});
