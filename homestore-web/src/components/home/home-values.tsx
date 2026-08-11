import React from 'react';
import { Container, Section, Surface } from '@/components/ui';
import { homeValues } from '@/lib/config/home-content';

export function HomeValues() {
  return (
    <Section className="py-16 lg:py-24 bg-[var(--color-surface)]">
      <Container>
        <div className="flex flex-col space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
              Nguyên tắc thiết kế
            </h2>
            <p className="text-[var(--color-muted)] text-base">
              Cách chúng tôi tiếp cận mỗi đồ vật để mang lại trải nghiệm sống
              trọn vẹn hơn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeValues.map((value) => (
              <Surface
                key={value.id}
                className="p-8 flex flex-col items-center text-center space-y-4 rounded-[var(--radius-container)] bg-[var(--color-canvas)] border border-[var(--color-border)]"
              >
                {/* Minimalist icon block */}
                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5 text-[var(--color-brand)]"
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

                <h3 className="font-medium text-lg text-[var(--color-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
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
