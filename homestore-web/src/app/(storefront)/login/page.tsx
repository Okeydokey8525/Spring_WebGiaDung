import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Đăng nhập | HomeStore',
  description: 'Đăng nhập tài khoản HomeStore.',
};

export default function LoginPage() {
  return (
    <Section className="flex min-h-[70vh] items-center bg-[var(--color-canvas)] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-xl overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
          <div
            className="h-2 bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-accent-warm)] to-[var(--color-brand-soft)]"
            aria-hidden="true"
          />
          <div className="space-y-6 p-7 sm:p-10">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
                Tài khoản HomeStore
              </p>
              <h1 className="font-editorial text-3xl text-[var(--color-brand-hover)] sm:text-4xl">
                Đăng nhập
              </h1>
              <p className="leading-7 text-[var(--color-muted)]">
                Giao diện đăng nhập đầy đủ sẽ được nối với hệ thống tài khoản ở
                milestone Auth. Route này được mở trước để điều hướng cửa hàng
                không dẫn tới trang 404.
              </p>
            </div>

            <div className="rounded-[var(--radius-surface)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
              Chưa có form giả hoặc trạng thái đăng nhập giả trong giai đoạn này.
            </div>

            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
