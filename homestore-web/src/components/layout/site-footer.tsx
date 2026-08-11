import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNavigation } from '@/lib/config/site-navigation';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="-mx-1 inline-block rounded-[var(--radius-control)] px-1 font-editorial text-2xl font-bold text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              HomeStore
            </Link>
            <p className="max-w-xs text-sm text-[var(--color-muted)]">
              Đồ dùng và tiện ích cho những nhu cầu thường ngày.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-[var(--color-primary)]">
              Mua sắm
            </h2>
            <nav
              aria-label="Điều hướng chân trang Mua sắm"
              className="flex flex-col gap-3"
            >
              {footerNavigation.shop.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit rounded-[var(--radius-control)] text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-[var(--color-primary)]">
              Hỗ trợ
            </h2>
            <nav
              aria-label="Điều hướng chân trang Hỗ trợ"
              className="flex flex-col gap-3"
            >
              {footerNavigation.support.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit rounded-[var(--radius-control)] text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-[var(--color-primary)]">
              HomeStore
            </h2>
            <nav
              aria-label="Điều hướng chân trang HomeStore"
              className="flex flex-col gap-3"
            >
              {footerNavigation.brand.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit rounded-[var(--radius-control)] text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {currentYear} HomeStore
          </p>
        </div>
      </Container>
    </footer>
  );
}
