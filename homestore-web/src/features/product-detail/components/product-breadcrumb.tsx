import React from 'react';
import Link from 'next/link';

interface ProductBreadcrumbProps {
  productName: string;
}

export function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 overflow-hidden">
      <ol className="flex min-w-0 items-center gap-2 text-sm text-[var(--color-muted)]">
        <li className="shrink-0">
          <Link
            href="/"
            className="rounded-sm transition-colors hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Trang chủ
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0 text-[var(--color-border-strong)]">
          /
        </li>
        <li className="shrink-0">
          <Link
            href="/products"
            className="rounded-sm transition-colors hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Sản phẩm
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0 text-[var(--color-border-strong)]">
          /
        </li>
        <li
          aria-current="page"
          className="min-w-0 truncate font-medium text-[var(--color-primary)]"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
}
