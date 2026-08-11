import React from 'react';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--color-brand)] focus:text-white focus:px-4 focus:py-2 focus:rounded-[var(--radius-control)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 font-medium"
    >
      Chuyển đến nội dung chính
    </a>
  );
}
