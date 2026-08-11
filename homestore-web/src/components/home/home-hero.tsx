import React from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';

export function HomeHero() {
  return (
    <Section className="pt-8 pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="flex flex-col space-y-6 order-2 lg:order-1">
            <span className="text-sm font-medium tracking-wider uppercase text-[var(--color-muted)]">
              HomeStore
            </span>
            <h1 className="font-editorial text-4xl lg:text-5xl xl:text-6xl tracking-tight text-[var(--color-brand)] leading-[1.1]">
              Không gian sống, <br className="hidden lg:block" />
              được chọn lựa có chủ đích.
            </h1>
            <p className="text-lg text-[var(--color-primary)] max-w-md leading-relaxed">
              Khám phá bộ sưu tập đồ dùng gia đình tinh tế, mang lại sự gọn
              gàng, tiện nghi và cảm giác bình yên cho nhịp sống thường ngày của
              bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[var(--color-brand)] text-white font-medium px-6 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
              >
                Khám phá sản phẩm
              </Link>
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center border border-[var(--color-border)] text-[var(--color-primary)] font-medium px-6 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
              >
                Khám phá theo không gian
              </Link>
            </div>
          </div>

          {/* Media Column - Abstract Geometry placeholder */}
          <div className="order-1 lg:order-2 aspect-square lg:aspect-[4/5] relative bg-[var(--color-surface-subtle)] rounded-[var(--radius-container)] overflow-hidden shadow-sm flex items-center justify-center">
            {/* Abstract decorative SVG */}
            <svg
              className="w-full h-full text-[var(--color-border)] opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <rect
                x="10"
                y="10"
                width="80"
                height="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface-subtle)] to-transparent opacity-50 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
