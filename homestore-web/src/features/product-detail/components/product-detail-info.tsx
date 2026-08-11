import React from 'react';
import { CatalogItem } from '@/features/catalog/model/catalog-item';
import { Section, Container } from '@/components/ui';

interface ProductDetailInfoProps {
  item: CatalogItem;
}

export function ProductDetailInfo({ item }: ProductDetailInfoProps) {
  return (
    <Section className="py-12 lg:py-16 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-editorial text-[var(--color-brand)] mb-8">
            Thông tin sản phẩm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col space-y-1 pb-4 border-b border-[var(--color-border)] md:border-none md:pb-0">
              <dt className="text-sm text-[var(--color-muted)]">Danh mục</dt>
              <dd className="text-base font-medium text-[var(--color-primary)]">
                {item.categoryLabel}
              </dd>
            </div>

            <div className="flex flex-col space-y-1 pb-4 border-b border-[var(--color-border)] md:border-none md:pb-0">
              <dt className="text-sm text-[var(--color-muted)]">
                Không gian phù hợp
              </dt>
              <dd className="text-base font-medium text-[var(--color-primary)]">
                {item.roomLabel}
              </dd>
            </div>

            <div className="flex flex-col space-y-1 col-span-1 md:col-span-2 pt-2 md:pt-4">
              <dt className="text-sm text-[var(--color-muted)] mb-2">Mô tả</dt>
              <dd className="text-base text-[var(--color-primary)] leading-relaxed">
                {item.shortDescription}
              </dd>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
