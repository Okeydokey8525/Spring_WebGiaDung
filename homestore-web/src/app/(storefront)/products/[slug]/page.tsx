import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import {
  getCatalogItemBySlug,
  getCatalogItems,
} from '@/features/catalog/data/catalog-source';
import { ProductBreadcrumb } from '@/features/product-detail/components/product-breadcrumb';
import { ProductDetailSummary } from '@/features/product-detail/components/product-detail-summary';
import { ProductDetailInfo } from '@/features/product-detail/components/product-detail-info';
import { ProductMediaPanel } from '@/features/product-detail/components/product-media-panel';
import { RelatedProducts } from '@/features/product-detail/components/related-products';

export const dynamicParams = false;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getCatalogItemBySlug(resolvedParams.slug);

  if (!item) {
    return {
      title: 'Không tìm thấy sản phẩm | HomeStore',
    };
  }

  return {
    title: `${item.name} | HomeStore`,
    description: item.shortDescription,
  };
}

export async function generateStaticParams() {
  return getCatalogItems().map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const item = getCatalogItemBySlug(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-canvas)]">
      <Section className="pb-14 pt-7 lg:pb-16 lg:pt-10">
        <Container>
          <ProductBreadcrumb productName={item.name} />

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(22rem,5fr)] lg:gap-12 xl:gap-16">
            <ProductMediaPanel item={item} />
            <ProductDetailSummary item={item} />
          </div>
        </Container>
      </Section>

      <ProductDetailInfo item={item} />
      <RelatedProducts item={item} />

      <Section className="bg-[var(--color-surface)] py-14 text-center lg:py-16">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-editorial text-3xl font-semibold text-[var(--color-brand-hover)]">
              Tiếp tục khám phá HomeStore
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Xem thêm đồ dùng và tiện ích cho những nhu cầu thường ngày.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-7 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
