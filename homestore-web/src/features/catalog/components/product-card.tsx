import React from 'react';
import Link from 'next/link';
import type { CatalogItem } from '../model/catalog-item';
import { ProductMediaPlaceholder } from './product-media-placeholder';

interface ProductCardProps {
  item: CatalogItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const productUrl = `/products/${item.slug}`;

  return (
    <div className="group flex h-full flex-col space-y-4 rounded-[var(--radius-container)] outline-none focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)]">
      <Link
        href={productUrl}
        className="relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductMediaPlaceholder variant={item.mediaVariant} />
        <div className="absolute inset-0 bg-[var(--color-brand)] opacity-0 transition-opacity group-hover:opacity-5" />
      </Link>

      <div className="flex flex-col space-y-1">
        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
          {item.categoryLabel}
        </div>

        <h2 className="text-base font-medium text-[var(--color-primary)]">
          <Link
            href={productUrl}
            className="decoration-[var(--color-border)] underline-offset-4 hover:underline focus:outline-none"
          >
            {item.name}
          </Link>
        </h2>

        <p className="line-clamp-2 text-sm text-[var(--color-muted)]">
          {item.shortDescription}
        </p>
      </div>
    </div>
  );
}
