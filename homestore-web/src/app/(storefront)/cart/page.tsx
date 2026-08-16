import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { ShoppingBagIcon } from '@/components/layout/site-icons';

export const metadata: Metadata = {
  title: 'Giỏ hàng | HomeStore',
  description: 'Giỏ hàng mua sắm tại HomeStore.',
};

export default function CartPage() {
  return (
    <Section className="bg-[var(--color-canvas)] py-12 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Mua sắm
            </p>
            <h1 className="font-editorial text-3xl text-[var(--color-brand-hover)] sm:text-4xl">
              Giỏ hàng
            </h1>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-subtle)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]">
              <ShoppingBagIcon aria-hidden="true" width={24} height={24} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-primary)]">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
              Chức năng thêm sản phẩm vào giỏ hàng sẽ được kết nối ở milestone
              Cart. Hiện tại HomeStore chưa tạo dữ liệu giỏ hàng giả.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
