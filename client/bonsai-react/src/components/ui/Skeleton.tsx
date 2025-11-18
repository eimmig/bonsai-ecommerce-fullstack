import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className, variant = 'rectangular' }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        className
      )}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <Skeleton className="mb-4 h-48 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
