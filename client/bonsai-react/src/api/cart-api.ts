import type { Cart, AddToCartRequest, UpdateCartItemRequest } from '@/types/cart.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const cartApi = {
  get: async (): Promise<Cart> => {
    const response = await apiClient.get<Cart>(ENDPOINTS.CART.GET);
    return response.data;
  },

  addItem: async (data: AddToCartRequest): Promise<Cart> => {
    const response = await apiClient.post<Cart>(ENDPOINTS.CART.ADD, data);
    return response.data;
  },

  updateItem: async (itemId: string, data: UpdateCartItemRequest): Promise<Cart> => {
    const response = await apiClient.put<Cart>(ENDPOINTS.CART.UPDATE_ITEM(itemId), data);
    return response.data;
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    const response = await apiClient.delete<Cart>(ENDPOINTS.CART.REMOVE_ITEM(itemId));
    return response.data;
  },

  clear: async (): Promise<void> => {
    await apiClient.delete(ENDPOINTS.CART.CLEAR);
  },
};
