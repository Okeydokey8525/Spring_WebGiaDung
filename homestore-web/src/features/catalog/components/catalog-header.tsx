import React from 'react';
import { Section, Container } from '@/components/ui';

export function CatalogHeader() {
  return (
    <Section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] pt-12 pb-8">
      <Container>
        <div className="flex max-w-2xl flex-col space-y-4">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Cửa hàng
          </span>
          <h1 className="font-editorial text-4xl tracking-tight text-[var(--color-brand)] lg:text-5xl">
            Sản phẩm
          </h1>
          <p className="text-base text-[var(--color-primary)]">
            Khám phá đồ dùng gia đình và tiện ích đời sống theo danh mục phù hợp
            với nhu cầu thường ngày.
          </p>
        </div>
      </Container>
    </Section>
  );
}
