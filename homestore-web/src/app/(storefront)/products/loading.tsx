import React from 'react';
import { Container, Section } from '@/components/ui';
import { CatalogHeader } from '@/features/catalog/components/catalog-header';

export default function CatalogLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <CatalogHeader />

      <Section className="py-8 lg:py-12 bg-[var(--color-canvas)] flex-grow">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 lg:flex-shrink-0 flex flex-col space-y-8 animate-pulse">
              <div className="flex flex-col space-y-4">
                <div className="h-4 bg-[var(--color-border)] rounded w-1/3"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-[var(--color-border)] rounded-full w-24"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="h-4 bg-[var(--color-border)] rounded w-1/3"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-[var(--color-border)] rounded-full w-20"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="w-full lg:w-3/4 flex flex-col">
              {/* Toolbar skeleton */}
              <div className="flex justify-between items-center py-4 mb-6 border-b border-[var(--color-border)] animate-pulse">
                <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
                <div className="h-8 bg-[var(--color-border)] rounded w-32"></div>
              </div>

              {/* Grid skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 animate-pulse">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex flex-col h-full space-y-4">
                    <div className="aspect-[4/5] bg-[var(--color-border)] rounded-[var(--radius-container)] w-full"></div>
                    <div className="flex flex-col space-y-2">
                      <div className="h-3 bg-[var(--color-border)] rounded w-1/2"></div>
                      <div className="h-4 bg-[var(--color-border)] rounded w-3/4"></div>
                      <div className="h-3 bg-[var(--color-border)] rounded w-full"></div>
                      <div className="h-3 bg-[var(--color-border)] rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
