import { storeCategories } from '@/lib/config/store-categories';
import type { StoreCategoryKey } from '@/lib/config/store-categories';

export type CatalogCategoryKey = 'all' | StoreCategoryKey;

export type CatalogSortKey = 'featured' | 'name-asc' | 'name-desc';

export interface CatalogQueryParams {
  q?: string;
  category?: CatalogCategoryKey;
  sort?: CatalogSortKey;
}

export function parseCatalogCategory(
  value: string | string[] | undefined
): CatalogCategoryKey {
  if (typeof value !== 'string' || value === 'all') return 'all';

  return (
    storeCategories.find((category) => category.key === value)?.key ?? 'all'
  );
}

export function parseCatalogSort(
  value: string | string[] | undefined
): CatalogSortKey {
  if (value === 'name-asc' || value === 'name-desc') return value;
  return 'featured';
}

export function parseCatalogSearch(
  value: string | string[] | undefined
): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizeCatalogSearchText(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('vi-VN')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}
