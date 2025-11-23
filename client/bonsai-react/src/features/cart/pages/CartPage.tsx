import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/currency';
import './CartPage.css';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, itemCount, total, updateItem, removeItem, isUpdatingItem, isRemovingItem } = useCart();
  const { t } = useTranslation();

  const handleUpdateQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;

      updateItem(itemId, { quantity: newQuantity });
    },
    [updateItem]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem(itemId);
    },
    [removeItem]
  );

  if (itemCount === 0) {
    return (
      <div className="cart-empty">
        <ShoppingBag className="cart-empty-icon" />
        <h1 className="cart-empty-title">
          {t('cart.emptyTitle')}
        </h1>
        <p className="cart-empty-text">
          {t('cart.emptyDescription')}
        </p>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="primary" size="lg">
            {t('cart.viewProducts')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Card className="cart-card">
        <CardHeader className="cart-header">
          <CardTitle className="cart-title">{t('cart.title')}</CardTitle>
        </CardHeader>
        <CardContent className="cart-content">
          <div className="cart-grid">
            {/* Cart Items */}
            <div className="cart-items">
              {/* Table Header */}
              <div className="cart-table-header">
                <div className="cart-table-header-product">{t('cart.product')}</div>
                <div className="cart-table-header-remove"></div>
                <div className="cart-table-header-price">{t('cart.price')}</div>
                <div className="cart-table-header-quantity">{t('cart.quantity')}</div>
                <div className="cart-table-header-total">{t('cart.total')}</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image-wrapper">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                  </div>
                  
                  <div className="cart-item-name">
                    {item.product.name}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isRemovingItem}
                    className="cart-item-remove"
                  >
                    <Trash2 />
                  </Button>

                  <div className="cart-item-price">
                    {formatCurrencyBRL(item.unitPrice)}
                  </div>

                  <div className="cart-item-quantity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isUpdatingItem}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdatingItem}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="cart-item-total">
                    {formatCurrencyBRL(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="order-summary">
                <CardHeader className="order-summary-header">
                  <CardTitle className="order-summary-title">{t('cart.orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent className="order-summary-content">
                  <div className="order-summary-row">
                    <span>{t('cart.subtotal', { count: itemCount })}</span>
                    <span className="order-summary-row-value">{formatCurrencyBRL(total)}</span>
                  </div>
                  
                  <div className="order-summary-row">
                    <span>{t('cart.shipping')}</span>
                    <span className="order-summary-row-small">{t('cart.shippingCalculated')}</span>
                  </div>

                  <div className="order-summary-total">
                    <span className="order-summary-total-label">{t('cart.total')}</span>
                    <span className="order-summary-total-value">{formatCurrencyBRL(total)}</span>
                  </div>

                  <div className="order-summary-actions">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => navigate(ROUTES.CHECKOUT)}
                    >
                      {t('cart.checkout')}
                    </Button>

                    <Link to={ROUTES.PRODUCTS}>
                      <Button variant="outline" size="md" fullWidth>
                        {t('cart.continueShopping')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
