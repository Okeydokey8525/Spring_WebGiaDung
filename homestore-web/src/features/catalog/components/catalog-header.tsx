import React from 'react';
import { Container, Section } from '@/components/ui';

export function CatalogHeader() {
  return (
    <Section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] pb-8 pt-10 lg:pb-10 lg:pt-12">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Cửa hàng
          </p>
          <h1 className="font-editorial text-4xl font-semibold tracking-tight text-[var(--color-brand-hover)] sm:text-5xl">
            Sản phẩm
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
            Tìm đồ dùng gia đình và tiện ích theo từ khóa, danh mục hoặc cách sắp
            xếp phù hợp với nhu cầu của bạn.
          </p>
        </div>
      </Container>
    </Section>
  );
}
