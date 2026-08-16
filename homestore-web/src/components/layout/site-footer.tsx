import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { footerNavigation } from '@/lib/config/site-navigation';

const footerLinkClass =
  'w-fit rounded-[var(--radius-control)] text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div
        className="h-1 bg-gradient-to-r from-[var(--color-brand-soft)] via-[var(--color-accent-warm)] to-[var(--color-brand-soft)]"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 lg:py-14">
          <div className="space-y-4">
            <Link
              href="/"
              className="-mx-1 inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-1 font-editorial text-2xl font-bold tracking-tight text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              HomeStore
            </Link>
            <p className="max-w-sm text-sm leading-6 text-[var(--color-muted)]">
              Cửa hàng trực tuyến cho đồ dùng gia đình và những tiện ích thiết thực mỗi ngày.
            </p>
            <div
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-brand)]"
              aria-hidden="true"
            >
              <span className="h-px w-10 bg-[var(--color-brand)]" />
              <span>Everyday essentials</span>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-[var(--color-primary)]">Mua sắm</h2>
            <nav aria-label="Điều hướng chân trang Mua sắm" className="flex flex-col gap-3">
              {footerNavigation.shop.map((item) => (
                <Link key={item.href} href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-[var(--color-primary)]">HomeStore</h2>
            <nav aria-label="Điều hướng chân trang HomeStore" className="flex flex-col gap-3">
              {footerNavigation.brand.map((item) => (
                <Link key={item.href} href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-[var(--color-border)] py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-muted)]">&copy; {currentYear} HomeStore</p>
          <p className="text-xs text-[var(--color-muted)]">Mua sắm rõ ràng, gọn gàng và thiết thực.</p>
        </div>
      </Container>
    </footer>
  );
}
