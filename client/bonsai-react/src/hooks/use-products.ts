import { useQuery } from '@tanstack/react-query';

import type { ProductFilters } from '@/types/product.types';
import type { PaginationParams } from '@/types/api.types';
import { productApi } from '@/api/product-api';
import { getRetryConfig } from '@/lib/query-helpers';

export const useProducts = (filters?: ProductFilters, pagination?: PaginationParams) => {
  return useQuery({
    queryKey: ['products', filters, pagination],
    queryFn: () => productApi.getAll(filters, pagination),
    ...getRetryConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    ...getRetryConfig(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useProductsByCategory = (category: string, pagination?: PaginationParams) => {
  return useQuery({
    queryKey: ['products', 'category', category, pagination],
    queryFn: () => productApi.getByCategory(category, pagination),
    enabled: !!category,
    ...getRetryConfig(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productApi.getFeatured(),
    ...getRetryConfig(),
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productApi.getCategories(),
    ...getRetryConfig(),
    staleTime: 30 * 60 * 1000, 
  });
};
