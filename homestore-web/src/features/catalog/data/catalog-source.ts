import type { CatalogItem } from '../model/catalog-item';
import { catalogFixtures } from './catalog-fixtures';
import {
  normalizeCatalogSearchText,
  type CatalogCategoryKey,
  type CatalogSortKey,
} from '../model/catalog-query';

export function getCatalogItems(): readonly CatalogItem[] {
  return catalogFixtures;
}

export function getCatalogItemBySlug(slug: string): CatalogItem | undefined {
  return catalogFixtures.find((item) => item.slug === slug);
}

export function getFilteredCatalogItems(
  category?: CatalogCategoryKey,
  sort?: CatalogSortKey,
  search?: string
): readonly CatalogItem[] {
  let items = [...catalogFixtures];

  if (category && category !== 'all') {
    items = items.filter((item) => item.categoryKey === category);
  }

  const normalizedSearch = normalizeCatalogSearchText(search ?? '');

  if (normalizedSearch) {
    const terms = normalizedSearch.split(' ');

    items = items.filter((item) => {
      const searchableText = normalizeCatalogSearchText(
        [item.name, item.categoryLabel, item.shortDescription].join(' ')
      );

      return terms.every((term) => searchableText.includes(term));
    });
  }

  const effectiveSort = sort || 'featured';

  items.sort((a, b) => {
    switch (effectiveSort) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'vi');
      case 'name-desc':
        return b.name.localeCompare(a.name, 'vi');
      case 'featured':
      default:
        return a.featuredOrder - b.featuredOrder;
    }
  });

  return items;
}
