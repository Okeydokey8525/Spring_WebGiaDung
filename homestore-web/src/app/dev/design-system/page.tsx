import {
  Container,
  Section,
  Surface,
  Button,
  Badge,
  Input,
} from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HomeStore Design System',
  robots: { index: false, follow: false },
};

export default function DesignSystemPreview() {
  return (
    <Container className="py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-editorial font-bold text-[var(--color-primary)]">
          HomeStore Design System
        </h1>
        <p className="text-[var(--color-muted)] max-w-2xl text-lg">
          Internal preview for tokens and primitive components. This is not a
          public route.
        </p>
      </div>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">1. Color Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch
            label="Canvas"
            bg="bg-[var(--color-canvas)]"
            hex="#F7F6F2"
            border
          />
          <ColorSwatch
            label="Surface"
            bg="bg-[var(--color-surface)]"
            hex="#FFFFFF"
            border
          />
          <ColorSwatch
            label="Surface Subtle"
            bg="bg-[var(--color-surface-subtle)]"
            hex="#EFF0EB"
          />
          <ColorSwatch
            label="Border"
            bg="bg-[var(--color-border)]"
            hex="#D8DAD3"
          />
          <ColorSwatch
            label="Primary Text"
            bg="bg-[var(--color-primary)]"
            hex="#171A17"
            text="text-white"
          />
          <ColorSwatch
            label="Muted Text"
            bg="bg-[var(--color-muted)]"
            hex="#61665F"
            text="text-white"
          />
          <ColorSwatch
            label="Brand / Evergreen"
            bg="bg-[var(--color-brand)]"
            hex="#23533C"
            text="text-white"
          />
          <ColorSwatch
            label="Brand Hover"
            bg="bg-[var(--color-brand-hover)]"
            hex="#1B422F"
            text="text-white"
          />
          <ColorSwatch
            label="Brand Soft"
            bg="bg-[var(--color-brand-soft)]"
            hex="#E5EFE8"
          />
          <ColorSwatch
            label="Success"
            bg="bg-[var(--color-success)]"
            hex="#237A4A"
            text="text-white"
          />
          <ColorSwatch
            label="Warning"
            bg="bg-[var(--color-warning)]"
            hex="#995C0D"
            text="text-white"
          />
          <ColorSwatch
            label="Danger"
            bg="bg-[var(--color-danger)]"
            hex="#B33434"
            text="text-white"
          />
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">2. Typography</h2>
        <Surface className="p-8 space-y-8">
          <div>
            <div className="text-sm text-[var(--color-muted)] mb-2">
              Display (Editorial Serif)
            </div>
            <div className="font-editorial text-5xl">
              Premium Editorial Commerce
            </div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-muted)] mb-2">
              Heading Large
            </div>
            <div className="text-3xl font-semibold">Section Title</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-muted)] mb-2">
              Heading Medium
            </div>
            <div className="text-xl font-semibold">Article Title</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-muted)] mb-2">
              Body Default
            </div>
            <div className="text-base text-[var(--color-primary)] max-w-prose">
              This is standard body text used for descriptions, paragraphs, and
              general content. High readability and clean structure.
            </div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-muted)] mb-2">
              Body Small / Caption
            </div>
            <div className="text-sm text-[var(--color-muted)]">
              Secondary text, fine print, metadata.
            </div>
          </div>
        </Surface>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">3. Surfaces & Radius</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Surface className="p-6">
            <h3 className="font-semibold mb-2">Default Surface</h3>
            <p className="text-sm text-[var(--color-muted)]">
              Subtle shadow elevation on a white background.
            </p>
          </Surface>
          <Surface variant="subtle" className="p-6">
            <h3 className="font-semibold mb-2">Subtle Surface</h3>
            <p className="text-sm">
              Off-white background for secondary grouping.
            </p>
          </Surface>
          <Surface variant="outlined" className="p-6">
            <h3 className="font-semibold mb-2">Outlined Surface</h3>
            <p className="text-sm text-[var(--color-muted)]">
              Clear border definition without shadow.
            </p>
          </Surface>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">4. Buttons</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small Size</Button>
            <Button size="md">Medium Size</Button>
            <Button size="lg">Large Size</Button>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">5. Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">6. Inputs</h2>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <label htmlFor="input-default" className="text-sm font-medium">
              Default Input
            </label>
            <Input id="input-default" placeholder="Enter something..." />
          </div>
          <div className="space-y-2">
            <label htmlFor="input-disabled" className="text-sm font-medium">
              Disabled Input
            </label>
            <Input id="input-disabled" placeholder="Not interactive" disabled />
          </div>
          <div className="space-y-2">
            <label htmlFor="input-error" className="text-sm font-medium">
              Invalid Input
            </label>
            <Input
              id="input-error"
              defaultValue="Invalid value"
              aria-invalid={true}
            />
            <p className="text-sm text-[var(--color-danger)]">
              This field has an error.
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}

function ColorSwatch({
  label,
  bg,
  hex,
  border,
  text = 'text-[var(--color-primary)]',
}: {
  label: string;
  bg: string;
  hex: string;
  border?: boolean;
  text?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-24 rounded-[var(--radius-control)] flex items-center justify-center font-medium ${bg} ${text} ${border ? 'border border-[var(--color-border)]' : ''}`}
      >
        Aa
      </div>
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-[var(--color-muted)]">{hex}</div>
      </div>
    </div>
  );
}
