import type { Product } from './product.types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
