import React from 'react';
import Link from 'next/link';
import type { CatalogItem } from '../model/catalog-item';
import { ProductMediaPlaceholder } from './product-media-placeholder';

interface ProductCardProps {
  item: CatalogItem;
  headingLevel?: 2 | 3;
}

export function ProductCard({ item, headingLevel = 2 }: ProductCardProps) {
  const productUrl = `/products/${item.slug}`;
  const Heading = headingLevel === 3 ? 'h3' : 'h2';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-elevated)] motion-reduce:transform-none">
      <Link
        href={productUrl}
        className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)]"
        aria-label={`Xem ${item.name}`}
      >
        <ProductMediaPlaceholder
          variant={item.mediaVariant}
          className="transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transform-none"
        />

        <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--color-brand-hover)] backdrop-blur">
          {item.categoryLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Heading className="text-base font-semibold leading-6 text-[var(--color-primary)]">
          <Link
            href={productUrl}
            className="rounded-sm underline-offset-4 hover:text-[var(--color-brand-hover)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            {item.name}
          </Link>
        </Heading>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">
          {item.shortDescription}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={productUrl}
            className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-control)] text-sm font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem chi tiết <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
