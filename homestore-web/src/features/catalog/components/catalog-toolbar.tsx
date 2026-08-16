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
    <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-[var(--color-border)] py-4 sm:flex-row sm:items-center">
      <div className="text-sm font-medium text-[var(--color-muted)]">
        {currentSearch
          ? `${resultCount} kết quả cho “${currentSearch}”`
          : `${resultCount} sản phẩm`}
      </div>

      <form
        method="GET"
        action="/products"
        className="flex w-full items-center space-x-3 sm:w-auto"
      >
        {currentSearch && (
          <input type="hidden" name="q" value={currentSearch} />
        )}
        {currentCategory !== 'all' && (
          <input type="hidden" name="category" value={currentCategory} />
        )}

        <label
          htmlFor="sort-select"
          className="whitespace-nowrap text-sm font-medium text-[var(--color-primary)]"
        >
          Sắp xếp:
        </label>
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <select
            id="sort-select"
            name="sort"
            defaultValue={currentSort}
            className="block w-full flex-1 appearance-none rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pr-10 pl-3 text-sm text-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] sm:w-auto sm:flex-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right .7rem top 50%',
              backgroundSize: '.65rem auto',
            }}
          >
            <option value="featured">Nổi bật</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] sm:hidden"
          >
            Áp dụng
          </button>
        </div>
        <button
          type="submit"
          className="ml-2 hidden items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] sm:inline-flex"
        >
          Lọc
        </button>
      </form>
    </div>
  );
}
