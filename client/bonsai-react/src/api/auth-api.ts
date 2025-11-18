import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/user.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<any>(ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Backend retorna: {token, userId, email, name}
    // Frontend espera: {token, user: {id, name, email, ...}}
    const backendData = response.data;
    
    // Mapear para o formato esperado
    const authResponse: AuthResponse = {
      token: backendData.token,
      user: {
        id: backendData.userId,
        name: backendData.name || '',
        email: backendData.email || credentials.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    };
    
    return authResponse;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.USER.CREATE, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  },
};
