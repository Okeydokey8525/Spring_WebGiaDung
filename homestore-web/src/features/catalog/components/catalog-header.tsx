import React from 'react';
import { Section, Container } from '@/components/ui';

export function CatalogHeader() {
  return (
    <Section className="pt-12 pb-8 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container>
        <div className="flex flex-col space-y-4 max-w-2xl">
          <span className="text-xs font-medium tracking-wider uppercase text-[var(--color-muted)]">
            Cửa hàng
          </span>
          <h1 className="font-editorial text-4xl lg:text-5xl tracking-tight text-[var(--color-brand)]">
            Sản phẩm
          </h1>
          <p className="text-base text-[var(--color-primary)]">
            Khám phá các nhóm sản phẩm cho không gian sống, được chọn lựa kỹ
            lưỡng để mang lại sự gọn gàng và tiện nghi.
          </p>
        </div>
      </Container>
    </Section>
  );
}
