import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { AddToCartRequest, UpdateCartItemRequest, Cart } from '@/types/cart.types';
import { cartApi } from '@/api/cart-api';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { ErrorTranslator } from '@/utils/error-translator';

export const useCart = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { items, itemCount, total, setCart, clearCart: clearLocalCart } = useCartStore();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const data = await cartApi.get();
      setCart(data.items);
      return data;
    },
    enabled: isAuthenticated,
    retry: 1,
  });

  const addItemMutation = useMutation({
    mutationFn: (data: AddToCartRequest) => cartApi.addItem(data),
    onSuccess: (data: Cart) => {
      setCart(data.items);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('cart.messages.addSuccess'));
    },
    onError: (error: AxiosError) => {
      if (ErrorTranslator.isSessionExpired(error)) {
        toast.error(
          t('cart.messages.sessionExpired'),
          t('cart.messages.sessionExpiredDescription')
        );
        return;
      }

      if (ErrorTranslator.isAccessDenied(error)) {
        toast.error(
          t('cart.messages.accessDenied'),
          t('cart.messages.accessDeniedDescription')
        );
        return;
      }

      const message = ErrorTranslator.getErrorMessage(error) || t('cart.messages.error');
      toast.error(t('cart.messages.error'), message);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemRequest }) =>
      cartApi.updateItem(itemId, data),
    onSuccess: (data: Cart) => {
      setCart(data.items);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('cart.messages.quantityUpdated'));
    },
    onError: (error: AxiosError) => {
      console.error('Erro ao atualizar item do carrinho:', error);
      const message = ErrorTranslator.getErrorMessage(error) || t('cart.messages.error');
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (data: Cart) => {
      setCart(data.items);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('cart.messages.removeSuccess'));
    },
    onError: (error: AxiosError) => {
      console.error('Erro ao remover item do carrinho:', error);

      if (error.response?.status === 404) {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success(t('cart.messages.removeSuccess'));
        return;
      }

      const message = ErrorTranslator.getErrorMessage(error) || t('cart.messages.error');
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      clearLocalCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('cart.messages.clearSuccess'));
    },
    onError: (error: AxiosError) => {
      const message = ErrorTranslator.getErrorMessage(error) || t('cart.messages.error');
      toast.error(t('cart.messages.error'), message);
    },
  });

  return {
    items,
    itemCount,
    total,
    isLoading: cartQuery.isLoading,
    addItem: addItemMutation.mutate,
    updateItem: (itemId: string, data: UpdateCartItemRequest) =>
      updateItemMutation.mutate({ itemId, data }),
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingItem: addItemMutation.isPending,
    isUpdatingItem: updateItemMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
