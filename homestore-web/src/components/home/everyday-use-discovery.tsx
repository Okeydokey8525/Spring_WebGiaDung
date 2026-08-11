import React from 'react';
import Link from 'next/link';
import { Container, Section, Surface } from '@/components/ui';

export function EverydayUseDiscovery() {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1">
            <Surface className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <svg
                className="h-full w-full text-[var(--color-border)] opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
                <path
                  d="M0 50 L50 0 L100 50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <div
                className="absolute inset-0 bg-[var(--color-brand)] opacity-5 mix-blend-multiply"
                aria-hidden="true"
              />
            </Surface>
          </div>

          <div className="order-1 flex flex-col space-y-6 lg:order-2 lg:pl-12">
            <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
              Theo việc cần làm
            </span>
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)] lg:text-4xl">
              Những món nhỏ giúp việc nhà gọn hơn
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-[var(--color-primary)]">
              Tìm các dụng cụ hỗ trợ dọn dẹp và sắp xếp theo nhu cầu thực tế,
              không cần bắt đầu từ từng căn phòng.
            </p>
            <div className="pt-2">
              <Link
                href="/products?category=cleaning"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xem dụng cụ vệ sinh
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
