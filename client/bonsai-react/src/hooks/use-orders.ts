import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateOrderRequest } from '@/types/order.types';
import type { PaginationParams } from '@/types/api.types';
import { orderApi } from '@/api/order-api';

export const useOrders = (pagination?: PaginationParams) => {
  return useQuery({
    queryKey: ['orders', pagination],
    queryFn: () => orderApi.getAll(pagination),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
