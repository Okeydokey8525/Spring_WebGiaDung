import React from 'react';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';
import { homeValues } from '@/lib/config/home-content';

export function HomeValues() {
  return (
    <Section
      id="about-homestore"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--color-surface)] py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute -right-28 -top-28 hidden w-72 opacity-[0.08] lg:block"
        aria-hidden="true"
      >
        <BambooLeafMotif />
      </div>

      <Container>
        <div className="relative">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Về HomeStore
            </p>
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)] sm:text-4xl">
              Mua sắm rõ ràng, bắt đầu từ điều bạn cần
            </h2>
            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              HomeStore ưu tiên cách tìm và khám phá sản phẩm gọn gàng cho các
              nhu cầu thường ngày.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {homeValues.map((value, index) => (
              <article
                key={value.id}
                className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 sm:p-7"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-sm font-bold text-[var(--color-brand-hover)]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
