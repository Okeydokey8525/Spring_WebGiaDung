import React from 'react';

interface CommerceEmptyTableProps {
  columns: readonly string[];
  title: string;
  description: string;
  actionLabel?: string;
}

export function CommerceEmptyTable({
  columns,
  title,
  description,
  actionLabel,
}: CommerceEmptyTableProps) {
  return (
    <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
      <div className="overflow-x-auto">
        <div
          className="grid min-w-[760px] border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(8rem, 1fr))`,
          }}
        >
          {columns.map((column, index) => (
            <span
              key={column}
              className={index === columns.length - 1 ? 'text-right' : ''}
            >
              {column}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 text-center">
        <h2 className="font-semibold text-[var(--color-primary)]">{title}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          {description}
        </p>

        {actionLabel ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)] opacity-55"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
