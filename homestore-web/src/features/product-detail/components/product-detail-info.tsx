import React from 'react';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';
import { Section, Container } from '@/components/ui';

interface ProductDetailInfoProps {
  item: CatalogItem;
}

export function ProductDetailInfo({ item }: ProductDetailInfoProps) {
  return (
    <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-editorial text-2xl text-[var(--color-brand)]">
            Thông tin sản phẩm
          </h2>

          <dl className="flex flex-col gap-8">
            <div className="flex flex-col space-y-1 border-b border-[var(--color-border)] pb-6">
              <dt className="text-sm text-[var(--color-muted)]">Danh mục</dt>
              <dd className="text-base font-medium text-[var(--color-primary)]">
                {item.categoryLabel}
              </dd>
            </div>

            <div className="flex flex-col space-y-1">
              <dt className="mb-2 text-sm text-[var(--color-muted)]">Mô tả</dt>
              <dd className="text-base leading-relaxed text-[var(--color-primary)]">
                {item.shortDescription}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </Section>
  );
}
