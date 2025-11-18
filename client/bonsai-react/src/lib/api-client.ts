import { toast } from '@/hooks/use-toast';
import { getFromStorage } from '@/utils/storage';
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper para extrair mensagem de erro da API
const getErrorMessage = (error: AxiosError): string => {
  if (error.response?.data) {
    const data = error.response.data as any;
    return data.message || data.error || data.mensagem || 'Erro desconhecido';
  }
  if (error.request) {
    return 'Erro de conexão com o servidor';
  }
  return error.message || 'Erro desconhecido';
};

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getFromStorage<string>('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const errorMessage = getErrorMessage(error);

        if (error.response) {
          const { status } = error.response;

          // Logout automático em caso de token expirado (401)
          if (status === 401) {
            const isLoginPage = globalThis.location.pathname.includes('/login');
            const isLoginOrRegisterRequest = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
            
            // Não mostrar toast de sessão expirada na página de login OU se for a requisição de login/register
            // O hook useAuth vai tratar o erro de credenciais inválidas
            if (!isLoginPage && !isLoginOrRegisterRequest) {
              toast.error('Sessão expirada', 'Faça login novamente.');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              globalThis.location.href = '/login';
            }
          }

          // Forbidden (403) - Não mostrar toast aqui, deixar para os hooks tratarem
          if (status === 403) {
            console.error('Acesso negado:', errorMessage);
          }

          // Server error (500+)
          if (status >= 500) {
            toast.error('Erro no servidor', 'Tente novamente mais tarde.');
            console.error('Erro no servidor:', errorMessage);
          }

          // Adicionar mensagem de erro ao objeto de erro para ser capturada pelos hooks
          (error as any).userMessage = errorMessage;
        } else if (error.request) {
          // Erro de rede/conexão
          (error as any).userMessage = 'Erro de conexão. Verifique sua internet.';
        } else {
          (error as any).userMessage = errorMessage;
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }
}

const apiClient = new ApiClient();

export { apiClient };
export default apiClient;
