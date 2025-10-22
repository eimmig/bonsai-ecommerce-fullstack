import type { ReactNode, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'discount';
}

export const Badge = ({ children, variant = 'default', className = '', ...props }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-yellow-100 text-yellow-800',
    discount: 'bg-discount/10 text-discount',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
