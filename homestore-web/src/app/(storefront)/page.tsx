import React from 'react';
import Link from 'next/link';
import { HomeHero } from '@/components/home/home-hero';
import { CategoryDiscovery } from '@/components/home/category-discovery';
import { EverydayUseDiscovery } from '@/components/home/everyday-use-discovery';
import { EditorialFeature } from '@/components/home/editorial-feature';
import { HomeValues } from '@/components/home/home-values';
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
      <EverydayUseDiscovery />
      <EditorialFeature />
      <HomeValues />

      <Section className="bg-[var(--color-surface)] py-24 text-center">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Bắt đầu từ nhu cầu của bạn
            </h2>
            <p className="text-[var(--color-muted)]">
              Xem toàn bộ sản phẩm hoặc chọn một danh mục để thu hẹp lựa chọn.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xem tất cả sản phẩm
              </Link>
              <Link
                href="/products?category=storage"
                className="inline-flex items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-6 py-3 font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xem đồ dùng lưu trữ
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
