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
}: CatalogFiltersProps) {
  const createUrl = (category: CatalogCategoryKey, sort: CatalogSortKey) => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort !== 'featured') params.set('sort', sort);

    const query = params.toString();
    return query ? `/products?${query}` : '/products';
  };

  return (
    <div className="flex flex-col space-y-3">
      <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
        Danh mục
      </h2>
      <nav aria-label="Bộ lọc danh mục" className="flex flex-wrap gap-2">
        {categoryOptions.map((category) => {
          const isActive = category.key === currentCategory;
          return (
            <Link
              key={category.key}
              href={createUrl(category.key, currentSort)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
                isActive
                  ? 'border-[var(--color-brand)] bg-[var(--color-brand)] font-medium text-white'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)]'
              )}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
