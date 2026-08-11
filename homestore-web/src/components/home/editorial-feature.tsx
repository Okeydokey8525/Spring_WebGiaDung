import React from 'react';
import Link from 'next/link';
import { Container, Section, Surface } from '@/components/ui';
import { editorialFeatures } from '@/lib/config/home-content';

export function EditorialFeature() {
  return (
    <Section className="py-16 lg:py-24 bg-[var(--color-canvas)] border-y border-[var(--color-border)]">
      <Container>
        <div className="flex flex-col space-y-24">
          {editorialFeatures.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Visual Area */}
                <div
                  className={`col-span-1 lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
                >
                  <Surface className="aspect-video w-full rounded-[var(--radius-container)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center bg-[var(--color-surface)] shadow-sm">
                    {/* Abstract placeholder for lifestyle photography */}
                    <svg
                      className="w-1/3 h-1/3 text-[var(--color-border)] opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </Surface>
                </div>

                {/* Text Area */}
                <div
                  className={`col-span-1 lg:col-span-5 flex flex-col space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
                >
                  <h3 className="font-editorial text-3xl tracking-tight text-[var(--color-brand)]">
                    {feature.title}
                  </h3>
                  <p className="text-base text-[var(--color-primary)] leading-relaxed">
                    {feature.description}
                  </p>
                  <div>
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] rounded-[var(--radius-control)] transition-colors group"
                    >
                      <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-colors pb-0.5">
                        {feature.linkLabel}
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
