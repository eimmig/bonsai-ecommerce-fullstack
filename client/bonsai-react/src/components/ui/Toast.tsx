import { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="toast-icon toast-icon-success" size={20} />,
    error: <XCircle className="toast-icon toast-icon-error" size={20} />,
    warning: <AlertCircle className="toast-icon toast-icon-warning" size={20} />,
    info: <Info className="toast-icon toast-icon-info" size={20} />,
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <div className="toast-header">
          <div className="toast-icon-wrapper">{icons[type]}</div>
          <div className="toast-text">
            <p className="toast-title">{title}</p>
            {message && (
              <p className="toast-message">{message}</p>
            )}
          </div>
          <div className="toast-close-wrapper">
            <button
              className="toast-close-btn"
              onClick={() => onClose(id)}
              aria-label="Fechar notificação"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
