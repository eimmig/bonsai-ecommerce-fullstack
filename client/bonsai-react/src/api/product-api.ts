import type { Category, Product, ProductFilters, ProductsResponse } from '@/types/product.types';
import type { PaginationParams } from '@/types/api.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const productApi = {
  getAll: async (filters?: ProductFilters, pagination?: PaginationParams): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(ENDPOINTS.PRODUCTS.LIST, {
      params: { ...filters, ...pagination },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(ENDPOINTS.PRODUCTS.BY_ID(id));
    return response.data;
  },

  getByCategory: async (category: string, pagination?: PaginationParams): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(ENDPOINTS.PRODUCTS.BY_CATEGORY(category), {
      params: pagination,
    });
    return response.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const response = await apiClient.get<ProductsResponse>(ENDPOINTS.PRODUCTS.LIST, {
      params: { featured: true },
    });
    return response.data.content;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[] | { content: Category[] }>(ENDPOINTS.CATEGORIES);
    if (response.data && typeof response.data === 'object' && 'content' in response.data) {
      return response.data.content;
    }
    return Array.isArray(response.data) ? response.data : [];
  }
};
