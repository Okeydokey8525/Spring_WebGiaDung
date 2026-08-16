import React from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { homepageCategories } from '@/lib/config/store-categories';

export function CategoryDiscovery() {
  return (
    <Section className="bg-[var(--color-surface)] py-16 lg:py-20">
      <Container>
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Danh mục
            </p>
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)] sm:text-4xl">
              Khám phá theo nhu cầu
            </h2>
            <p className="mt-3 leading-7 text-[var(--color-muted)]">
              Chọn một nhóm sản phẩm để đi thẳng đến những món đồ phù hợp với
              việc bạn đang cần.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] px-1 font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem tất cả sản phẩm →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {homepageCategories.map((category, index) => (
            <Link
              key={category.key}
              href={category.href}
              className="group flex min-h-44 flex-col rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] motion-reduce:transform-none"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.14em] text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-brand)] transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="font-semibold leading-6 text-[var(--color-primary)] group-hover:text-[var(--color-brand-hover)]">
                  {category.label}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
