import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/user.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.USER.CREATE, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  },
};
