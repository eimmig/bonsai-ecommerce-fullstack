import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email({ message: 'Digite um e-mail válido' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cpfCnpj: z
    .string({ message: 'CPF/CNPJ é obrigatório' })
    .min(1, 'CPF/CNPJ é obrigatório')
    .min(11, 'CPF/CNPJ inválido'),
  phone: z.string().optional(),
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email({ message: 'Digite um e-mail válido' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  birthDate: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

