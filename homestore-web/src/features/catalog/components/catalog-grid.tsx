import React from 'react';
import type { CatalogItem } from '../model/catalog-item';
import { ProductCard } from './product-card';

interface CatalogGridProps {
  items: readonly CatalogItem[];
}

export function CatalogGrid({ items }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-9 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
