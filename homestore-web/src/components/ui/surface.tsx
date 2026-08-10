import { cn } from '@/lib/utils/cn';
import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'outlined';
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-[var(--radius-surface)] overflow-hidden';

    const variants = {
      default: 'bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]',
      subtle: 'bg-[var(--color-surface-subtle)] text-[var(--color-primary)]',
      outlined: 'bg-[var(--color-surface)] border border-[var(--color-border)]',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Surface.displayName = 'Surface';
