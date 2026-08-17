import React from 'react';
import Link from 'next/link';
import type {
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';
import { storeCategories } from '@/lib/config/store-categories';
import { cn } from '@/lib/utils/cn';

interface CatalogFiltersProps {
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
  currentSearch?: string;
}

const categoryOptions: readonly {
  key: CatalogCategoryKey;
  label: string;
}[] = [
  { key: 'all', label: 'Tất cả danh mục' },
  ...storeCategories.map(({ key, label }) => ({ key, label })),
];

export function CatalogFilters({
  currentCategory = 'all',
  currentSort = 'featured',
  currentSearch = '',
}: CatalogFiltersProps) {
  const createUrl = (category: CatalogCategoryKey, sort: CatalogSortKey) => {
    const params = new URLSearchParams();

    if (currentSearch) params.set('q', currentSearch);
    if (category !== 'all') params.set('category', category);
    if (sort !== 'featured') params.set('sort', sort);

    const query = params.toString();
    return query ? `/products?${query}` : '/products';
  };

  return (
    <div className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-subtle)] lg:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
          Danh mục
        </h2>
        <span className="text-xs text-[var(--color-muted)]">
          {categoryOptions.length - 1} nhóm
        </span>
      </div>

      <nav
        aria-label="Bộ lọc danh mục"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
      >
        {categoryOptions.map((category) => {
          const isActive = category.key === currentCategory;

          return (
            <Link
              key={category.key}
              href={createUrl(category.key, currentSort)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] border px-4 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] lg:w-full lg:justify-between',
                isActive
                  ? 'border-[var(--color-brand)] bg-[var(--color-brand)] font-semibold text-white'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]'
              )}
            >
              <span>{category.label}</span>
              <span className="hidden lg:inline" aria-hidden="true">
                →
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
