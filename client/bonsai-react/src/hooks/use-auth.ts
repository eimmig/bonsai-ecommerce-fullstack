import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/user.types';
import { authApi } from '@/api/auth-api';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routes';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Login realizado com sucesso!', `Bem-vindo, ${data.user.name}!`);
      navigate(ROUTES.HOME);
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao fazer login';
      toast.error('Erro no login', message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Cadastro realizado!', 'Sua conta foi criada com sucesso!');
      navigate(ROUTES.HOME);
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao criar conta';
      toast.error('Erro no cadastro', message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.info('Logout realizado', 'Até logo!');
      navigate(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      // Mesmo com erro, fazemos logout local
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
      
      const message = (error as any).userMessage || 'Erro ao fazer logout';
      toast.warning('Aviso', message);
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
