import { Container, Surface, Section } from '@/components/ui';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--color-canvas)]">
      <Section className="flex-1 flex items-center justify-center">
        <Container>
          <Surface className="max-w-2xl mx-auto p-12 text-center space-y-6">
            <h1 className="font-editorial text-4xl tracking-tight text-[var(--color-brand)]">
              HomeStore
            </h1>
            <h2 className="text-xl font-medium text-[var(--color-primary)]">
              Frontend Foundation
            </h2>
            <p className="text-[var(--color-muted)]">
              The frontend foundation application is running successfully.
            </p>
          </Surface>
        </Container>
      </Section>
    </main>
  );
}
