import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem } from '@/types/cart.types';

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            const updatedItems = state.items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
                    totalPrice: (i.quantity + item.quantity) * i.unitPrice,
                  }
                : i
            );
            return {
              items: updatedItems,
              itemCount: calculateItemCount(updatedItems),
              total: calculateTotal(updatedItems),
            };
          }

          const updatedItems = [...state.items, item];
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== itemId);
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          };
        }),

      updateItemQuantity: (itemId, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity,
                  totalPrice: quantity * item.unitPrice,
                }
              : item
          );
          return {
            items: updatedItems,
            itemCount: calculateItemCount(updatedItems),
            total: calculateTotal(updatedItems),
          };
        }),

      clearCart: () => set({ items: [], itemCount: 0, total: 0 }),

      setCart: (items) =>
        set({
          items,
          itemCount: calculateItemCount(items),
          total: calculateTotal(items),
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
