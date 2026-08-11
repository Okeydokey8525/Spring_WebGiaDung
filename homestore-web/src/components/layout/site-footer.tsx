import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNavigation } from '@/lib/config/site-navigation';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-editorial text-2xl font-bold text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] inline-block px-1 -mx-1"
            >
              HomeStore
            </Link>
            <p className="text-[var(--color-muted)] text-sm max-w-xs">
              Không gian sống gọn gàng, tiện nghi và có chủ đích.
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <h2 className="font-semibold text-[var(--color-primary)] mb-4">
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
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--color-primary)] mb-4">
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
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--color-primary)] mb-4">
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
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Legal/Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {currentYear} HomeStore
          </p>
        </div>
      </Container>
    </footer>
  );
}
