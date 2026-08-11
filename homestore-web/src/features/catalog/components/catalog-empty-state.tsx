import React from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/ui';

export function CatalogEmptyState() {
  return (
    <Section className="py-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-container)] text-center my-8">
      <Container>
        <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
          <svg
            className="w-12 h-12 text-[var(--color-muted)] opacity-50 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <h2 className="text-xl font-medium text-[var(--color-primary)]">
            Không có sản phẩm phù hợp với bộ lọc hiện tại.
          </h2>
          <p className="text-[var(--color-muted)] text-sm">
            Vui lòng thử thay đổi các tùy chọn lọc hoặc xem tất cả sản phẩm của
            chúng tôi.
          </p>
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)] font-medium px-6 py-2 rounded-[var(--radius-control)] hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
            >
              Xóa bộ lọc
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
