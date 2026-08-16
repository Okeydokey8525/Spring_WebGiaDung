import React from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import type {
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';

interface CatalogEmptyStateProps {
  currentSearch?: string;
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
}

function buildClearSearchUrl(
  category: CatalogCategoryKey,
  sort: CatalogSortKey
) {
  const params = new URLSearchParams();

  if (category !== 'all') params.set('category', category);
  if (sort !== 'featured') params.set('sort', sort);

  const query = params.toString();
  return query ? `/products?${query}` : '/products';
}

export function CatalogEmptyState({
  currentSearch = '',
  currentCategory = 'all',
  currentSort = 'featured',
}: CatalogEmptyStateProps) {
  const clearSearchUrl = buildClearSearchUrl(currentCategory, currentSort);

  return (
    <Section className="my-8 rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center space-y-4">
          <svg
            className="mb-4 h-12 w-12 text-[var(--color-muted)] opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M11 4a7 7 0 105.29 11.59L21 20.3M8.5 9.5h5m-5 3h3"
            />
          </svg>

          <h2 className="text-xl font-medium text-[var(--color-primary)]">
            {currentSearch
              ? `Không tìm thấy sản phẩm cho “${currentSearch}”.`
              : 'Không có sản phẩm phù hợp với bộ lọc hiện tại.'}
          </h2>

          <p className="text-sm text-[var(--color-muted)]">
            {currentSearch
              ? 'Hãy thử từ khóa khác, xóa từ khóa tìm kiếm hoặc xem lại toàn bộ sản phẩm.'
              : 'Hãy thử thay đổi danh mục hoặc xem lại toàn bộ sản phẩm.'}
          </p>

          <div className="flex flex-col gap-2 pt-4 sm:flex-row">
            {currentSearch && (
              <Link
                href={clearSearchUrl}
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Xóa tìm kiếm
              </Link>
            )}

            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
