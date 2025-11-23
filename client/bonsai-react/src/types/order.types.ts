import type { Address } from './user.types';
import type { Product } from './product.types';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO';

export interface Order {
  id: string;
  orderDate: string;
  userId: string;
  totalPrice: number;
  subtotal: number;
  shippingCost: number;
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  orderDate: string;
  orderItems: {
    productId: string;
    quantity: number;
  }[];
  deliveryAddress: {
    street: string;
    number: string;
    zipCode: string;
    neighborhood: string;
    city: string;
    state: string;
    complement?: string;
  };
  paymentMethod: PaymentMethod;
  shippingCost: number;
}

export interface OrdersResponse {
  content: Order[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  last: boolean;
  first: boolean;
}
