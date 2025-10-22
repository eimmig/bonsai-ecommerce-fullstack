import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import './Select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: Array<{ value: string | number; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, fullWidth = false, options, className = '', ...props }, ref) => {
    return (
      <div className={`select-container ${fullWidth ? 'select-full-width' : ''}`}>
        {label && (
          <label className="select-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`select-input ${error ? 'select-error' : ''} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="select-error-message">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
