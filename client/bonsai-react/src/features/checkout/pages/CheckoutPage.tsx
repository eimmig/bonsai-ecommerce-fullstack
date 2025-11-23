import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useCreateOrder } from '@/hooks/use-orders';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import { maskCreditCard, maskCardExpiry, maskCVV } from '@/utils/input-masks';
import type { CreateOrderRequest } from '@/types/order.types';
import type { Address } from '@/types/user.types';
import { shippingApi, type ShippingOption } from '@/api/shipping-api';
import { AddressSelector } from '../components/AddressSelector';
import { CreditCardPreview } from '../components/CreditCardPreview';
import {
  paymentSchema,
  type PaymentFormData,
} from '../schemas/checkout.schemas';
import './CheckoutPage.css';

// CEP da origem (sua loja)
const ORIGIN_ZIP_CODE = '85501288';

export const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressError, setAddressError] = useState<string>('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState<string>('');
  const [focusedCardField, setFocusedCardField] = useState<'number' | 'holder' | 'expiry' | 'cvv' | null>(null);

  const { items, total, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'CREDIT_CARD',
    },
  });

  // Calcula frete quando o endereço é selecionado
  useEffect(() => {
    const calculateShipping = async () => {
      if (selectedAddress && total > 0) {
        setIsCalculatingShipping(true);
        setShippingError('');
        setShippingOptions([]);
        setSelectedShippingOption(null);
        
        try {
          const response = await shippingApi.calculate({
            zipCodeOrigin: ORIGIN_ZIP_CODE,
            zipCodeDestination: selectedAddress.zipCode,
            weight: 4000, // 4kg padrão
            width: 50,    // 50cm
            height: 50,   // 50cm
            depth: 16,    // 16cm
          });
          
          if (response.options && response.options.length > 0) {
            setShippingOptions(response.options);
            // Seleciona automaticamente a primeira opção
            setSelectedShippingOption(response.options[0]);
          } else {
            setShippingError(t('checkout.shipping.noOptions'));
          }
        } catch (error) {
          console.error('Erro ao calcular frete:', error);
          setShippingError(t('checkout.shipping.error'));
        } finally {
          setIsCalculatingShipping(false);
        }
      }
    };

    calculateShipping();
  }, [selectedAddress, total]);

  const handleShippingSubmit = () => {
    if (!selectedAddress) {
      setAddressError(t('checkout.selectAddressError'));
      return;
    }
    setAddressError('');
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    setStep('review');
  };

  const handleConfirmOrder = () => {
    if (!isAuthenticated || !user) {
      toast.error(t('checkout.loginRequired'));
      navigate(ROUTES.LOGIN);
      return;
    }

    if (!selectedAddress) {
      toast.error(t('checkout.selectAddressError'));
      setStep('shipping');
      return;
    }

    if (!selectedShippingOption) {
      toast.error(t('checkout.selectShippingError'));
      setStep('shipping');
      return;
    }

    const paymentData = paymentForm.getValues();

    const orderRequest: CreateOrderRequest = {
      orderDate: new Date().toISOString(),
      orderItems: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      deliveryAddress: {
        street: selectedAddress.street,
        number: selectedAddress.number,
        zipCode: selectedAddress.zipCode,
        neighborhood: selectedAddress.neighborhood,
        city: selectedAddress.city,
        state: selectedAddress.state,
        complement: selectedAddress.complement,
      },
      paymentMethod: paymentData.paymentMethod,
      shippingCost: selectedShippingOption.price,
    };

    createOrderMutation.mutate(orderRequest, {
      onSuccess: () => {
        clearCart();
        toast.success(t('checkout.orderSuccess'));
        navigate(ROUTES.ORDERS);
      },
      onError: (error: Error) {
        const message = (error as any).userMessage || t('checkout.orderError');
        toast.error(message);
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h1 className="checkout-empty-title">{t('checkout.emptyCart')}</h1>
        <Button onClick={() => navigate(ROUTES.PRODUCTS)}>{t('checkout.viewProducts')}</Button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">{t('checkout.title')}</h1>

      {/* Steps */}
      <div className="checkout-steps">
        <div className={`checkout-step ${step === 'shipping' ? 'active' : ''}`}>
          <span className="checkout-step-number">1</span>
          <span>{t('checkout.steps.shipping')}</span>
        </div>
        <div className={`checkout-step ${step === 'payment' ? 'active' : ''}`}>
          <span className="checkout-step-number">2</span>
          <span>{t('checkout.steps.payment')}</span>
        </div>
        <div className={`checkout-step ${step === 'review' ? 'active' : ''}`}>
          <span className="checkout-step-number">3</span>
          <span>{t('checkout.steps.review')}</span>
        </div>
      </div>

      <div className="checkout-grid">
        <div className="checkout-main">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.deliveryAddress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <AddressSelector
                  selectedAddressId={selectedAddress?.id}
                  onSelectAddress={setSelectedAddress}
                  error={addressError}
                />
                <div className="continue-button">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleShippingSubmit}
                  >
                    {t('checkout.continueToPayment')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Step */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.paymentMethod')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="payment-form">
                  <div className="payment-methods">
                    <label className="payment-method-option">
                      <input
                        type="radio"
                        value="CREDIT_CARD"
                        {...paymentForm.register('paymentMethod')}
                      />
                      <span>{t('checkout.payment.creditCard')}</span>
                    </label>
                    <label className="payment-method-option">
                      <input type="radio" value="PIX" {...paymentForm.register('paymentMethod')} />
                      <span>{t('checkout.payment.pix')}</span>
                    </label>
                    <label className="payment-method-option">
                      <input
                        type="radio"
                        value="BOLETO"
                        {...paymentForm.register('paymentMethod')}
                      />
                      <span>{t('checkout.payment.boleto')}</span>
                    </label>
                  </div>

                  {paymentForm.watch('paymentMethod') === 'CREDIT_CARD' && (
                    <>
                      <div className="payment-card-fields">
                        <Input
                          label={t('checkout.payment.cardNumber')}
                          placeholder="0000 0000 0000 0000"
                          {...paymentForm.register('cardNumber')}
                          onChange={(e) => {
                            e.target.value = maskCreditCard(e.target.value);
                            paymentForm.setValue('cardNumber', e.target.value);
                          }}
                          onFocus={() => setFocusedCardField('number')}
                          onBlur={() => setFocusedCardField(null)}
                        />
                        <Input
                          label={t('checkout.payment.cardHolder')}
                          placeholder={t('checkout.payment.cardHolderPlaceholder')}
                          {...paymentForm.register('cardHolder')}
                          onFocus={() => setFocusedCardField('holder')}
                          onBlur={() => setFocusedCardField(null)}
                        />
                        <div className="payment-card-row">
                          <div className="payment-card-col">
                            <Input
                              label={t('checkout.payment.expiry')}
                              placeholder="MM/AA"
                              {...paymentForm.register('cardExpiry')}
                              onChange={(e) => {
                                e.target.value = maskCardExpiry(e.target.value);
                                paymentForm.setValue('cardExpiry', e.target.value);
                              }}
                              onFocus={() => setFocusedCardField('expiry')}
                              onBlur={() => setFocusedCardField(null)}
                            />
                          </div>
                          <div className="payment-card-col">
                            <Input
                              label={t('checkout.payment.cvv')}
                              placeholder="123"
                              {...paymentForm.register('cardCvv')}
                              onChange={(e) => {
                                e.target.value = maskCVV(e.target.value);
                                paymentForm.setValue('cardCvv', e.target.value);
                              }}
                              onFocus={() => setFocusedCardField('cvv')}
                              onBlur={() => setFocusedCardField(null)}
                            />
                          </div>
                        </div>
                      </div>
                      <CreditCardPreview
                        cardNumber={paymentForm.watch('cardNumber') || ''}
                        cardHolder={paymentForm.watch('cardHolder') || ''}
                        cardExpiry={paymentForm.watch('cardExpiry') || ''}
                        cardCvv={paymentForm.watch('cardCvv') || ''}
                        focusedField={focusedCardField}
                      />
                    </>
                  )}

                  <div className="payment-actions">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={() => setStep('shipping')}
                    >
                      {t('common.back')}
                    </Button>
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      {t('common.next')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Review Step */}
          {step === 'review' && selectedAddress && (
            <div className="review-section">
              <Card>
                <CardHeader>
                  <CardTitle>{t('checkout.deliveryAddress')}</CardTitle>
                </CardHeader>
                <CardContent className="review-address">
                  <p>{selectedAddress.street}, {selectedAddress.number}</p>
                  {selectedAddress.complement && (
                    <p>{selectedAddress.complement}</p>
                  )}
                  <p>
                    {selectedAddress.neighborhood} - {selectedAddress.city}/
                    {selectedAddress.state}
                  </p>
                  <p>CEP: {selectedAddress.zipCode}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('checkout.paymentMethod')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="review-payment">
                    <CreditCard />
                    <span>
                      {paymentForm.getValues('paymentMethod').replaceAll('_', ' ')}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="review-actions">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setStep('payment')}
                >
                  {t('common.back')}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleConfirmOrder}
                  isLoading={createOrderMutation.isPending}
                >
                  {t('checkout.confirmOrder')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="order-summary-items">
                {items.map((item) => (
                  <div key={item.id} className="order-summary-item">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>{formatCurrencyBRL(item.totalPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="order-summary-shipping">
                <div className="order-summary-shipping-label">
                  <strong>{t('checkout.summary.shipping')}:</strong>
                </div>
                
                {step === 'shipping' && (
                  <>
                    {isCalculatingShipping && (
                      <div className="order-summary-shipping-loading">
                        {t('checkout.shipping.calculating')}
                      </div>
                    )}
                    
                    {!isCalculatingShipping && shippingError && (
                      <div className="order-summary-shipping-error">
                        {shippingError}
                      </div>
                    )}
                    
                    {!isCalculatingShipping && !shippingError && shippingOptions.length === 0 && (
                      <div className="order-summary-shipping-select">
                        {t('checkout.shipping.selectAddress')}
                      </div>
                    )}
                    
                    {!isCalculatingShipping && !shippingError && shippingOptions.length > 0 && (
                      <div className="order-summary-shipping-options">
                        {shippingOptions.map((option) => (
                          <label key={option.name} className="shipping-option">
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShippingOption?.name === option.name}
                              onChange={() => setSelectedShippingOption(option)}
                            />
                            <div className="shipping-option-info">
                              <span className="shipping-option-name">{option.name}</span>
                              <span className="shipping-option-time">
                                {option.deliveryTime}
                              </span>
                            </div>
                            <span className="shipping-option-price">
                              {formatCurrencyBRL(option.price)}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                {(step === 'payment' || step === 'review') && selectedShippingOption && (
                  <div className="order-summary-shipping-selected">
                    <div className="shipping-option-info">
                      <span className="shipping-option-name">{selectedShippingOption.name}</span>
                      <span className="shipping-option-time">
                        {selectedShippingOption.deliveryTime}
                      </span>
                    </div>
                    <span className="shipping-option-price">
                      {formatCurrencyBRL(selectedShippingOption.price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="order-summary-total">
                <div className="order-summary-total-row">
                  <span>{t('checkout.summary.subtotal')}</span>
                  <span>{formatCurrencyBRL(total)}</span>
                </div>
                {selectedShippingOption && (
                  <div className="order-summary-total-row">
                    <span>{t('checkout.summary.shipping')}</span>
                    <span>{formatCurrencyBRL(selectedShippingOption.price)}</span>
                  </div>
                )}
                <div className="order-summary-total-row order-summary-total-final">
                  <span>{t('checkout.summary.total')}</span>
                  <span className="order-summary-total-amount">
                    {formatCurrencyBRL(total + (selectedShippingOption?.price || 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
