import { cn } from '@/lib/utils/cn';
import React from 'react';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[var(--spacing-content-max)] mx-auto',
        'px-[var(--spacing-gutter-mobile)] sm:px-[var(--spacing-gutter-tablet)] md:px-[var(--spacing-gutter-desktop)]',
        className
      )}
      {...props}
    />
  );
}
