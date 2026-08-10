import { cn } from '@/lib/utils/cn';
import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

export function Section({ className, spacing = 'md', ...props }: SectionProps) {
  const spacingClass = {
    none: '',
    sm: 'py-[var(--spacing-section-sm)]',
    md: 'py-[var(--spacing-section-md)]',
    lg: 'py-[var(--spacing-section-lg)]',
  }[spacing];

  return <section className={cn(spacingClass, className)} {...props} />;
}
