import React from 'react';
import { Container, Section, Surface } from '@/components/ui';
import { homeValues } from '@/lib/config/home-content';

export function HomeValues() {
  return (
    <Section className="bg-[var(--color-surface)] py-16 lg:py-24">
      <Container>
        <div className="flex flex-col space-y-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Điều HomeStore ưu tiên
            </h2>
            <p className="text-base text-[var(--color-muted)]">
              Một cách khám phá đồ dùng hằng ngày rõ ràng, vừa đủ và dễ tiếp
              cận.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {homeValues.map((value) => (
              <Surface
                key={value.id}
                className="flex flex-col items-center space-y-4 rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-8 text-center"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <svg
                    className="h-5 w-5 text-[var(--color-brand)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[var(--color-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {value.description}
                </p>
              </Surface>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
