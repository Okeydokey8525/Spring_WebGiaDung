import type { CatalogCategoryKey } from './catalog-query';

export type MediaVariantKey =
  'storage' | 'tabletop' | 'textile' | 'bathroom' | 'neutral';

export interface CatalogItem {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryKey: Exclude<CatalogCategoryKey, 'all'>;
  readonly categoryLabel: string;
  readonly shortDescription: string;
  readonly mediaVariant: MediaVariantKey;
  readonly featuredOrder: number;
}
