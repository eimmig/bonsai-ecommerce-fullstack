import { Spinner } from '@/components/ui';
import type { Product } from '@/types/product.types';

import { ProductCard } from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
}

export const ProductGrid = ({ products, isLoading, onAddToCart }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="product-grid-loading">
        <Spinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
