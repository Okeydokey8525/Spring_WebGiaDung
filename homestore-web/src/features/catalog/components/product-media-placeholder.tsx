import React from 'react';
import type { MediaVariantKey } from '../model/catalog-item';
import { cn } from '@/lib/utils/cn';

interface ProductMediaPlaceholderProps {
  variant?: MediaVariantKey;
  className?: string;
}

export function ProductMediaPlaceholder({
  variant = 'neutral',
  className,
}: ProductMediaPlaceholderProps) {
  const renderGeometry = () => {
    switch (variant) {
      case 'storage':
        return (
          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      case 'tabletop':
        return (
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      case 'textile':
        return (
          <path
            d="M 20 80 Q 50 20 80 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      case 'bathroom':
        return (
          <path
            d="M 30 50 A 20 20 0 1 1 70 50 A 20 20 0 1 1 30 50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      case 'neutral':
      default:
        return (
          <path
            d="M 20 50 L 80 50 M 50 20 L 50 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
    }
  };

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-[var(--color-surface-subtle)] text-[var(--color-border)]',
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="h-1/3 w-1/3 opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {renderGeometry()}
      </svg>
    </div>
  );
}
