import React from 'react';
import { CatalogItem } from '../model/catalog-item';
import { ProductCard } from './product-card';

interface CatalogGridProps {
  items: readonly CatalogItem[];
}

export function CatalogGrid({ items }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
