import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email({ message: 'Digite um e-mail válido' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória'),
});

export const registerSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cpfCnpj: z
    .string({ message: 'CPF/CNPJ é obrigatório' })
    .min(1, 'CPF/CNPJ é obrigatório')
    .min(11, 'CPF/CNPJ inválido')
    .refine((val: string) => {
      const cleaned = val.replace(/\D/g, '');
      if (cleaned.length === 11) {
        return isValidCPF(cleaned);
      } else if (cleaned.length === 14) {
        return isValidCNPJ(cleaned);
      }
      return false;
    }, 'CPF/CNPJ inválido'),
  phone: z.string().optional(),
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email({ message: 'Digite um e-mail válido' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[@#$%^&+=]/, 'Deve conter pelo menos um caractere especial (@#$%^&+=)')
    .regex(/^\S+$/, 'A senha não pode conter espaços'),
  birthDate: z.string().optional(),
});

// Helper functions for CPF/CNPJ validation
function isValidCPF(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

function isValidCNPJ(cnpj: string): boolean {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  
  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

