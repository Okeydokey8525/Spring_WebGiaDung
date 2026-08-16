import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { MobileNavigation } from './mobile-navigation';
import { primaryNavigation } from '@/lib/config/site-navigation';
import { SearchIcon, ShoppingBagIcon, UserIcon } from './site-icons';

const navigationLinkClass =
  'inline-flex min-h-11 items-center whitespace-nowrap rounded-[var(--radius-control)] px-2.5 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]';

const utilityIconClass =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <Container>
        <div className="flex min-h-16 items-center gap-2">
          <MobileNavigation />

          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] px-1 font-editorial text-2xl font-bold tracking-tight text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            aria-label="HomeStore trang chủ"
          >
            HomeStore
          </Link>

          <nav
            aria-label="Điều hướng chính"
            className="ml-3 hidden min-w-0 flex-1 items-center gap-0.5 lg:flex"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navigationLinkClass}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-1 lg:flex">
            <form
              method="GET"
              action="/products"
              role="search"
              className="relative w-[clamp(12rem,22vw,20rem)]"
            >
              <label htmlFor="site-search" className="sr-only">
                Tìm kiếm sản phẩm
              </label>
              <SearchIcon
                aria-hidden="true"
                width={18}
                height={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              />
              <input
                id="site-search"
                type="search"
                name="q"
                placeholder="Tìm kiếm sản phẩm..."
                autoComplete="off"
                className="h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-10 pr-11 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-brand-hover)] transition-colors hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                <SearchIcon aria-hidden="true" width={17} height={17} />
              </button>
            </form>

            <Link
              href="/login"
              aria-label="Đăng nhập"
              title="Đăng nhập"
              className={utilityIconClass}
            >
              <UserIcon aria-hidden="true" width={20} height={20} />
            </Link>

            <Link
              href="/cart"
              aria-label="Giỏ hàng"
              title="Giỏ hàng"
              className={utilityIconClass}
            >
              <ShoppingBagIcon aria-hidden="true" width={20} height={20} />
            </Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 lg:hidden">
            <Link
              href="/products#catalog-search"
              aria-label="Tìm kiếm sản phẩm"
              className={utilityIconClass}
            >
              <SearchIcon aria-hidden="true" width={20} height={20} />
            </Link>

            <Link
              href="/login"
              aria-label="Đăng nhập"
              className={utilityIconClass}
            >
              <UserIcon aria-hidden="true" width={20} height={20} />
            </Link>

            <Link
              href="/cart"
              aria-label="Giỏ hàng"
              className={utilityIconClass}
            >
              <ShoppingBagIcon aria-hidden="true" width={20} height={20} />
            </Link>
          </div>
        </div>
      </Container>

      <div
        className="h-1 w-full bg-gradient-to-r from-[var(--color-brand-soft)] via-[var(--color-accent-warm)] to-[var(--color-brand-soft)]"
        aria-hidden="true"
      />
    </header>
  );
}
