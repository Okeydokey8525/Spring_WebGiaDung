import React from 'react';
import Link from 'next/link';
import {
  CatalogRoomKey,
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';
import { cn } from '@/lib/utils/cn';

interface CatalogFiltersProps {
  currentRoom?: CatalogRoomKey;
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
}

const ROOMS: { key: CatalogRoomKey; label: string }[] = [
  { key: 'all', label: 'Tất cả không gian' },
  { key: 'living-room', label: 'Phòng khách' },
  { key: 'bedroom', label: 'Phòng ngủ' },
  { key: 'kitchen-dining', label: 'Bếp & Bàn ăn' },
  { key: 'bathroom', label: 'Phòng tắm' },
];

const CATEGORIES: { key: CatalogCategoryKey; label: string }[] = [
  { key: 'all', label: 'Tất cả danh mục' },
  { key: 'storage', label: 'Lưu trữ' },
  { key: 'kitchen', label: 'Nhà bếp' },
  { key: 'textile', label: 'Đồ vải' },
  { key: 'bathroom', label: 'Phòng tắm' },
  { key: 'furniture', label: 'Nội thất' },
  { key: 'decor', label: 'Trang trí' },
];

export function CatalogFilters({
  currentRoom = 'all',
  currentCategory = 'all',
  currentSort = 'featured',
}: CatalogFiltersProps) {
  const createUrl = (
    room: CatalogRoomKey,
    category: CatalogCategoryKey,
    sort: CatalogSortKey
  ) => {
    const params = new URLSearchParams();
    if (room !== 'all') params.set('room', room);
    if (category !== 'all') params.set('category', category);
    if (sort !== 'featured') params.set('sort', sort);

    const query = params.toString();
    return query ? `/products?${query}` : '/products';
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Room Filter */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
          Không gian
        </h2>
        <nav aria-label="Bộ lọc không gian" className="flex flex-wrap gap-2">
          {ROOMS.map((room) => {
            const isActive = room.key === currentRoom;
            return (
              <Link
                key={room.key}
                href={createUrl(room.key, currentCategory, currentSort)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] border',
                  isActive
                    ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] font-medium'
                    : 'bg-[var(--color-surface)] text-[var(--color-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]'
                )}
              >
                {room.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
          Danh mục
        </h2>
        <nav aria-label="Bộ lọc danh mục" className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === currentCategory;
            return (
              <Link
                key={cat.key}
                href={createUrl(currentRoom, cat.key, currentSort)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] border',
                  isActive
                    ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)] font-medium'
                    : 'bg-[var(--color-surface)] text-[var(--color-primary)] border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]'
                )}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
