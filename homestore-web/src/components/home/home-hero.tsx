import React from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';

export function HomeHero() {
  return (
    <Section className="pt-8 pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex flex-col space-y-6 lg:order-1">
            <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
              HomeStore
            </span>
            <h1 className="font-editorial text-4xl leading-[1.1] tracking-tight text-[var(--color-brand)] lg:text-5xl xl:text-6xl">
              Đồ dùng thiết thực <br className="hidden lg:block" />
              cho cuộc sống mỗi ngày.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[var(--color-primary)]">
              Khám phá đồ gia dụng và tiện ích đời sống theo danh mục rõ ràng,
              từ việc bếp núc, sắp xếp đến vệ sinh và chăm sóc cá nhân.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Khám phá sản phẩm
              </Link>
              <Link
                href="/products#catalog-categories"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-6 py-3 font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xem theo danh mục
              </Link>
            </div>
          </div>

          <div className="relative order-1 flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-container)] bg-[var(--color-surface-subtle)] shadow-sm lg:order-2 lg:aspect-[4/5]">
            <svg
              className="h-full w-full text-[var(--color-border)] opacity-30"
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
