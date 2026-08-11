export type CatalogRoomKey =
  'all' | 'living-room' | 'bedroom' | 'kitchen-dining' | 'bathroom';

export type CatalogCategoryKey =
  | 'all'
  | 'storage'
  | 'kitchen'
  | 'textile'
  | 'bathroom'
  | 'furniture'
  | 'decor';

export type CatalogSortKey = 'featured' | 'name-asc' | 'name-desc';

export interface CatalogQueryParams {
  room?: CatalogRoomKey;
  category?: CatalogCategoryKey;
  sort?: CatalogSortKey;
}
