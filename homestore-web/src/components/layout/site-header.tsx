import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { MobileNavigation } from './mobile-navigation';
import { primaryNavigation } from '@/lib/config/site-navigation';
import { SearchIcon, UserIcon, ShoppingBagIcon } from './site-icons';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <Container>
        {/* ROW 1: Mobile Top / Desktop Top */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNavigation />
            <Link
              href="/"
              className="font-editorial text-2xl font-bold text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] px-1"
              aria-label="HomeStore trang chủ"
            >
              HomeStore
            </Link>
          </div>

          {/* Desktop Utilities */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/search"
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] px-2 py-1"
            >
              <SearchIcon aria-hidden="true" width={20} height={20} />
              Tìm kiếm sản phẩm
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] px-2 py-1"
            >
              <UserIcon aria-hidden="true" width={20} height={20} />
              Tài khoản
            </Link>
          </div>

          {/* Mobile Cart / Desktop Cart */}
          <div className="flex items-center">
            <Link
              href="/cart"
              className="flex items-center gap-2 p-2 -mr-2 text-[var(--color-primary)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)]"
            >
              <ShoppingBagIcon aria-hidden="true" />
              <span className="hidden lg:inline text-sm font-medium">
                Giỏ hàng
              </span>
            </Link>
          </div>
        </div>
      </Container>

      {/* ROW 2: Desktop Primary Nav */}
      <div className="hidden lg:block border-t border-[var(--color-border)]">
        <Container>
          <nav
            aria-label="Điều hướng chính"
            className="flex items-center h-12 gap-8"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
