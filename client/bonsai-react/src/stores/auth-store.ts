import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: getFromStorage<User>('user'),
      token: getFromStorage<string>('token'),
      isAuthenticated: !!getFromStorage<string>('token'),

      setAuth: (user, token) => {
        setToStorage('user', user);
        setToStorage('token', token);
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        removeFromStorage('user');
        removeFromStorage('token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (user) => {
        setToStorage('user', user);
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
