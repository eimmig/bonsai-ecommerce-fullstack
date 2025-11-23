export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: 'user/profile',
    CREATE: 'user'
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
    LIST: 'orders',
    BY_ID: (id: string) => `orders/${id}`,
    CREATE: 'orders',
    CANCEL: (id: string) => `orders/${id}/cancel`,
  },
  ADDRESSES: {
    LIST: 'addresses',
    BY_ID: (id: string) => `addresses/${id}`,
    CREATE: 'addresses',
    UPDATE: (id: string) => `addresses/${id}`,
    DELETE: (id: string) => `addresses/${id}`,
  },
  SHIPPING: {
    CALCULATE: 'shipping/calculate',
  },
} as const;
