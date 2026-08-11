import React from 'react';
import Link from 'next/link';

interface ProductBreadcrumbProps {
  productName: string;
}

export function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-[var(--color-muted)]">
        <li>
          <Link
            href="/"
            className="hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
          >
            Trang chủ
          </Link>
        </li>
        <li
          aria-hidden="true"
          className="select-none text-[var(--color-border)]"
        >
          /
        </li>
        <li>
          <Link
            href="/products"
            className="hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded"
          >
            Sản phẩm
          </Link>
        </li>
        <li
          aria-hidden="true"
          className="select-none text-[var(--color-border)]"
        >
          /
        </li>
        <li
          aria-current="page"
          className="text-[var(--color-primary)] font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
}
