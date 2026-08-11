import React from 'react';
import { Metadata } from 'next';
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
    <div className="flex flex-col w-full min-h-screen bg-[var(--color-canvas)]">
      <Section className="py-8 lg:py-12 pb-16">
        <Container>
          <ProductBreadcrumb productName={item.name} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left: Large Media */}
            <div className="w-full aspect-square rounded-[var(--radius-container)] overflow-hidden border border-[var(--color-border)] shadow-sm">
              <ProductMediaPlaceholder
                variant={item.mediaVariant}
                className="w-full h-full"
              />
            </div>

            {/* Right: Summary */}
            <div className="w-full">
              <ProductDetailSummary item={item} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Product Information Panel */}
      <ProductDetailInfo item={item} />

      {/* Discovery / Return CTA */}
      <Section className="py-24 text-center">
        <Container>
          <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-editorial text-[var(--color-brand)]">
              Tiếp tục khám phá
            </h2>
            <p className="text-[var(--color-muted)] mb-4">
              Tìm kiếm thêm các giải pháp cho không gian sống của bạn.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[var(--color-brand)] text-white font-medium px-8 py-3 rounded-[var(--radius-control)] hover:bg-[var(--color-brand-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand)] transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
