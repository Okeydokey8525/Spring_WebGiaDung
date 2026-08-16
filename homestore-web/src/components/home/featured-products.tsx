import React from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { ProductCard } from '@/features/catalog/components/product-card';
import { getCatalogItems } from '@/features/catalog/data/catalog-source';

export function FeaturedProducts() {
  const items = [...getCatalogItems()]
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, 4);

  return (
    <Section className="bg-[var(--color-canvas)] py-16 lg:py-20">
      <Container>
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Sản phẩm
            </p>
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)] sm:text-4xl">
              Đồ dùng cho mỗi ngày
            </h2>
            <p className="mt-3 leading-7 text-[var(--color-muted)]">
              Một vài sản phẩm để bắt đầu khám phá HomeStore.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] px-1 font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem tất cả sản phẩm →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-9 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} headingLevel={3} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
