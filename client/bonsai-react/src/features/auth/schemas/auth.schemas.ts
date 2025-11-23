import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'auth.validation.emailRequired' })
    .min(1, 'auth.validation.emailRequired')
    .email({ message: 'auth.validation.emailInvalid' }),
  password: z
    .string({ message: 'auth.validation.passwordRequired' })
    .min(1, 'auth.validation.passwordRequired')
    .min(6, 'auth.validation.passwordMin'),
});

export const registerSchema = z.object({
  name: z
    .string({ message: 'auth.validation.nameRequired' })
    .min(2, 'auth.validation.nameMin')
    .max(100, 'auth.validation.nameMax'),
  cpfCnpj: z
    .string({ message: 'auth.validation.cpfCnpjRequired' })
    .min(1, 'auth.validation.cpfCnpjRequired')
    .refine(
      (val) => {
        const cleaned = val.replaceAll(/\D/g, '');
        return cleaned.length === 11 || cleaned.length === 14;
      },
      { message: 'auth.validation.cpfCnpjInvalid' }
    ),
  phone: z
    .string()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const cleaned = val.replaceAll(/\D/g, '');
        return cleaned.length === 10 || cleaned.length === 11;
      },
      { message: 'auth.validation.phoneInvalid' }
    )
    .optional()
    .or(z.literal('')),
  email: z
    .string({ message: 'auth.validation.emailRequired' })
    .email({ message: 'auth.validation.emailInvalid' }),
  password: z
    .string({ message: 'auth.validation.passwordRequired' })
    .min(6, 'auth.validation.passwordMin'),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'auth.validation.birthDateInvalid')
    .optional()
    .or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

