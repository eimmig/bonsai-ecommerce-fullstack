import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(3, 'auth.validation.nameMin'),
  email: z.string().email({ message: 'auth.validation.emailInvalid' }),
  phone: z.string().optional(),
  cpfCnpj: z.string().optional(),
  birthDate: z.string().optional(),
});

export const addressSchema = z.object({
  zipCode: z.string().min(8, 'address.validation.zipCodeInvalid'),
  street: z.string().min(3, 'address.validation.streetRequired'),
  number: z.string().min(1, 'address.validation.numberRequired'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'address.validation.neighborhoodRequired'),
  city: z.string().min(2, 'address.validation.cityRequired'),
  state: z.string().length(2, 'address.validation.stateRequired'),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'auth.validation.passwordMin'),
  newPassword: z.string().min(6, 'auth.validation.passwordMin'),
  confirmPassword: z.string().min(6, 'auth.validation.passwordMin'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'auth.validation.passwordMatch',
  path: ['confirmPassword'],
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
