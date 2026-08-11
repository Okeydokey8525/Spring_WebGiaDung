# HomeStore Frontend Global Layout (HOME-FE-2)

## 1. Route Group Architecture
The application uses Next.js Route Groups to isolate the public storefront from internal developer routes.
- `src/app/layout.tsx`: The root layout. Contains `<html>`, `<body>`, global fonts, and metadata. It does NOT include the Site Header or Footer.
- `src/app/(storefront)/layout.tsx`: The storefront layout. Composes the public storefront chrome (`SkipLink`, `SiteHeader`, `SiteFooter`). It wraps all customer-facing routes.
- `src/app/dev/design-system/page.tsx`: Remains outside `(storefront)` and therefore does not render the storefront header or footer.

## 2. Header Structure
The `SiteHeader` provides a responsive commerce navigation bar.
- **Desktop**: Two rows. Row 1 contains the Wordmark, Search, Account, and Cart utilities. Row 2 contains the primary navigation.
- **Mobile**: A single row containing the Mobile Navigation trigger, Wordmark, and Cart.
- **Behavior**: The header is sticky at the top, solid background, with restrained borders.

## 3. Mobile Navigation
Implemented via a local-state client component (`MobileNavigation`).
- It uses a native `<button>` to toggle a dropdown panel.
- Focus and accessibility are maintained (e.g., `aria-expanded`, Escape key support).
- No global state managers (e.g., Zustand/Redux) are used for menu state.

## 4. Search, Account, Cart
Entry points have been created for Search, Account, and Cart.
- They currently link to `/search`, `/account`, and `/cart`.
- **Note**: These are future navigation destinations and are not yet implemented in this milestone. Do not expect active functionality yet.

## 5. Footer Structure
The `SiteFooter` provides a multi-column responsive layout containing:
- Brand statement.
- Shopping links.
- Support/Help links.
- Additional HomeStore info.
- Dynamic copyright year.

## 6. Accessibility Highlights
- **Skip Link**: A visually hidden `SkipLink` is provided as the first focusable element to bypass navigation and jump to `#main-content`.
- **Landmarks**: `<header>`, `<nav>`, `<main id="main-content">`, and `<footer>` are properly used.
- **Focus Rings**: Standardized using `focus-visible:ring-[var(--color-focus-ring)]`.
- **Icons**: Inline SVGs with `aria-hidden="true"`.

## 7. Responsive Behavior
- Layout flows naturally without horizontal overflow.
- Mobile breakpoints expand footer columns and condense header utilities.
- Breakpoint logic uses standard Tailwind (`lg:hidden`, `lg:flex`).

## 8. Intentional Boundaries
The following are explicitly deferred to future milestones:
- Homepage sections (Hero, promos, etc.).
- Product Catalog, categories, and detail pages.
- Actual Search state, Autocomplete.
- Cart functionality and drawers.
- Backend/API integrations.

## 9. Next Milestone
- **HOME-FE-3**: Homepage
