import { storeCategories } from '@/lib/config/store-categories';
import type { StoreCategoryKey } from '@/lib/config/store-categories';

export type CatalogCategoryKey = 'all' | StoreCategoryKey;

export type CatalogSortKey = 'featured' | 'name-asc' | 'name-desc';

export interface CatalogQueryParams {
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
