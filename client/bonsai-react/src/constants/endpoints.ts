export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: 'user/profile',
  },
  PRODUCTS: {
    LIST: 'products',
    BY_ID: (id: string) => `products/${id}`,
    BY_CATEGORY: (category: string) => `products/category/${category}`,
  },
  CATEGORIES: 'categories',
  CART: {
    GET: 'cart',
    ADD: 'cart/items',
    UPDATE_ITEM: (itemId: string) => `cart/items/${itemId}`,
    REMOVE_ITEM: (itemId: string) => `cart/items/${itemId}`,
    CLEAR: 'cart',
  },
  ORDERS: {
    LIST: 'order',
    BY_ID: (id: string) => `order/${id}`,
    CREATE: 'order',
    CANCEL: (id: string) => `order/${id}/cancel`,
  },
  ADDRESSES: 'address',
} as const;
