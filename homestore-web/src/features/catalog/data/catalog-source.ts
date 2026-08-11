import type { CatalogItem } from '../model/catalog-item';
import { catalogFixtures } from './catalog-fixtures';
import type {
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';

export function getCatalogItems(): readonly CatalogItem[] {
  return catalogFixtures;
}

export function getCatalogItemBySlug(slug: string): CatalogItem | undefined {
  return catalogFixtures.find((item) => item.slug === slug);
}

export function getFilteredCatalogItems(
  category?: CatalogCategoryKey,
  sort?: CatalogSortKey
): readonly CatalogItem[] {
  let items = [...catalogFixtures];

  if (category && category !== 'all') {
    items = items.filter((item) => item.categoryKey === category);
  }

  const effectiveSort = sort || 'featured';

  items.sort((a, b) => {
    switch (effectiveSort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'featured':
      default:
        return a.featuredOrder - b.featuredOrder;
    }
  });

  return items;
}
