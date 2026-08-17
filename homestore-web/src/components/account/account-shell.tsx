import React from 'react';
import { BambooLeafMotif } from '@/components/brand/bamboo-leaf-motif';
import { Container, Section } from '@/components/ui';
import { AccountNavigation } from '@/components/account/account-navigation';

interface AccountShellProps {
  children: React.ReactNode;
}

export function AccountShell({ children }: AccountShellProps) {
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
            Đây là bản giao diện chuẩn bị cho tài khoản khách hàng. Chưa có dữ
            liệu người dùng hoặc trạng thái đăng nhập giả.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <AccountNavigation />

            <div className="mt-3 rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs leading-5 text-[var(--color-muted)]">
              Đăng xuất và phân quyền tài khoản sẽ được kích hoạt khi Auth backend
              được kết nối.
            </div>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </Section>
  );
}
