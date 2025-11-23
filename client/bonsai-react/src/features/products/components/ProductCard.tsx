import { memo, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { formatCurrencyBRL } from '@/utils/currency';
import type { Product } from '@/types/product.types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCardComponent = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Format price
  const formattedPrice = useMemo(() => formatCurrencyBRL(product.price), [product.price]);

  // Memoize event handler
  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart?.(product);
    },
    [onAddToCart, product]
  );

  // Calculate discount price
  const hasDiscount = product.discount != null && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const formattedDiscountedPrice = useMemo(() => formatCurrencyBRL(discountedPrice), [discountedPrice]);

  const handleViewDetails = () => {
    navigate(ROUTES.PRODUCT_DETAIL(product.id));
  };

  return (
    <div className={hasDiscount ? 'product-card' : 'product-card no-discount'}>
      {hasDiscount && (
        <span className="discount-badge">
          -{product.discount}%
        </span>
      )}
      
      <button 
        className="product-image" 
        onClick={handleViewDetails}
        aria-label={t('products.viewDetailsOf', { name: product.name })}
      >
        <img src={product.imageUrl} alt={product.name} />
      </button>

      <div className="product-info">
        <span className="product-category">{product.category.name}</span>
        <h3 className="product-name-card">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price">
          {hasDiscount && (
            <span className="original-price">{formattedPrice}</span>
          )}
          <span className={hasDiscount ? 'discounted-price' : ''}>
            {hasDiscount ? formattedDiscountedPrice : formattedPrice}
          </span>
        </div>

        <div className="product-actions">
          {onAddToCart && (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              {t('products.addToCart')}
            </button>
          )}
          
          <button className="view-details-btn" onClick={handleViewDetails}>
            {t('products.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent);
