import React from 'react';
import Link from 'next/link';
import { Container, Section, Surface } from '@/components/ui';
import { roomDiscovery } from '@/lib/config/home-content';

export function RoomDiscovery() {
  return (
    <Section className="py-16 bg-[var(--color-surface)]">
      <Container>
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-4 max-w-2xl">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Khám phá theo không gian
            </h2>
            <p className="text-[var(--color-muted)] text-base">
              Tìm kiếm nguồn cảm hứng và những giải pháp bài trí phù hợp nhất
              cho từng căn phòng trong ngôi nhà bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomDiscovery.map((room) => (
              <Link
                key={room.id}
                href={room.href}
                className="group flex flex-col space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-container)]"
              >
                {/* Abstract Image Placeholder */}
                <Surface className="aspect-square w-full rounded-[var(--radius-container)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center bg-[var(--color-canvas)] transition-colors group-hover:bg-[var(--color-surface-subtle)]">
                  <svg
                    className="w-1/2 h-1/2 text-[var(--color-border)] group-hover:text-[var(--color-muted)] transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <path d="M3 3h18v18H3V3z" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </Surface>

                {/* Room Info */}
                <div className="flex flex-col space-y-1">
                  <h3 className="font-medium text-[var(--color-primary)] group-hover:text-[var(--color-brand)] transition-colors flex items-center justify-between">
                    <span>{room.title}</span>
                    <svg
                      className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-brand)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {room.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
