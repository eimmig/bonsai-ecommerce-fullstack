import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/user.types';
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
      const user: User = {
        id: data.userId,
        name: data.name,
        email: data.email,
      };
      setAuth(user, data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Login realizado com sucesso!', `Bem-vindo, ${user.name}!`);
      navigate(ROUTES.HOME);
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Email ou senha incorretos';
      toast.error('Erro no login', message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: () => {
      toast.success('Cadastro realizado!', 'Faça login para continuar');
      navigate(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      const message = (error as any).userMessage || 'Erro ao criar conta. Email pode já estar cadastrado.';
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
