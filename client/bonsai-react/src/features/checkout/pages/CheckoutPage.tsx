import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import type { CartItem } from '@/types/cart.types';
import { useCreateOrder } from '@/hooks/use-orders';
import { useAddressByCEP } from '@/hooks/use-address';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/constants/routes';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import { maskCEP, maskCreditCard, maskCardExpiry, maskCVV } from '@/utils/input-masks';
import type { PaymentMethod } from '@/types/order.types';
import {
  shippingSchema,
  paymentSchema,
  type ShippingFormData,
  type PaymentFormData,
} from '../schemas/checkout.schemas';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuthStore();
  const createOrderMutation = useCreateOrder();
  const [zipCodeQuery, setZipCodeQuery] = useState('');
  const SHIPPING_COST = 15.0;

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'CREDIT_CARD',
    },
  });

  const addressQuery = useAddressByCEP(zipCodeQuery);

  const handleCEPBlur = () => {
    const zipCode = shippingForm.getValues('zipCode');
    if (zipCode && zipCode.length === 9) {
      setZipCodeQuery(zipCode);
      if (addressQuery.data) {
        shippingForm.setValue('street', addressQuery.data.logradouro);
        shippingForm.setValue('neighborhood', addressQuery.data.bairro);
        shippingForm.setValue('city', addressQuery.data.localidade);
        shippingForm.setValue('state', addressQuery.data.uf);
      }
    }
  };

  const handleShippingSubmit = () => {
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    setStep('review');
  };

  const handleConfirmOrder = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Erro', 'Você precisa estar logado para finalizar o pedido');
      navigate(ROUTES.LOGIN);
      return;
    }

    const shippingData = shippingForm.getValues();
    const paymentData = paymentForm.getValues();

    const orderData = {
      deliveryAddress: {
        street: shippingData.street,
        number: shippingData.number,
        complement: shippingData.complement || '',
        neighborhood: shippingData.neighborhood,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
      },
      paymentMethod: paymentData.paymentMethod as PaymentMethod,
      shippingCost: SHIPPING_COST,
      orderItems: items.map((item: CartItem) => ({
        product: {
          id: item.product.id,
        },
        quantity: item.quantity,
      })),
    };

    try {
      await createOrderMutation.mutateAsync(orderData);
      clearCart();
      toast.success('Pedido realizado com sucesso!');
      navigate(ROUTES.ORDERS);
    } catch (error) {
      toast.error('Erro ao criar pedido', 'Tente novamente');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Carrinho vazio</h1>
        <Button onClick={() => navigate(ROUTES.PRODUCTS)}>Ver Produtos</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Finalizar Compra</h1>

      {/* Steps */}
      <div className="mb-8 flex justify-center space-x-4">
        <div
          className={`flex items-center ${
            step === 'shipping' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2">
            1
          </span>
          <span>Entrega</span>
        </div>
        <div
          className={`flex items-center ${
            step === 'payment' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2">
            2
          </span>
          <span>Pagamento</span>
        </div>
        <div
          className={`flex items-center ${
            step === 'review' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2">
            3
          </span>
          <span>Revisão</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle>Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-4">
                  <Input
                    label="CEP"
                    fullWidth
                    error={shippingForm.formState.errors.zipCode?.message}
                    {...shippingForm.register('zipCode')}
                    onBlur={handleCEPBlur}
                    onChange={(e) => {
                      e.target.value = maskCEP(e.target.value);
                      shippingForm.setValue('zipCode', e.target.value);
                    }}
                  />

                  <Input
                    label="Logradouro"
                    fullWidth
                    error={shippingForm.formState.errors.street?.message}
                    {...shippingForm.register('street')}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Número"
                      fullWidth
                      error={shippingForm.formState.errors.number?.message}
                      {...shippingForm.register('number')}
                    />
                    <Input
                      label="Complemento"
                      fullWidth
                      {...shippingForm.register('complement')}
                    />
                  </div>

                  <Input
                    label="Bairro"
                    fullWidth
                    error={shippingForm.formState.errors.neighborhood?.message}
                    {...shippingForm.register('neighborhood')}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cidade"
                      fullWidth
                      error={shippingForm.formState.errors.city?.message}
                      {...shippingForm.register('city')}
                    />
                    <Input
                      label="Estado"
                      fullWidth
                      maxLength={2}
                      error={shippingForm.formState.errors.state?.message}
                      {...shippingForm.register('state')}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Continuar para Pagamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="CREDIT_CARD"
                        {...paymentForm.register('paymentMethod')}
                      />
                      <span>Cartão de Crédito</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="DEBIT_CARD"
                        {...paymentForm.register('paymentMethod')}
                      />
                      <span>Cartão de Débito</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" value="PIX" {...paymentForm.register('paymentMethod')} />
                      <span>PIX</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="BOLETO"
                        {...paymentForm.register('paymentMethod')}
                      />
                      <span>Boleto</span>
                    </label>
                  </div>

                  {(paymentForm.watch('paymentMethod') === 'CREDIT_CARD' ||
                    paymentForm.watch('paymentMethod') === 'DEBIT_CARD') && (
                    <>
                      <Input
                        label="Número do Cartão"
                        fullWidth
                        {...paymentForm.register('cardNumber')}
                        onChange={(e) => {
                          e.target.value = maskCreditCard(e.target.value);
                          paymentForm.setValue('cardNumber', e.target.value);
                        }}
                      />
                      <Input
                        label="Nome do Titular"
                        fullWidth
                        {...paymentForm.register('cardHolder')}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Validade (MM/AA)"
                          fullWidth
                          {...paymentForm.register('cardExpiry')}
                          onChange={(e) => {
                            e.target.value = maskCardExpiry(e.target.value);
                            paymentForm.setValue('cardExpiry', e.target.value);
                          }}
                        />
                        <Input
                          label="CVV"
                          fullWidth
                          {...paymentForm.register('cardCvv')}
                          onChange={(e) => {
                            e.target.value = maskCVV(e.target.value);
                            paymentForm.setValue('cardCvv', e.target.value);
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={() => setStep('shipping')}
                    >
                      Voltar
                    </Button>
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Continuar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{shippingForm.getValues('street')}, {shippingForm.getValues('number')}</p>
                  {shippingForm.getValues('complement') && (
                    <p>{shippingForm.getValues('complement')}</p>
                  )}
                  <p>
                    {shippingForm.getValues('neighborhood')} - {shippingForm.getValues('city')}/
                    {shippingForm.getValues('state')}
                  </p>
                  <p>CEP: {shippingForm.getValues('zipCode')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    <span>
                      {paymentForm.getValues('paymentMethod').replaceAll('_', ' ')}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setStep('payment')}
                >
                  Voltar
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleConfirmOrder}
                  isLoading={createOrderMutation.isPending}
                >
                  Confirmar Pedido
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>{formatCurrencyBRL(item.totalPrice)}</span>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrencyBRL(total)}</span>
                </div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Frete</span>
                  <span>{formatCurrencyBRL(SHIPPING_COST)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrencyBRL(total + SHIPPING_COST)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
