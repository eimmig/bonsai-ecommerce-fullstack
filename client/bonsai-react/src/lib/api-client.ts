import { toast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getErrorMessage = (error: AxiosError): string => {
  if (error.response?.data) {
    const data = error.response.data as any;
    
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.join('\n');
    }
    
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

  private handleUnauthorized(): void {
    const hasToken = localStorage.getItem('token');
    
    if (hasToken) {
      toast.error('Sessão expirada', 'Faça login novamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!globalThis.location.pathname.includes('/login')) {
        globalThis.location.href = '/login';
      }
    }
  }

  private handleResponseError(error: AxiosError): void {
    const errorMessage = getErrorMessage(error);

    if (!error.response) {
      (error as any).userMessage = error.request 
        ? 'Erro de conexão. Verifique sua internet.'
        : errorMessage;
      return;
    }

    const { status } = error.response;

    if (status === 401) {
      this.handleUnauthorized();
    } else if (status === 403) {
      console.error('Acesso negado:', errorMessage);
    } else if (status >= 500) {
      toast.error('Erro no servidor', 'Tente novamente mais tarde.');
      console.error('Erro no servidor:', errorMessage);
    }

    (error as any).userMessage = errorMessage;
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
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
        this.handleResponseError(error);
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
