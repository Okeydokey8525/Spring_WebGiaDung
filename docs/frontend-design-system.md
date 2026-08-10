# HomeStore Frontend Design System

## 1. Design Philosophy
The HomeStore design system is built for a premium modern household and lifestyle e-commerce experience. It emphasizes restraint, clarity, and readability over excessive flair. The UI should feel calm, trustworthy, and commercially usable without feeling like a generic SaaS dashboard.

## 2. Visual Direction
- **Character**: Premium Editorial Commerce
- **Key Traits**: Strong whitespace, restrained color usage, high readability.
- **Avoid**: Excessive gradients, neon colors, huge shadows, overly rounded cards, and unneeded motion.

## 3. Color Tokens
The V1 palette centers around a **Warm Neutral + Deep Evergreen** theme.
All components must use these semantic tokens instead of hardcoded hex values.

- Canvas: `var(--color-canvas)` (#F7F6F2)
- Surface: `var(--color-surface)` (#FFFFFF)
- Surface Subtle: `var(--color-surface-subtle)` (#EFF0EB)
- Primary Text: `var(--color-primary)` (#171A17)
- Muted Text: `var(--color-muted)` (#61665F)
- Border: `var(--color-border)` (#D8DAD3)
- Brand (Evergreen): `var(--color-brand)` (#23533C)
- Brand Hover: `var(--color-brand-hover)` (#1B422F)
- Brand Soft: `var(--color-brand-soft)` (#E5EFE8)
- States: `var(--color-success)`, `var(--color-warning)`, `var(--color-danger)`

*Note: Dark mode is explicitly NOT implemented in V1.*

## 4. Typography
- **UI Font**: Geist (sans-serif) is used for all general commerce UI.
- **Editorial Font**: A system serif fallback (`var(--font-editorial)`) is available for storytelling, display accents, and brand moments. Do not use it as the default font.
- **Hierarchy**: The system provides semantic headings and body copy sizes using standard Tailwind classes combined with semantic tokens.

## 5. Spacing/Layout
Semantic tokens are used for layout composition:
- `var(--spacing-gutter-mobile)`: 16px
- `var(--spacing-gutter-tablet)`: 24px
- `var(--spacing-gutter-desktop)`: 32px
- `var(--spacing-content-max)`: 1440px
- `var(--spacing-section-sm/md/lg)` for consistent vertical rhythm.

## 6. Radius
Corner radii are restrained:
- Control: `var(--radius-control)` (10px)
- Surface: `var(--radius-surface)` (16px)
- Surface Large: `var(--radius-surface-large)` (20px)
- Pill: `var(--radius-pill)` (9999px)

## 7. Shadow
Shadows are subtle and used sparingly to define elevation without aggressive floating effects:
- Subtle: `var(--shadow-subtle)`
- Elevated: `var(--shadow-elevated)`

## 8. Motion
Transitions are modest and respect user preferences:
- Fast: `var(--transition-fast)` (150ms)
- Normal: `var(--transition-normal)` (250ms)
- `prefers-reduced-motion` is respected inherently by keeping animations minimal.

## 9. Accessibility Principles
- **Focus**: `var(--color-focus-ring)` is used for high-contrast visible focus indicators.
- **Forms**: Native inputs support `aria-invalid` and disabled states visually.
- **Buttons**: Native `<button>` primitives are used with explicit types.
- Semantic HTML is favored over generic divs.

## 10. Component Inventory
The following primitives are available in `src/components/ui/`:
- `Container`: Responsive page wrapper.
- `Section`: Vertical spacing primitive.
- `Button`: Interactive actions with variants (primary, secondary, outline, ghost, danger) and sizes (sm, md, lg).
- `Badge`: Informational labels (neutral, brand, success, warning, danger).
- `Input`: Accessible text fields.
- `Surface`: Generic card/grouping containers (default, subtle, outlined).

## 11. Usage Guidelines
Always compose components using the provided UI primitives. Do not scatter raw hex codes (`#171A17`) or magic pixel numbers throughout feature components. 

## 12. Internal Preview Route
A live preview of the design system tokens and primitives is available locally at:
`/dev/design-system`
This route is excluded from search indexing.

## 13. Intentionally Deferred (Future Milestones)
- HOME-FE-2: Global Layout (Header, Footer, Navigation)
- HOME-FE-3: Homepage (Hero, Promos)
- Catalog, Product Detail, Cart, and Checkout UI.
