import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  className,
  children 
}: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      {description && <p className="mb-6 text-gray-600 max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
      {children}
    </div>
  );
};
