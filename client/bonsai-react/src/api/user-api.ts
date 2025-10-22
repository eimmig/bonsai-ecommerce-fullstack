import type { User } from '@/types/user.types';
import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>(ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(ENDPOINTS.USER.PROFILE, data);
    return response.data;
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete(ENDPOINTS.USER.PROFILE);
  },
};
