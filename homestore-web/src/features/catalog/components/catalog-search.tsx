import React from 'react';
import Link from 'next/link';
import type {
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';

interface CatalogSearchProps {
  currentSearch?: string;
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
}

function buildCatalogUrl({
  category,
  sort,
}: {
  category: CatalogCategoryKey;
  sort: CatalogSortKey;
}) {
  const params = new URLSearchParams();

  if (category !== 'all') params.set('category', category);
  if (sort !== 'featured') params.set('sort', sort);

  const query = params.toString();
  return query ? `/products?${query}` : '/products';
}

export function CatalogSearch({
  currentSearch = '',
  currentCategory = 'all',
  currentSort = 'featured',
}: CatalogSearchProps) {
  const clearSearchUrl = buildCatalogUrl({
    category: currentCategory,
    sort: currentSort,
  });

  return (
    <form
      method="GET"
      action="/products"
      role="search"
      className="mb-5 rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4"
    >
      {currentCategory !== 'all' && (
        <input type="hidden" name="category" value={currentCategory} />
      )}
      {currentSort !== 'featured' && (
        <input type="hidden" name="sort" value={currentSort} />
      )}

      <label
        htmlFor="catalog-search"
        className="mb-2 block text-sm font-medium text-[var(--color-primary)]"
      >
        Tìm kiếm sản phẩm
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="catalog-search"
          type="search"
          name="q"
          defaultValue={currentSearch}
          placeholder="Tìm theo tên, danh mục hoặc mô tả..."
          autoComplete="off"
          className="min-w-0 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        />

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Tìm kiếm
        </button>

        {currentSearch && (
          <Link
            href={clearSearchUrl}
            aria-label="Xóa từ khóa tìm kiếm"
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xóa tìm kiếm
          </Link>
        )}
      </div>
    </form>
  );
}
