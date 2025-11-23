import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ChevronDown } from 'lucide-react';

import { useOrders } from '@/hooks/use-orders';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { Button, Spinner, Badge } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import type { OrderStatus } from '@/types/order.types';
import './OrdersPage.css';

export const OrdersPage = () => {
  const { data: ordersResponse, isLoading } = useOrders();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const { t } = useTranslation();

  const orderStatusConfig: Record<
    OrderStatus,
    { label: string; variant: 'default' | 'success' | 'error' | 'warning'; icon: React.ReactNode }
  > = {
    PENDING: {
      label: t('orders.status.pending'),
      variant: 'warning',
      icon: <Clock className="h-4 w-4" />,
    },
    PROCESSING: {
      label: t('orders.status.processing'),
      variant: 'default',
      icon: <Package className="h-4 w-4" />,
    },
    SHIPPED: {
      label: t('orders.status.shipped'),
      variant: 'default',
      icon: <Package className="h-4 w-4" />,
    },
    DELIVERED: {
      label: t('orders.status.delivered'),
      variant: 'success',
      icon: <CheckCircle className="h-4 w-4" />,
    },
    CANCELLED: {
      label: t('orders.status.cancelled'),
      variant: 'error',
      icon: <XCircle className="h-4 w-4" />,
    },
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="orders-loading">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!ordersResponse?.content || ordersResponse.content.length === 0) {
    return (
      <div className="orders-empty">
        <Package className="orders-empty-icon" />
        <h1 className="orders-empty-title">
          {t('orders.emptyTitle')}
        </h1>
        <p className="orders-empty-text">{t('orders.emptyDescription')}</p>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">
            {t('orders.viewProducts')}
          </Button>
        </Link>
      </div>
    );
  }

  const { content: orders } = ordersResponse;

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CREDIT_CARD: t('orders.paymentMethods.creditCard'),
      DEBIT_CARD: t('orders.paymentMethods.debitCard'),
      PIX: 'PIX',
      BOLETO: t('orders.paymentMethods.boleto'),
    };
    return labels[method] || method;
  };

  return (
    <div className="orders-page">
      <div className="orders-page-header">
        <h1 className="orders-page-title">{t('orders.title')}</h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const statusConfig = orderStatusConfig[order.status];
          const isExpanded = expandedOrders.has(order.id);
          
          return (
            <div 
              key={order.id} 
              className={`order-card ${isExpanded ? 'expanded' : ''}`}
            >
              <button 
                className="order-card-header"
                onClick={() => toggleOrder(order.id)}
                aria-expanded={isExpanded}
              >
                <div className="order-header-top">
                  <div className="order-info">
                    <p className="order-id">{t('orders.orderNumber', { id: order.id.slice(0, 8) })}</p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <Badge variant={statusConfig.variant}>
                    {statusConfig.icon}
                    <span style={{ marginLeft: '0.5rem' }}>{statusConfig.label}</span>
                  </Badge>
                </div>
                
                <div className="order-header-bottom">
                  <p className="order-total">
                    {formatCurrencyBRL(order.totalPrice)}
                  </p>
                  <ChevronDown className="order-expand-icon" />
                </div>
              </button>

              <div className="order-card-content">
                <div className="order-details">
                  <div className="order-items">
                    <h3 className="order-items-title">{t('orders.items')}</h3>
                    <div className="order-items-list">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="order-item">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="order-item-image"
                          />
                          <div className="order-item-info">
                            <p className="order-item-name">{item.product.name}</p>
                            <p className="order-item-quantity">
                              {t('orders.quantity')}: {item.quantity}
                            </p>
                          </div>
                          <p className="order-item-price">
                            {formatCurrencyBRL(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-shipping-info">
                    <h3 className="order-shipping-title">{t('orders.deliveryAddress')}</h3>
                    <p className="order-shipping-address">
                      {order.deliveryAddress.street}, {order.deliveryAddress.number}
                      {order.deliveryAddress.complement && ` - ${order.deliveryAddress.complement}`}
                      <br />
                      {order.deliveryAddress.neighborhood} - {order.deliveryAddress.city}/{order.deliveryAddress.state}
                      <br />
                      CEP: {order.deliveryAddress.zipCode}
                    </p>
                  </div>

                  <div className="order-payment-info">
                    <div className="order-payment-method">
                      <span className="order-payment-label">{t('orders.payment')}</span>
                      <span className="order-payment-value">
                        {getPaymentMethodLabel(order.paymentMethod)}
                      </span>
                    </div>

                    <div className="order-summary">
                      <div className="order-summary-row">
                        <span className="order-summary-label">{t('orders.subtotal')}:</span>
                        <span className="order-summary-value">
                          {formatCurrencyBRL(order.subtotal)}
                        </span>
                      </div>
                      <div className="order-summary-row">
                        <span className="order-summary-label">{t('orders.shipping')}:</span>
                        <span className="order-summary-value">
                          {order.shippingCost > 0 
                            ? formatCurrencyBRL(order.shippingCost)
                            : t('orders.freeShipping')
                          }
                        </span>
                      </div>
                      <div className="order-summary-row order-summary-total">
                        <span className="order-summary-label">{t('orders.total')}:</span>
                        <span className="order-summary-value">
                          {formatCurrencyBRL(order.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
