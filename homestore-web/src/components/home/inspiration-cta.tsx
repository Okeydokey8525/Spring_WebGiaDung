import React from 'react';
import Link from 'next/link';
import { Container, Section, Surface } from '@/components/ui';

export function InspirationCta() {
  return (
    <Section className="py-16 lg:py-24 bg-[var(--color-canvas)] border-t border-[var(--color-border)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <Surface className="aspect-square w-full max-w-md rounded-[var(--radius-container)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden relative flex items-center justify-center">
              {/* Abstract decorative SVG */}
              <svg
                className="w-full h-full text-[var(--color-border)] opacity-20"
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

          <div className="order-1 lg:order-2 flex flex-col space-y-6 lg:pl-12">
            <h2 className="font-editorial text-3xl lg:text-4xl tracking-tight text-[var(--color-brand)]">
              Cảm hứng cho ngôi nhà
            </h2>
            <p className="text-base text-[var(--color-primary)] leading-relaxed max-w-lg">
              Khám phá những câu chuyện về phong cách sống, cách tổ chức không
              gian và những gợi ý bài trí để làm mới tổ ấm của bạn mỗi ngày.
            </p>
            <div className="pt-2">
              <Link
                href="/stories"
                className="inline-flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)] font-medium px-6 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
              >
                Đọc các bài viết
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
