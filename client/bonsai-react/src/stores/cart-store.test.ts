import { describe, it, expect, beforeEach } from 'vitest';

import { useCartStore } from '@/stores/cart-store';

describe('cart-store', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      itemCount: 0,
      total: 0,
    });
  });

  it('should initialize with empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.itemCount).toBe(0);
    expect(state.total).toBe(0);
  });

  it('should set cart correctly', () => {
    const mockItems = [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Test Product',
          description: 'Description',
          price: 100,
          imageUrl: 'image.jpg',
          category: 'Test',
          stock: 10,
          featured: false,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        quantity: 2,
        unitPrice: 100,
        totalPrice: 200,
      },
    ];

    useCartStore.getState().setCart(mockItems);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.itemCount).toBe(2);
    expect(state.total).toBe(200);
  });

  it('should clear cart correctly', () => {
    const mockItems = [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Test Product',
          description: 'Description',
          price: 100,
          imageUrl: 'image.jpg',
          category: 'Test',
          stock: 10,
          featured: false,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        quantity: 2,
        unitPrice: 100,
        totalPrice: 200,
      },
    ];

    useCartStore.getState().setCart(mockItems);
    useCartStore.getState().clearCart();

    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.itemCount).toBe(0);
    expect(state.total).toBe(0);
  });
});
