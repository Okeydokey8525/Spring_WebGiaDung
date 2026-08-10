import { cn } from '@/lib/utils/cn';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', type = 'button', ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-control)]';

    const variants = {
      primary:
        'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]',
      secondary:
        'bg-[var(--color-surface-subtle)] text-[var(--color-primary)] hover:bg-[var(--color-border)]',
      outline:
        'border border-[var(--color-border)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)]',
      ghost:
        'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)]',
      danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
