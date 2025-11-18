import { create } from 'zustand';

import type { User } from '@/types/user.types';
import { getFromStorage, setToStorage, removeFromStorage } from '@/utils/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getFromStorage<User>('user'),
  token: getFromStorage<string>('token'),
  isAuthenticated: !!getFromStorage<string>('token'),

  setAuth: (user: User, token: string) => {
    setToStorage('user', user);
    setToStorage('token', token);
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: () => {
    removeFromStorage('user');
    removeFromStorage('token');
    // Limpar carrinho ao fazer logout
    localStorage.removeItem('cart-storage');
    // Limpar storage antigo do persist
    localStorage.removeItem('auth-storage');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (user: User) => {
    setToStorage('user', user);
    set({ user });
  },
}));
