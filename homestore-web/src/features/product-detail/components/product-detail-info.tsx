import React from 'react';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';
import { Section, Container } from '@/components/ui';

interface ProductDetailInfoProps {
  item: CatalogItem;
}

export function ProductDetailInfo({ item }: ProductDetailInfoProps) {
  return (
    <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-14 lg:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Chi tiết
            </p>
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)]">
              Thông tin sản phẩm
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--color-muted)]">
              Các thông tin hiện có của sản phẩm được trình bày ngắn gọn để bạn
              dễ xem và đối chiếu.
            </p>
          </div>

          <dl className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-canvas)]">
            <div className="grid gap-2 border-b border-[var(--color-border)] p-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-[var(--color-muted)]">
                Danh mục
              </dt>
              <dd className="font-semibold text-[var(--color-primary)]">
                {item.categoryLabel}
              </dd>
            </div>

            <div className="grid gap-2 p-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-[var(--color-muted)]">
                Mô tả
              </dt>
              <dd className="leading-7 text-[var(--color-primary)]">
                {item.shortDescription}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </Section>
  );
}
