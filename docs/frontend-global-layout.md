# HomeStore Frontend Global Layout (HOME-FE-2, updated by HOME-FE-6)

## 1. Route Group Architecture

The application keeps the FE2 Next.js Route Group architecture:

- `src/app/layout.tsx` owns the document shell and global metadata.
- `src/app/(storefront)/layout.tsx` composes `SkipLink`, `SiteHeader`, and `SiteFooter`.
- `src/app/dev/design-system/page.tsx` remains outside the storefront chrome.

## 2. Header and Primary Navigation

The desktop header retains two rows and the mobile header retains its accessible
menu. HOME-FE-6 replaces the earlier room, collection, and story-first primary
links with a restrained category-first set:

- Danh mục
- Sản phẩm
- Nổi bật
- Về HomeStore

`Danh mục` anchors to the implemented catalog filter section. `Nổi bật` uses
the existing fixture ordering and does not imply a sales ranking algorithm.
No placeholder category, room, collection, or story pages were created.

## 3. Utilities

Search, Account, and Cart entry points remain at `/search`, `/account`, and
`/cart`. They are future destinations; FE6 does not implement their behavior.

## 4. Footer

The footer keeps its responsive columns while reflecting category-first
shopping links and broad daily-utility positioning. It contains no seller or
marketplace concepts.

## 5. Accessibility and Responsive Behavior

The skip link, semantic landmarks, focus rings, Escape handling, and responsive
breakpoints from FE2 are preserved. Navigation is shared by desktop and mobile
through `site-navigation.ts`.

## 6. Intentional Boundaries

HOME-FE-6 changes presentation information architecture only. Search behavior,
authentication, cart behavior, checkout, backend APIs, pricing, inventory, and
brand pages remain deferred.
