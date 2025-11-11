import { describe, it, expect } from 'vitest';

import { maskCPFCNPJ, maskPhone, maskCEP, maskCreditCard } from '@/utils/input-masks';

describe('input-masks utils', () => {
  describe('maskCPFCNPJ', () => {
    it('should mask CPF correctly', () => {
      expect(maskCPFCNPJ('12345678900')).toBe('123.456.789-00');
    });

    it('should mask CNPJ correctly', () => {
      expect(maskCPFCNPJ('12345678000199')).toBe('12.345.678/0001-99');
    });

    it('should handle partial input', () => {
      expect(maskCPFCNPJ('123')).toBe('123');
      expect(maskCPFCNPJ('12345')).toBe('123.45');
    });

    it('should remove non-numeric characters', () => {
      expect(maskCPFCNPJ('123.456.789-00')).toBe('123.456.789-00');
    });
  });

  describe('maskPhone', () => {
    it('should mask phone with 11 digits correctly', () => {
      expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('should mask phone with 10 digits correctly', () => {
      expect(maskPhone('1132112345')).toBe('(11) 3211-2345');
    });

    it('should handle partial input', () => {
      expect(maskPhone('11')).toBe('11');
      expect(maskPhone('119')).toBe('(11) 9');
    });
  });

  describe('maskCEP', () => {
    it('should mask CEP correctly', () => {
      expect(maskCEP('01310100')).toBe('01310-100');
    });

    it('should handle partial input', () => {
      expect(maskCEP('01310')).toBe('01310');
    });

    it('should remove non-numeric characters', () => {
      expect(maskCEP('01310-100')).toBe('01310-100');
    });
  });

  describe('maskCreditCard', () => {
    it('should mask credit card correctly', () => {
      expect(maskCreditCard('1234567890123456')).toBe('1234 5678 9012 3456');
    });

    it('should handle partial input', () => {
      expect(maskCreditCard('1234')).toBe('1234');
      expect(maskCreditCard('12345')).toBe('1234 5');
    });

    it('should limit to 16 digits', () => {
      expect(maskCreditCard('12345678901234567890')).toBe('1234 5678 9012 3456');
    });
  });
});
