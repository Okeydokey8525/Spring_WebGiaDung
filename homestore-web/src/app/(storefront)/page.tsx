import React from 'react';
import Link from 'next/link';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { CategoryDiscovery } from '@/components/home/category-discovery';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HomeHero } from '@/components/home/home-hero';
import { HomeValues } from '@/components/home/home-values';
import { PracticalProductDiscovery } from '@/components/home/practical-product-discovery';
import { Container, Section } from '@/components/ui';

export const metadata = {
  title: 'HomeStore | Đồ dùng và tiện ích cho cuộc sống hằng ngày',
  description:
    'Khám phá đồ gia dụng, đồ dùng và tiện ích đời sống theo danh mục rõ ràng tại HomeStore.',
};

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HomeHero />
      <CategoryDiscovery />
      <FeaturedProducts />
      <HomeValues />
      <PracticalProductDiscovery />

      <Section className="relative overflow-hidden bg-[var(--color-surface)] py-16 text-center lg:py-20">
        <div
          className="pointer-events-none absolute -bottom-40 left-1/2 w-96 -translate-x-1/2 opacity-[0.06]"
          aria-hidden="true"
        >
          <BambooLeafMotif />
        </div>

        <Container>
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <div
              className="mb-5 h-px w-16 bg-[var(--color-accent-warm)]"
              aria-hidden="true"
            />
            <h2 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--color-brand-hover)] sm:text-4xl">
              Tìm thứ bạn cần cho mỗi ngày
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--color-muted)]">
              Bắt đầu từ toàn bộ sản phẩm hoặc chọn một danh mục phù hợp với nhu
              cầu của bạn.
            </p>
            <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xem tất cả sản phẩm
              </Link>
              <Link
                href="/products#catalog-categories"
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Khám phá danh mục
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
