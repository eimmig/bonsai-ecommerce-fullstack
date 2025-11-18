import { describe, it, expect, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/auth-store';

describe('auth-store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should initialize with empty state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set auth correctly', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      cpfCnpj: '12345678901',
      phone: '1234567890',
      birthDate: '1990-01-01',
      address: {
        zipCode: '12345-678',
        street: 'Rua Test',
        number: '123',
        neighborhood: 'Centro',
        city: 'Test City',
        state: 'TS',
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };
    const mockToken = 'test-token';

    useAuthStore.getState().setAuth(mockUser, mockToken);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should clear auth correctly', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      cpfCnpj: '12345678900',
      phone: '11987654321',
      birthDate: '1990-01-01',
      address: {
        zipCode: '12345-678',
        street: 'Rua Test',
        number: '123',
        neighborhood: 'Centro',
        city: 'Test City',
        state: 'TS',
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    useAuthStore.getState().setAuth(mockUser, 'token');
    useAuthStore.getState().clearAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should update user correctly', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      cpfCnpj: '12345678900',
      phone: '11987654321',
      birthDate: '1990-01-01',
      address: {
        zipCode: '12345-678',
        street: 'Rua Test',
        number: '123',
        neighborhood: 'Centro',
        city: 'Test City',
        state: 'TS',
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    useAuthStore.getState().setAuth(mockUser, 'token');
    
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    useAuthStore.getState().updateUser(updatedUser);

    const state = useAuthStore.getState();
    expect(state.user?.name).toBe('Updated Name');
  });
});
