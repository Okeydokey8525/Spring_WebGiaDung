import React from 'react';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';
import { ProductMediaPlaceholder } from '@/features/catalog/components/product-media-placeholder';

interface ProductMediaPanelProps {
  item: CatalogItem;
}

export function ProductMediaPanel({ item }: ProductMediaPanelProps) {
  return (
    <section aria-label={`Hình ảnh ${item.name}`} className="w-full">
      <div className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <div className="aspect-square w-full">
          <ProductMediaPlaceholder
            variant={item.mediaVariant}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="mt-3 rounded-[var(--radius-control)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
        Hình ảnh sản phẩm sẽ được hiển thị tại khu vực này khi có dữ liệu ảnh.
      </div>
    </section>
  );
}
