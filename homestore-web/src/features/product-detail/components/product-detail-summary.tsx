import React from 'react';
import Link from 'next/link';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';

interface ProductDetailSummaryProps {
  item: CatalogItem;
}

export function ProductDetailSummary({ item }: ProductDetailSummaryProps) {
  return (
    <section className="flex h-full flex-col justify-center">
      <Link
        href={`/products?category=${item.categoryKey}`}
        className="mb-4 inline-flex w-fit min-h-10 items-center rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      >
        {item.categoryLabel}
      </Link>

      <h1 className="max-w-2xl font-editorial text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-brand-hover)] sm:text-5xl lg:text-[3.5rem]">
        {item.name}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
        {item.shortDescription}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Danh mục
          </div>
          <div className="mt-2 font-semibold text-[var(--color-primary)]">
            {item.categoryLabel}
          </div>
        </div>

        <div className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Mua sắm
          </div>
          <div className="mt-2 text-sm leading-6 text-[var(--color-primary)]">
            Thông tin giá và tình trạng sản phẩm sẽ hiển thị khi dữ liệu tương
            ứng có sẵn.
          </div>
        </div>
      </div>
    </section>
  );
}
