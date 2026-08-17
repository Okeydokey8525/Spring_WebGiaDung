import React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

interface AdminModulePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  actionLabel?: string;
}

export function AdminModulePlaceholder({
  eyebrow,
  title,
  description,
  capabilities,
  actionLabel,
}: AdminModulePlaceholderProps) {
  return (
    <div>
      <AdminPageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          actionLabel ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
            >
              {actionLabel}
            </button>
          ) : undefined
        }
      />

      <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
        <div className="rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6">
          <p className="text-sm font-semibold text-[var(--color-primary)]">
            Chưa có dữ liệu quản trị để hiển thị
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Route và bố cục của module đã sẵn sàng. Dữ liệu và thao tác ghi sẽ
            được kết nối ở milestone backend tương ứng.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-3 h-2 w-8 rounded-full bg-[var(--color-brand-soft)]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                {capability}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
