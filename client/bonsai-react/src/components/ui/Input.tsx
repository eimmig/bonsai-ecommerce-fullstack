import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', id, required, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replaceAll(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={`input-container ${fullWidth ? 'full-width' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId}
            className="input-label"
          >
            {label}
            {required && <span className="input-required" aria-label="campo obrigatório">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input-field ${error ? 'has-error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          {...props}
        />
        {error && (
          <p id={errorId} className="input-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
