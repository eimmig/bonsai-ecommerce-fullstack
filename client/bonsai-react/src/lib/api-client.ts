import { toast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ErrorTranslator, attachErrorMessage } from '@/utils/error-translator';

const API_BASE_URL = 'http://localhost:8080/api';

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
      // Note: toast messages here will use browser's default language
      // since we can't access translation context in api-client
      toast.error('Session expired', 'Please sign in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (!globalThis.location.pathname.includes('/login')) {
        globalThis.location.href = '/login';
      }
    }
  }

  private handleResponseError(error: AxiosError): void {
    // Attach error message for backward compatibility
    attachErrorMessage(error);

    if (!error.response) {
      return;
    }

    if (ErrorTranslator.isSessionExpired(error)) {
      this.handleUnauthorized();
    } else if (ErrorTranslator.isAccessDenied(error)) {
      console.error('Access denied:', ErrorTranslator.getErrorMessage(error));
    } else if (ErrorTranslator.isServerError(error)) {
      toast.error('Server error', 'Please try again later.');
      console.error('Server error:', ErrorTranslator.getErrorMessage(error));
    }
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
