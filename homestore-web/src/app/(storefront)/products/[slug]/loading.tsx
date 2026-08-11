import React from 'react';
import { Section, Container } from '@/components/ui';

export default function ProductDetailLoading() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--color-canvas)]">
      <Section className="py-8 lg:py-12 pb-16">
        <Container>
          {/* Breadcrumb Skeleton */}
          <div className="mb-6 flex space-x-2">
            <div className="h-5 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded w-16 animate-pulse"></div>
            <div className="text-[var(--color-border)]">/</div>
            <div className="h-5 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded w-20 animate-pulse"></div>
            <div className="text-[var(--color-border)]">/</div>
            <div className="h-5 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded w-32 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Media Skeleton */}
            <div className="w-full aspect-square bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-[var(--radius-container)] animate-pulse"></div>

            {/* Summary Skeleton */}
            <div className="w-full flex flex-col space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="h-4 bg-[var(--color-border)] rounded w-1/4 animate-pulse"></div>
                <div className="h-12 sm:h-16 lg:h-20 bg-[var(--color-border)] rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-5 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
                <div className="h-5 bg-[var(--color-border)] rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="w-12 h-1 bg-[var(--color-border)] rounded-full mt-4"></div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
