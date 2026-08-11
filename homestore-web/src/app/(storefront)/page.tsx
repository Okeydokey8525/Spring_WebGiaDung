import React from 'react';
import Link from 'next/link';
import { HomeHero } from '@/components/home/home-hero';
import { RoomDiscovery } from '@/components/home/room-discovery';
import { EditorialFeature } from '@/components/home/editorial-feature';
import { HomeValues } from '@/components/home/home-values';
import { InspirationCta } from '@/components/home/inspiration-cta';
import { Container, Section } from '@/components/ui';

export const metadata = {
  title: 'HomeStore | Đồ dùng cho không gian sống hiện đại',
  description:
    'Khám phá bộ sưu tập đồ dùng gia đình tinh tế, mang lại sự gọn gàng, tiện nghi và cảm giác bình yên cho nhịp sống thường ngày của bạn.',
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HomeHero />
      <RoomDiscovery />
      <EditorialFeature />
      <HomeValues />
      <InspirationCta />

      {/* Closing CTA */}
      <Section className="py-24 bg-[var(--color-surface)] text-center">
        <Container>
          <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Bạn đang tìm điều gì cho không gian của mình?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[var(--color-brand)] text-white font-medium px-6 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
              >
                Xem tất cả sản phẩm
              </Link>
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center border border-[var(--color-border)] text-[var(--color-primary)] font-medium px-6 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors"
              >
                Khám phá không gian
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
