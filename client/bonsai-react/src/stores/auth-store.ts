import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/user.types';
import { getFromStorage, setToStorage, removeFromStorage } from '@/utils/storage';
import { useCartStore } from './cart-store';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        setToStorage('user', user);
        localStorage.setItem('token', token); // Token como string simples
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        removeFromStorage('user');
        localStorage.removeItem('token'); // Remove token diretamente
        
        // Limpa o carrinho ao fazer logout
        useCartStore.getState().clearCart();
        
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (user) => {
        setToStorage('user', user);
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // Após carregar do storage, valida se realmente está autenticado
        if (state) {
          const storedToken = localStorage.getItem('token');
          const hasValidAuth = !!(state.user && storedToken);
          
          if (hasValidAuth) {
            state.token = storedToken;
            state.isAuthenticated = true;
          } else {
            // Se não tem dados válidos mas diz estar autenticado, limpa
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            removeFromStorage('user');
            localStorage.removeItem('token');
          }
        }
      },
    }
  )
);
