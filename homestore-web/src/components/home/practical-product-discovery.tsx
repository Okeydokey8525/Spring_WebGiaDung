import React from 'react';
import Link from 'next/link';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';
import { storeCategories } from '@/lib/config/store-categories';

const quickCategoryKeys = new Set([
  'kitchen',
  'household',
  'storage',
  'cleaning',
  'bathroom',
]);

export function PracticalProductDiscovery() {
  const quickCategories = storeCategories.filter((category) =>
    quickCategoryKeys.has(category.key)
  );

  return (
    <Section className="bg-[var(--color-canvas)] py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-brand-hover)] px-6 py-10 text-white shadow-[var(--shadow-subtle)] sm:px-9 lg:px-12 lg:py-12">
          <div
            className="pointer-events-none absolute -right-20 -top-28 w-80 opacity-[0.12]"
            aria-hidden="true"
          >
            <BambooLeafMotif />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-soft)]">
                Tìm nhanh
              </p>
              <h2 className="font-editorial text-3xl font-semibold tracking-tight sm:text-4xl">
                Bạn đang tìm sản phẩm gì?
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/75">
                Nhập từ khóa hoặc bắt đầu từ một nhóm nhu cầu quen thuộc.
              </p>
            </div>

            <div>
              <form
                action="/products"
                method="GET"
                role="search"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="home-product-search" className="sr-only">
                  Tìm kiếm sản phẩm
                </label>
                <input
                  id="home-product-search"
                  type="search"
                  name="q"
                  placeholder="Bạn đang tìm sản phẩm gì?"
                  autoComplete="off"
                  className="min-h-12 min-w-0 flex-1 rounded-[var(--radius-control)] border border-white/25 bg-white px-4 text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-warm)]"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-accent-warm)] px-6 font-bold text-[var(--color-primary)] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Tìm kiếm
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-2" aria-label="Danh mục gợi ý">
                {quickCategories.map((category) => (
                  <Link
                    key={category.key}
                    href={category.href}
                    className="inline-flex min-h-10 items-center rounded-[var(--radius-pill)] border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
