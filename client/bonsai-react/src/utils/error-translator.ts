import type { AxiosError } from 'axios';

export interface TranslatedError {
  title: string;
  message: string;
  key: string;
}

interface ErrorResponse {
  message?: string;
  error?: string;
  mensagem?: string;
  errors?: string[];
}

interface ExtendedAxiosError extends AxiosError {
  userMessage?: string;
}

/**
 * Error translator utility for mapping API errors to translation keys
 */
export class ErrorTranslator {
  /**
   * Map HTTP status codes to translation key prefixes
   */
  private static readonly STATUS_CODE_MAP: Record<number, string> = {
    400: 'errors.validationError',
    401: 'errors.unauthorized',
    403: 'errors.forbidden',
    404: 'errors.404',
    500: 'errors.500',
    502: 'errors.serverError',
    503: 'errors.serverError',
    504: 'errors.serverError',
  };

  /**
   * Get translation key from axios error
   */
  static getErrorKey(error: AxiosError): string {
    if (!error.response) {
      return error.request ? 'errors.connectionError' : 'errors.unknown';
    }

    const { status } = error.response;
    return this.STATUS_CODE_MAP[status] || 'errors.unknown';
  }

  /**
   * Get error message from response data
   */
  static getErrorMessage(error: AxiosError): string {
    if (error.response?.data) {
      const data = error.response.data as ErrorResponse;

      if (data.errors && Array.isArray(data.errors)) {
        return data.errors.join('\n');
      }

      return data.message || data.error || data.mensagem || '';
    }

    return '';
  }

  /**
   * Get translated error object with title and message keys
   */
  static getTranslatedError(error: AxiosError): TranslatedError {
    const key = this.getErrorKey(error);
    const descriptionKey = `${key}Description`;

    return {
      title: key,
      message: descriptionKey,
      key,
    };
  }

  /**
   * Check if error is a session expiration (401)
   */
  static isSessionExpired(error: AxiosError): boolean {
    return error.response?.status === 401;
  }

  /**
   * Check if error is an access denied error (403)
   */
  static isAccessDenied(error: AxiosError): boolean {
    return error.response?.status === 403;
  }

  /**
   * Check if error is a server error (5xx)
   */
  static isServerError(error: AxiosError): boolean {
    const status = error.response?.status;
    return !!status && status >= 500 && status < 600;
  }

  /**
   * Check if error is a network/connection error
   */
  static isNetworkError(error: AxiosError): boolean {
    return !error.response && !!error.request;
  }

  /**
   * Check if error is a validation error (400)
   */
  static isValidationError(error: AxiosError): boolean {
    return error.response?.status === 400;
  }
}

/**
 * Hook-friendly error translator function
 * Usage: const errorKey = translateError(error);
 */
export const translateError = (error: AxiosError): string => {
  return ErrorTranslator.getErrorKey(error);
};

/**
 * Get full translated error with title and message
 * Usage: const { title, message } = getTranslatedError(error);
 */
export const getTranslatedError = (error: AxiosError): TranslatedError => {
  return ErrorTranslator.getTranslatedError(error);
};

/**
 * Attach user-friendly message to error object for backward compatibility
 */
export const attachErrorMessage = (error: AxiosError): void => {
  const message = ErrorTranslator.getErrorMessage(error);
  (error as ExtendedAxiosError).userMessage = message || 'Erro desconhecido';
};
