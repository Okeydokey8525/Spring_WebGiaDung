import React from 'react';
import Link from 'next/link';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';
import { ProductCard } from '@/features/catalog/components/product-card';
import { getCatalogItems } from '@/features/catalog/data/catalog-source';
import { Container, Section } from '@/components/ui';

interface RelatedProductsProps {
  item: CatalogItem;
}

export function RelatedProducts({ item }: RelatedProductsProps) {
  const relatedItems = getCatalogItems()
    .filter(
      (candidate) =>
        candidate.id !== item.id && candidate.categoryKey === item.categoryKey
    )
    .slice(0, 4);

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <Section className="bg-[var(--color-canvas)] py-14 lg:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Khám phá thêm
            </p>
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)]">
              Sản phẩm cùng danh mục
            </h2>
          </div>

          <Link
            href={`/products?category=${item.categoryKey}`}
            className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem {item.categoryLabel} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-9 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {relatedItems.map((relatedItem) => (
            <ProductCard
              key={relatedItem.id}
              item={relatedItem}
              headingLevel={3}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
