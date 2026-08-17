'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavigation } from '@/lib/config/admin-navigation';
import { cn } from '@/lib/utils/cn';

interface AdminShellProps {
  children: React.ReactNode;
}

function isCurrentPath(pathname: string, href: string) {
  if (href === '/admin') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const sidebar = (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/admin"
          className="inline-flex rounded-sm font-editorial text-2xl font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          HomeStore
        </Link>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          Administration
        </p>
      </div>

      <nav
        aria-label="Điều hướng quản trị"
        className="flex-1 overflow-y-auto px-3 py-4"
      >
        {adminNavigation.map((section) => (
          <div key={section.label} className="mb-5 last:mb-0">
            <p className="px-3 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/40">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isCurrentPath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-control)] px-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                      active
                        ? 'bg-white text-[var(--color-brand-hover)]'
                        : 'text-white/78 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    {active ? <span aria-hidden="true">•</span> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-white/15 px-4 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ← Xem cửa hàng
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh bg-[var(--color-canvas)] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="hidden min-h-dvh flex-col bg-[var(--color-brand-hover)] lg:sticky lg:top-0 lg:flex lg:h-dvh">
        {sidebar}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Đóng menu quản trị"
            className="absolute inset-0 bg-black/35"
            onClick={() => {
              setMobileOpen(false);
              window.requestAnimationFrame(() => menuButtonRef.current?.focus());
            }}
          />
          <aside className="relative flex h-full w-[min(18rem,86vw)] flex-col bg-[var(--color-brand-hover)] shadow-2xl">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                ref={menuButtonRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] text-lg text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] lg:hidden"
                aria-label="Mở menu quản trị"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                ☰
              </button>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[var(--color-primary)]">
                  Quản trị HomeStore
                </p>
                <p className="truncate text-xs text-[var(--color-muted)]">
                  Giao diện quản lý nội bộ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden rounded-[var(--radius-pill)] bg-[var(--color-accent-warm)] px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] sm:inline-flex">
                UI Preview
              </span>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Storefront
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
