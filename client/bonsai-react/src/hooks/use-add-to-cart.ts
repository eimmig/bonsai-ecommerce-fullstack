import { useCart } from './use-cart';
import type { Product } from '@/types/product.types';

export const useAddToCart = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      quantity: 1,
    });
  };

  return { handleAddToCart };
};
