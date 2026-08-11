import { CatalogCategoryKey, CatalogRoomKey } from './catalog-query';

export type MediaVariantKey =
  'storage' | 'tabletop' | 'textile' | 'bathroom' | 'neutral' | 'furniture';

export interface CatalogItem {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryKey: CatalogCategoryKey;
  readonly categoryLabel: string;
  readonly roomKey: CatalogRoomKey;
  readonly roomLabel: string;
  readonly shortDescription: string;
  readonly mediaVariant: MediaVariantKey;
  readonly featuredOrder: number;
}
