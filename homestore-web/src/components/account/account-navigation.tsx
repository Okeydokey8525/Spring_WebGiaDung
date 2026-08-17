'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { accountNavigation } from '@/lib/config/account-navigation';
import { cn } from '@/lib/utils/cn';

export function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng tài khoản"
      className="flex gap-2 overflow-x-auto rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-subtle)] lg:flex-col lg:overflow-visible"
    >
      {accountNavigation.map((item) => {
        const isOverview = item.href === '/account';
        const isActive = isOverview
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
              isActive
                ? 'bg-[var(--color-brand)] text-white'
                : 'text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)]'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
