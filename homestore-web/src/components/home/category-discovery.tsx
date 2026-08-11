import React from 'react';
import Link from 'next/link';
import { Container, Section, Surface } from '@/components/ui';
import { homepageCategories } from '@/lib/config/store-categories';

export function CategoryDiscovery() {
  return (
    <Section className="bg-[var(--color-surface)] py-16">
      <Container>
        <div className="flex flex-col space-y-10">
          <div className="flex max-w-2xl flex-col space-y-4">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Khám phá theo danh mục
            </h2>
            <p className="text-base text-[var(--color-muted)]">
              Bắt đầu từ nhóm đồ dùng bạn cần và đi thẳng đến danh sách sản phẩm
              phù hợp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homepageCategories.map((category) => (
              <Link
                key={category.key}
                href={category.href}
                className="group rounded-[var(--radius-container)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                <Surface className="flex h-full min-h-48 flex-col justify-between gap-8 overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 transition-colors group-hover:bg-[var(--color-surface-subtle)]">
                  <svg
                    className="h-12 w-12 text-[var(--color-border)] transition-colors group-hover:text-[var(--color-muted)]"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="7" y="7" width="34" height="34" rx="6" />
                    <path d="M7 20h34M20 20v21" />
                  </svg>

                  <div className="flex flex-col gap-2">
                    <h3 className="flex items-center justify-between gap-4 font-medium text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-brand)]">
                      <span>{category.label}</span>
                      <span aria-hidden="true">→</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                      {category.description}
                    </p>
                  </div>
                </Surface>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
