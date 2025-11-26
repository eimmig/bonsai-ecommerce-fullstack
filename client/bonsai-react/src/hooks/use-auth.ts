import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/user.types';
import { authApi } from '@/api/auth-api';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import { ErrorTranslator } from '@/utils/error-translator';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: AuthResponse) => {
      const user: User = {
        id: data.userId,
        name: data.name,
        email: data.email,
      };
      setAuth(user, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(t('auth.messages.loginSuccess'), `${t('common.success')}, ${user.name}!`);
      navigate(ROUTES.HOME);
    },
    onError: (error: AxiosError) => {
      const message = ErrorTranslator.getErrorMessage(error) || t('auth.messages.loginError');
      toast.error(t('common.error'), message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success(t('auth.messages.registerSuccess'), t('auth.login.signIn'));
      navigate(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      const message = ErrorTranslator.getErrorMessage(error) || t('auth.messages.registerError');
      toast.error(t('common.error'), message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.info(t('common.success'), t('auth.messages.logoutSuccess'));
      navigate(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);

      const message = ErrorTranslator.getErrorMessage(error) || t('common.error');
      toast.warning(t('common.error'), message);
    },
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};
