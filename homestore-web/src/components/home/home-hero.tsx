import React from 'react';
import Link from 'next/link';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';

const primaryActionClass =
  'inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]';

const secondaryActionClass =
  'inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]';

export function HomeHero() {
  return (
    <Section className="overflow-hidden bg-[var(--color-canvas)] pb-14 pt-10 sm:pb-16 lg:pb-20 lg:pt-14">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)] sm:text-sm">
              HomeStore · Đồ dùng mỗi ngày
            </p>

            <h1 className="max-w-3xl font-editorial text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-brand-hover)] sm:text-5xl lg:text-[3.55rem] xl:text-[4rem]">
              Đồ dùng thiết thực cho cuộc sống mỗi ngày.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              Khám phá đồ dùng gia đình và những tiện ích phục vụ các nhu cầu
              thường ngày, được sắp xếp theo danh mục rõ ràng để bạn dễ tìm hơn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className={primaryActionClass}>
                Khám phá sản phẩm
              </Link>
              <Link
                href="/products#catalog-categories"
                className={secondaryActionClass}
              >
                Xem danh mục
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-muted)]">
              <span>10 nhóm danh mục</span>
              <span>Tìm kiếm theo từ khóa</span>
              <span>Khám phá theo nhu cầu</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="absolute -left-5 top-12 h-28 w-28 rounded-full bg-[var(--color-accent-warm)] opacity-55 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-subtle)] sm:p-6">
              <BambooLeafMotif className="aspect-square w-full" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
