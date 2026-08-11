import React from 'react';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';

interface ProductDetailSummaryProps {
  item: CatalogItem;
}

export function ProductDetailSummary({ item }: ProductDetailSummaryProps) {
  return (
    <div className="flex h-full flex-col justify-center space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {item.categoryLabel}
        </div>

        <h1 className="font-editorial text-4xl tracking-tight text-[var(--color-brand)] sm:text-5xl lg:text-6xl">
          {item.name}
        </h1>
      </div>

      <p className="max-w-xl text-lg leading-relaxed text-[var(--color-primary)]">
        {item.shortDescription}
      </p>

      <div
        className="mt-4 h-1 w-12 rounded-full bg-[var(--color-border)]"
        aria-hidden="true"
      />
    </div>
  );
}
