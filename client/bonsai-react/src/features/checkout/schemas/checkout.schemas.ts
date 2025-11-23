import { z } from 'zod';

export const shippingSchema = z.object({
  zipCode: z.string().min(8, 'address.validation.zipCodeInvalid'),
  street: z.string().min(3, 'address.validation.streetRequired'),
  number: z.string().min(1, 'address.validation.numberRequired'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'address.validation.neighborhoodRequired'),
  city: z.string().min(2, 'address.validation.cityRequired'),
  state: z.string().length(2, 'address.validation.stateRequired'),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO']),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
