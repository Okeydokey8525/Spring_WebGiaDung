'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon, SearchIcon, UserIcon } from './site-icons';
import { primaryNavigation } from '@/lib/config/site-navigation';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center">
      <button
        type="button"
        className="p-2 -ml-2 text-[var(--color-primary)] hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)]"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm z-40 px-[var(--spacing-gutter-mobile)] py-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 border-b border-[var(--color-border)] pb-4">
            <Link
              href="/search"
              className="flex items-center gap-3 px-3 py-2 text-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)] rounded-[var(--radius-control)]"
              onClick={() => setIsOpen(false)}
            >
              <SearchIcon aria-hidden="true" />
              <span className="font-medium">Tìm kiếm sản phẩm</span>
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 px-3 py-2 text-[var(--color-primary)] hover:bg-[var(--color-surface-subtle)] rounded-[var(--radius-control)]"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon aria-hidden="true" />
              <span className="font-medium">Tài khoản</span>
            </Link>
          </div>
          <nav aria-label="Điều hướng di động" className="flex flex-col gap-1">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[var(--color-primary)] font-medium hover:bg-[var(--color-surface-subtle)] rounded-[var(--radius-control)]"
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
