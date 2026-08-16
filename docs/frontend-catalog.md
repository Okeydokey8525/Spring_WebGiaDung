# HomeStore Frontend Catalog (HOME-FE-4, repositioned by HOME-FE-6 and HOME-FE-7)

## 1. Catalog Purpose

The catalog at `/products` is the primary category-first discovery interface
for HomeStore's broad household and daily-utility presentation. HOME-FE-6
removed room-first discovery, while HOME-FE-7 adds restrained storefront search
without changing the backend boundary.

## 2. Route and Feature Architecture

- `page.tsx` remains a Server Component that awaits `searchParams`.
- `loading.tsx` and `error.tsx` preserve segment-level loading and error states.
- `model/`, `data/`, and `components/` continue to isolate catalog concerns.
- UI components access fixture data only through `catalog-source.ts`.
- Search uses a normal GET form; no global client state or search API is added.

## 3. CatalogItem View Model

`CatalogItem` includes only the truthful presentation fields needed now:
`id`, `slug`, `name`, `categoryKey`, `categoryLabel`, `shortDescription`,
`mediaVariant`, and `featuredOrder`.

Price, stock, rating, SKU, variants, seller data, and other backend commerce
fields remain intentionally absent.

## 4. Presentation Taxonomy and Fixtures

Category keys come from the presentation-only taxonomy in
`src/lib/config/store-categories.ts`. The ten development fixtures are UI
fixtures, not production inventory, and must be replaced by a backend-driven
source before production launch.

## 5. Query Parameters

The supported query state is:

- `q`: normalized storefront search text.
- `category`: a V1 presentation category key such as `kitchen` or `storage`.
- `sort`: `featured`, `name-asc`, or `name-desc`.

Invalid category and sort values fall back safely. Unknown parameters are
ignored. The obsolete `room` parameter is neither parsed nor preserved.

Search, category, and sort compose in the URL so catalog URLs remain shareable
and browser navigation naturally restores state.

## 6. Search Behavior

Search is performed locally against the truthful fixture fields currently
available to the frontend:

- product name
- category label
- short description

Input is trimmed, repeated whitespace is collapsed, and matching is
case-insensitive. Matching also removes Vietnamese combining diacritics and maps
`đ` to `d`, so terms such as `ve sinh` can match `vệ sinh`.

No search API, autocomplete service, fake trending query, or additional fixture
product is introduced.

## 7. Filters, Toolbar, and Empty State

Category links preserve the active search and sort. Sorting preserves search and
category. The catalog shows result context for an active query, provides a clear
search action, and presents an accessible zero-result state with routes to clear
search or return to all products.

Product cards remain unchanged and continue to route to `/products/[slug]`.

## 8. Accessibility and Responsive Behavior

The search control uses a semantic search form, an explicit label, native search
input, keyboard submission, accessible clear action, and existing focus-ring
tokens. Controls stack on narrow screens and remain inline where space allows.

Filters remain native links with `aria-current`; sorting remains a native GET
form with a labeled select.

## 9. Intentional Boundaries

HOME-FE-7 adds no runtime dependency and no backend API. It does not introduce
price, discount, stock, ratings, SKU, variants, cart behavior, sellers, vouchers,
or marketplace concepts. Backend Category remains authoritative only after a
future real API integration.
