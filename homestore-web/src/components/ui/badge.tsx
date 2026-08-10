import { cn } from '@/lib/utils/cn';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
}

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2';

  const variants = {
    neutral: 'bg-[var(--color-surface-subtle)] text-[var(--color-primary)]',
    brand: 'bg-[var(--color-brand-soft)] text-[var(--color-brand)]',
    success: 'bg-[var(--color-success)] text-white',
    warning: 'bg-[var(--color-warning)] text-white',
    danger: 'bg-[var(--color-danger)] text-white',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
