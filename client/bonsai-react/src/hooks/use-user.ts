import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from '@/types/user.types';
import { userApi } from '@/api/user-api';
import { useAuthStore } from '@/stores/auth-store';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  const updateMutation = useMutation({
    mutationFn: (data: Partial<User>) => userApi.updateProfile(data),
    onSuccess: (data: User) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => userApi.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    deleteAccount: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
