import React from 'react';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui';
import { getFilteredCatalogItems } from '@/features/catalog/data/catalog-source';
import { CatalogHeader } from '@/features/catalog/components/catalog-header';
import { CatalogFilters } from '@/features/catalog/components/catalog-filters';
import { CatalogSearch } from '@/features/catalog/components/catalog-search';
import { CatalogToolbar } from '@/features/catalog/components/catalog-toolbar';
import { CatalogGrid } from '@/features/catalog/components/catalog-grid';
import { CatalogEmptyState } from '@/features/catalog/components/catalog-empty-state';
import {
  parseCatalogCategory,
  parseCatalogSearch,
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
  const search = parseCatalogSearch(resolvedSearchParams.q);
  const category = parseCatalogCategory(resolvedSearchParams.category);
  const sort = parseCatalogSort(resolvedSearchParams.sort);
  const items = getFilteredCatalogItems(category, sort, search);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CatalogHeader />

      <Section className="flex-grow bg-[var(--color-canvas)] py-8 lg:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10 xl:gap-12">
            <aside
              id="catalog-categories"
              className="scroll-mt-28 lg:sticky lg:top-24 lg:self-start"
              aria-label="Danh mục sản phẩm"
            >
              <CatalogFilters
                currentCategory={category}
                currentSort={sort}
                currentSearch={search}
              />
            </aside>

            <div className="min-w-0">
              <CatalogSearch
                currentSearch={search}
                currentCategory={category}
                currentSort={sort}
              />

              <CatalogToolbar
                resultCount={items.length}
                currentCategory={category}
                currentSort={sort}
                currentSearch={search}
              />

              {items.length > 0 ? (
                <CatalogGrid items={items} />
              ) : (
                <CatalogEmptyState
                  currentSearch={search}
                  currentCategory={category}
                  currentSort={sort}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
