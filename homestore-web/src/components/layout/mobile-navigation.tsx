'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CloseIcon, MenuIcon } from './site-icons';
import { primaryNavigation } from '@/lib/config/site-navigation';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        window.requestAnimationFrame(() => {
          triggerRef.current?.focus();
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="-ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-gutter-mobile)] py-4 shadow-[var(--shadow-subtle)]"
        >
          <nav
            aria-label="Điều hướng di động"
            className="mx-auto flex max-w-[var(--spacing-content-max)] flex-col gap-1"
          >
            {primaryNavigation.map((item, index) => (
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-[var(--radius-control)] px-3 font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
