import type { Address } from './user.types';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO';

export interface Order {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  orderDate: string;
  status: OrderStatus;         
  deliveryAddress?: Address;   
  paymentMethod?: PaymentMethod;
  subtotal: number;            
  shippingCost: number;        
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderRequest {
  userid: string;
  items: {
    productid: string;
    quantity: number;
  }[];
  deliveryAddress?: Address;    // 🔄 RESTAURADO - Backend precisa aceitar
  paymentMethod?: PaymentMethod; // 🔄 RESTAURADO - Backend precisa aceitar
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}
