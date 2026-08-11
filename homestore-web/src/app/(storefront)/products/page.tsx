import React from 'react';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui';
import { getFilteredCatalogItems } from '@/features/catalog/data/catalog-source';
import { CatalogHeader } from '@/features/catalog/components/catalog-header';
import { CatalogFilters } from '@/features/catalog/components/catalog-filters';
import { CatalogToolbar } from '@/features/catalog/components/catalog-toolbar';
import { CatalogGrid } from '@/features/catalog/components/catalog-grid';
import { CatalogEmptyState } from '@/features/catalog/components/catalog-empty-state';
import {
  parseCatalogCategory,
  parseCatalogSort,
} from '@/features/catalog/model/catalog-query';

export const metadata: Metadata = {
  title: 'Sản phẩm | HomeStore',
  description:
    'Khám phá đồ dùng gia đình và tiện ích đời sống theo danh mục tại HomeStore.',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = parseCatalogCategory(resolvedSearchParams.category);
  const sort = parseCatalogSort(resolvedSearchParams.sort);
  const items = getFilteredCatalogItems(category, sort);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CatalogHeader />

      <Section className="flex-grow bg-[var(--color-canvas)] py-8 lg:py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div
              id="catalog-categories"
              className="w-full scroll-mt-36 lg:w-1/4 lg:flex-shrink-0"
            >
              <CatalogFilters currentCategory={category} currentSort={sort} />
            </div>

            <div className="flex w-full flex-col lg:w-3/4">
              <CatalogToolbar
                resultCount={items.length}
                currentCategory={category}
                currentSort={sort}
              />

              {items.length > 0 ? (
                <CatalogGrid items={items} />
              ) : (
                <CatalogEmptyState />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
