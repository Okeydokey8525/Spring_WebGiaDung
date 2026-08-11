import React from 'react';
import Link from 'next/link';
import { CatalogItem } from '../model/catalog-item';
import { ProductMediaPlaceholder } from './product-media-placeholder';

interface ProductCardProps {
  item: CatalogItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const productUrl = `/products/${item.slug}`;

  return (
    <div className="group flex flex-col h-full space-y-4 focus-within:ring-2 focus-within:ring-[var(--color-focus-ring)] rounded-[var(--radius-container)] outline-none">
      <Link
        href={productUrl}
        className="block relative aspect-[4/5] rounded-[var(--radius-container)] overflow-hidden border border-[var(--color-border)] focus:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductMediaPlaceholder variant={item.mediaVariant} />

        {/* Subtle overlay on hover for interactivity affordance */}
        <div className="absolute inset-0 bg-[var(--color-brand)] opacity-0 group-hover:opacity-5 transition-opacity" />
      </Link>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2 text-xs text-[var(--color-muted)] mb-1">
          <span>{item.categoryLabel}</span>
          <span>&middot;</span>
          <span>{item.roomLabel}</span>
        </div>

        <h2 className="font-medium text-base text-[var(--color-primary)]">
          <Link
            href={productUrl}
            className="focus:outline-none hover:underline underline-offset-4 decoration-[var(--color-border)]"
          >
            {item.name}
          </Link>
        </h2>

        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {item.shortDescription}
        </p>
      </div>
    </div>
  );
}
