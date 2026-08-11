import React from 'react';
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui';
import { getFilteredCatalogItems } from '@/features/catalog/data/catalog-source';
import { CatalogHeader } from '@/features/catalog/components/catalog-header';
import { CatalogFilters } from '@/features/catalog/components/catalog-filters';
import { CatalogToolbar } from '@/features/catalog/components/catalog-toolbar';
import { CatalogGrid } from '@/features/catalog/components/catalog-grid';
import { CatalogEmptyState } from '@/features/catalog/components/catalog-empty-state';
import {
  CatalogRoomKey,
  CatalogCategoryKey,
  CatalogSortKey,
} from '@/features/catalog/model/catalog-query';

export const metadata: Metadata = {
  title: 'Sản phẩm | HomeStore',
  description: 'Khám phá các nhóm sản phẩm cho không gian sống tại HomeStore.',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // In Next.js 15+, searchParams is a promise that must be awaited
  const resolvedSearchParams = await searchParams;

  // Extract query parameters with safe fallbacks
  const room = (
    typeof resolvedSearchParams.room === 'string'
      ? resolvedSearchParams.room
      : 'all'
  ) as CatalogRoomKey;
  const category = (
    typeof resolvedSearchParams.category === 'string'
      ? resolvedSearchParams.category
      : 'all'
  ) as CatalogCategoryKey;
  const sort = (
    typeof resolvedSearchParams.sort === 'string'
      ? resolvedSearchParams.sort
      : 'featured'
  ) as CatalogSortKey;

  // Fetch fixtures (acting as source boundary)
  const items = getFilteredCatalogItems(room, category, sort);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CatalogHeader />

      <Section className="py-8 lg:py-12 bg-[var(--color-canvas)] flex-grow">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left sidebar for filters (desktop) / Top for mobile */}
            <div className="w-full lg:w-1/4 lg:flex-shrink-0">
              <CatalogFilters
                currentRoom={room}
                currentCategory={category}
                currentSort={sort}
              />
            </div>

            {/* Right content area */}
            <div className="w-full lg:w-3/4 flex flex-col">
              <CatalogToolbar
                resultCount={items.length}
                currentRoom={room}
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
