import React from 'react';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <Section className="relative overflow-hidden bg-[var(--color-canvas)] py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-28 hidden w-80 opacity-[0.07] lg:block"
        aria-hidden="true"
      >
        <BambooLeafMotif />
      </div>

      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-elevated)] lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative overflow-hidden bg-[var(--color-brand-hover)] p-7 text-white sm:p-9 lg:p-10">
            <div
              className="pointer-events-none absolute -bottom-24 -right-20 w-72 opacity-[0.12]"
              aria-hidden="true"
            >
              <BambooLeafMotif />
            </div>

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-soft)]">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-editorial text-3xl font-semibold leading-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                {description}
              </p>

              <div className="mt-8 grid gap-3 text-sm text-white/80">
                <div className="rounded-[var(--radius-surface)] border border-white/15 bg-white/5 p-4">
                  Theo dõi đơn hàng và thông tin tài khoản tại một nơi.
                </div>
                <div className="rounded-[var(--radius-surface)] border border-white/15 bg-white/5 p-4">
                  Danh sách yêu thích sẽ được đồng bộ khi hệ thống tài khoản được
                  kết nối.
                </div>
              </div>
            </div>
          </aside>

          <div className="p-6 sm:p-9 lg:p-10">
            {children}
            {footer ? (
              <div className="mt-7 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
