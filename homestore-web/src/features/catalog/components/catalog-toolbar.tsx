import React from 'react';
import {
  CatalogRoomKey,
  CatalogCategoryKey,
  CatalogSortKey,
} from '../model/catalog-query';

interface CatalogToolbarProps {
  resultCount: number;
  currentRoom?: CatalogRoomKey;
  currentCategory?: CatalogCategoryKey;
  currentSort?: CatalogSortKey;
}

export function CatalogToolbar({
  resultCount,
  currentRoom = 'all',
  currentCategory = 'all',
  currentSort = 'featured',
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 mb-6 border-b border-[var(--color-border)] gap-4">
      <div className="text-sm font-medium text-[var(--color-muted)]">
        {resultCount} sản phẩm
      </div>

      <form
        method="GET"
        action="/products"
        className="flex items-center space-x-3 w-full sm:w-auto"
      >
        {/* Hidden inputs to preserve current filters when sorting */}
        {currentRoom !== 'all' && (
          <input type="hidden" name="room" value={currentRoom} />
        )}
        {currentCategory !== 'all' && (
          <input type="hidden" name="category" value={currentCategory} />
        )}

        <label
          htmlFor="sort-select"
          className="text-sm font-medium text-[var(--color-primary)] whitespace-nowrap"
        >
          Sắp xếp:
        </label>
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <select
            id="sort-select"
            name="sort"
            defaultValue={currentSort}
            className="flex-1 sm:flex-none block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-control)] bg-[var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] text-[var(--color-primary)] appearance-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right .7rem top 50%',
              backgroundSize: '.65rem auto',
            }}
          >
            <option value="featured">Nổi bật</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </select>
          <button
            type="submit"
            className="inline-flex sm:hidden items-center justify-center px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-control)] bg-[var(--color-surface-subtle)] text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Áp dụng
          </button>
        </div>
        {/* Hidden submit button to allow Enter key submission and act as explicit submit for JS-less enhancement */}
        <button
          type="submit"
          className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-control)] bg-[var(--color-surface-subtle)] text-[var(--color-primary)] text-sm font-medium hover:bg-[var(--color-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] transition-colors ml-2"
        >
          Lọc
        </button>
      </form>
    </div>
  );
}
