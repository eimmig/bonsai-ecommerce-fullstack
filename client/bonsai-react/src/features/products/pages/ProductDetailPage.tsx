import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

import { useProduct } from '@/hooks/use-products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { SEO } from '@/components/seo';
import { formatCurrencyBRL } from '@/utils/currency';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();

  const { data: product, isLoading } = useProduct(String(id));
  const { addItem, isAddingItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock != null && product.stock < quantity) {
      toast.error(t('products.quantityUnavailable'));
      return;
    }

    addItem({
      productId: product.id,
      quantity: quantity,
    });
    
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && (!product?.stock || newQuantity <= product.stock)) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-indicator">
        <div className="spinner" />
        <p>{t('products.loadingDetails')}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h1>{t('products.notFound')}</h1>
          <button onClick={() => navigate(ROUTES.PRODUCTS)}>
            {t('products.backToProducts')}
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discount != null && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="product-detail-container">
      <SEO
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.category.name}, bonsai, comprar ${product.name}`}
        image={product.imageUrl}
        url={`/produtos/${product.id}`}
        type="product"
      />

      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        {t('common.back')}
      </button>

      <section className="product-detail">
        <div className="product-content">
          <div className="product-images">
            <div className="product-main-image">
              {hasDiscount && (
                <span className="discount-badge-detail">
                  -{product.discount}%
                </span>
              )}
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-description">
              <h2>{t('products.aboutProduct')}</h2>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="product-info">
            <span className="category-badge">{product.category.name}</span>
            <h1 className="product-title">{product.name}</h1>

            <div className="product-price-container">
              <div className="product-price-area">
                {hasDiscount ? (
                  <>
                    <span className="original-price">{formatCurrencyBRL(product.price)}</span>
                    <span className="discounted-price">{formatCurrencyBRL(discountedPrice)}</span>
                  </>
                ) : (
                  <span className="current-price">{formatCurrencyBRL(product.price)}</span>
                )}
              </div>
            </div>

            {product.stock != null && (
              <div className="stock-info">
                {product.stock > 10 && (
                  <span className="stock-available">✓ {t('products.inStock', { count: product.stock })}</span>
                )}
                {product.stock > 0 && product.stock <= 10 && (
                  <span className="stock-low">⚠ {t('products.lowStock', { count: product.stock })}</span>
                )}
                {product.stock === 0 && (
                  <span className="stock-unavailable">✗ {t('products.outOfStock')}</span>
                )}
              </div>
            )}

            <div className="quantity-selector">
              <span>{t('products.quantity')}:</span>
              <div className="quantity-input">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock || undefined}
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1 && (!product.stock || value <= product.stock)) {
                      setQuantity(value);
                    }
                  }}
                  aria-label={t('products.quantity')}
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={product.stock != null && quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={isAddingItem || (product.stock != null && product.stock === 0)}
              >
                <ShoppingCart size={20} />
                {product.stock != null && product.stock === 0 ? t('products.outOfStock') : t('products.addToCart')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
