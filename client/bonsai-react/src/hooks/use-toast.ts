import { toast as toastify } from 'react-toastify';

export const useToast = () => {
  const toast = {
    success: (title: string, message?: string) => {
      const content = message ? `${title}: ${message}` : title;
      toastify.success(content);
    },
    error: (title: string, message?: string) => {
      const content = message ? `${title}: ${message}` : title;
      toastify.error(content);
    },
    warning: (title: string, message?: string) => {
      const content = message ? `${title}: ${message}` : title;
      toastify.warning(content);
    },
    info: (title: string, message?: string) => {
      const content = message ? `${title}: ${message}` : title;
      toastify.info(content);
    },
  };

  return toast;
};

// Para uso fora de componentes (como no api-client)
export const toast = {
  success: (title: string, message?: string) => {
    const content = message ? `${title}: ${message}` : title;
    toastify.success(content);
  },
  error: (title: string, message?: string) => {
    const content = message ? `${title}: ${message}` : title;
    toastify.error(content);
  },
  warning: (title: string, message?: string) => {
    const content = message ? `${title}: ${message}` : title;
    toastify.warning(content);
  },
  info: (title: string, message?: string) => {
    const content = message ? `${title}: ${message}` : title;
    toastify.info(content);
  },
};
