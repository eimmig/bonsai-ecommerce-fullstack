import type { Order, CreateOrderRequest, OrdersResponse } from '@/types/order.types';
import type { PaginationParams } from '@/types/api.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const orderApi = {
  getAll: async (pagination?: PaginationParams): Promise<OrdersResponse> => {
    const response = await apiClient.get<OrdersResponse>(ENDPOINTS.ORDERS.LIST, {
      params: pagination,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  },

  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>(ENDPOINTS.ORDERS.CREATE, data);
    return response.data;
  },

  cancel: async (id: string): Promise<Order> => {
    const response = await apiClient.patch<Order>(ENDPOINTS.ORDERS.CANCEL(id));
    return response.data;
  },
};
