import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { AddToCartRequest, UpdateCartItemRequest, Cart } from '@/types/cart.types';
import { cartApi } from '@/api/cart-api';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAuthenticated } = useAuthStore();
  const { items, itemCount, total, setCart, clearCart: clearLocalCart } = useCartStore();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!isAuthenticated) {
        return null;
      }
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
      toast.success('Produto adicionado ao carrinho!');
    },
    onError: (error: AxiosError) => {
      // Erro 403 - Não autenticado
      if (error.response?.status === 403) {
        toast.error('Acesso negado', 'Realize o login para adicionar produtos ao carrinho.');
        return;
      }
      
      // Outros erros
      const message = (error as any).userMessage || 'Erro ao adicionar produto';
      toast.error('Erro no carrinho', message);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemRequest }) =>
      cartApi.updateItem(itemId, data),
    onSuccess: (data: Cart) => {
      setCart(data.items);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Quantidade atualizada');
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao atualizar quantidade';
      toast.error('Erro no carrinho', message);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (data: Cart) => {
      setCart(data.items);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Produto removido do carrinho');
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao remover produto';
      toast.error('Erro no carrinho', message);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => {
      clearLocalCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrinho limpo com sucesso');
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao limpar carrinho';
      toast.error('Erro no carrinho', message);
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
