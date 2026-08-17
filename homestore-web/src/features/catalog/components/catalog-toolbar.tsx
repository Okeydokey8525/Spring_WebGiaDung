import React from 'react';
import type {
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';

interface CatalogToolbarProps {
  resultCount: number;
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
  currentSearch?: string;
}

export function CatalogToolbar({
  resultCount,
  currentCategory = 'all',
  currentSort = 'featured',
  currentSearch = '',
}: CatalogToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[var(--color-border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm font-semibold text-[var(--color-muted)]" aria-live="polite">
        {currentSearch
          ? `${resultCount} kết quả cho “${currentSearch}”`
          : `${resultCount} sản phẩm`}
      </div>

      <form
        method="GET"
        action="/products"
        className="flex w-full items-center gap-2 sm:w-auto"
      >
        {currentSearch && <input type="hidden" name="q" value={currentSearch} />}
        {currentCategory !== 'all' && (
          <input type="hidden" name="category" value={currentCategory} />
        )}

        <label
          htmlFor="sort-select"
          className="whitespace-nowrap text-sm font-medium text-[var(--color-primary)]"
        >
          Sắp xếp
        </label>

        <select
          id="sort-select"
          name="sort"
          defaultValue={currentSort}
          className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-primary)] outline-none focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] sm:min-w-44 sm:flex-none"
        >
          <option value="featured">Mặc định</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
        </select>

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Áp dụng
        </button>
      </form>
    </div>
  );
}
