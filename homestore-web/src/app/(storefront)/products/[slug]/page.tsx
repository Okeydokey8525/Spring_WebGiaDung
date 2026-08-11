import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import {
  getCatalogItemBySlug,
  getCatalogItems,
} from '@/features/catalog/data/catalog-source';
import { ProductMediaPlaceholder } from '@/features/catalog/components/product-media-placeholder';
import { ProductBreadcrumb } from '@/features/product-detail/components/product-breadcrumb';
import { ProductDetailSummary } from '@/features/product-detail/components/product-detail-summary';
import { ProductDetailInfo } from '@/features/product-detail/components/product-detail-info';

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
  const items = getCatalogItems();
  return items.map((item) => ({
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
      <Section className="py-8 pb-16 lg:py-12">
        <Container>
          <ProductBreadcrumb productName={item.name} />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] shadow-sm">
              <ProductMediaPlaceholder
                variant={item.mediaVariant}
                className="h-full w-full"
              />
            </div>

            <div className="w-full">
              <ProductDetailSummary item={item} />
            </div>
          </div>
        </Container>
      </Section>

      <ProductDetailInfo item={item} />

      <Section className="py-24 text-center">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6">
            <h2 className="font-editorial text-2xl text-[var(--color-brand)]">
              Tiếp tục khám phá
            </h2>
            <p className="mb-4 text-[var(--color-muted)]">
              Tìm thêm đồ dùng và tiện ích cho những nhu cầu thường ngày.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-8 py-3 font-medium text-white transition-colors hover:bg-[var(--color-brand-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
