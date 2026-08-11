import React from 'react';
import { CatalogItem } from '@/features/catalog/model/catalog-item';

interface ProductDetailSummaryProps {
  item: CatalogItem;
}

export function ProductDetailSummary({ item }: ProductDetailSummaryProps) {
  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-sm font-medium tracking-wider uppercase text-[var(--color-muted)]">
          <span>{item.categoryLabel}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{item.roomLabel}</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-brand)]">
          {item.name}
        </h1>
      </div>

      <p className="text-lg text-[var(--color-primary)] leading-relaxed max-w-xl">
        {item.shortDescription}
      </p>

      {/* Decorative divider - intentional whitespace/separation before future commercial data */}
      <div
        className="w-12 h-1 bg-[var(--color-border)] rounded-full mt-4"
        aria-hidden="true"
      ></div>
    </div>
  );
}
