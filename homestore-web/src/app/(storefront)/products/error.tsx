'use client';

import React, { useEffect } from 'react';
import { Container, Section, Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CatalogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // We intentionally do not expose error details to the UI,
    // but logging it to the console is acceptable for development.
    console.error('Catalog route error:', error);
  }, [error]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Section className="py-24 bg-[var(--color-surface)] flex-grow flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto flex flex-col items-center space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center mb-2 text-[var(--color-muted)]">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Không thể hiển thị danh mục lúc này.
            </h1>

            <p className="text-[var(--color-muted)] text-base">
              Rất tiếc, đã xảy ra lỗi trong quá trình tải dữ liệu sản phẩm. Vui
              lòng thử lại sau.
            </p>

            <div className="pt-4">
              <Button onClick={() => reset()} variant="primary">
                Thử lại
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
