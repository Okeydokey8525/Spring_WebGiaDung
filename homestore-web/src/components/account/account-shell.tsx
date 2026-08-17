import React from 'react';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';
import { AccountNavigation } from '@/components/account/account-navigation';
import { LogoutButton } from '@/components/account/logout-button';
import type { AuthUser } from '@/lib/auth/types';

interface AccountShellProps {
  children: React.ReactNode;
  user: AuthUser;
}

export function AccountShell({ children, user }: AccountShellProps) {
  return (
    <Section className="relative overflow-hidden bg-[var(--color-canvas)] py-10 lg:py-14">
      <div
        className="pointer-events-none absolute -right-32 top-20 hidden w-80 opacity-[0.05] xl:block"
        aria-hidden="true"
      >
        <BambooLeafMotif />
      </div>

      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Tài khoản
          </p>
          <h1 className="mt-3 font-editorial text-3xl font-semibold text-[var(--color-brand-hover)] sm:text-4xl">
            Không gian tài khoản HomeStore
          </h1>
          <p className="mt-3 leading-7 text-[var(--color-muted)]">
            Phiên đăng nhập của bạn đang được xác thực bởi backend HomeStore.
            Các tính năng hồ sơ, địa chỉ, đơn hàng và yêu thích sẽ được kết nối
            theo từng milestone riêng.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                Đã đăng nhập
              </p>
              <p className="mt-2 break-words font-semibold text-[var(--color-primary)]">
                {user.fullName}
              </p>
              <p className="mt-1 break-all text-xs leading-5 text-[var(--color-muted)]">
                {user.email}
              </p>
            </div>

            <AccountNavigation />

            <div className="mt-3">
              <LogoutButton />
            </div>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </Section>
  );
}
