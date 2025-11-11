import { describe, it, expect } from 'vitest';

import { calculateDiscountedPrice } from '@/utils/discount';

describe('discount utils', () => {
  describe('calculateDiscountedPrice', () => {
    it('should calculate discounted price correctly', () => {
      expect(calculateDiscountedPrice(100, 10)).toBe(90);
      expect(calculateDiscountedPrice(200, 25)).toBe(150);
      expect(calculateDiscountedPrice(50, 50)).toBe(25);
    });

    it('should handle zero discount', () => {
      expect(calculateDiscountedPrice(100, 0)).toBe(100);
    });

    it('should handle 100% discount', () => {
      expect(calculateDiscountedPrice(100, 100)).toBe(0);
    });

    it('should handle decimal values', () => {
      const result = calculateDiscountedPrice(99.99, 33);
      expect(result).toBeCloseTo(66.99, 2);
    });
  });
});
