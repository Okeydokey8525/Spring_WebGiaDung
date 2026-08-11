# HomeStore Frontend Catalog (HOME-FE-4, repositioned by HOME-FE-6)

## 1. Catalog Purpose

The catalog at `/products` is the primary category-first discovery interface
for HomeStore's broad household and daily-utility presentation. HOME-FE-6
supersedes FE4's room-first filter while retaining the feature architecture,
server-driven URL state, and restrained visual design.

## 2. Route and Feature Architecture

- `page.tsx` is a Server Component that awaits `searchParams`.
- `loading.tsx` and `error.tsx` preserve segment-level loading and error states.
- `model/`, `data/`, and `components/` continue to isolate catalog concerns.
- UI components access fixture data only through `catalog-source.ts`.

## 3. CatalogItem View Model

`CatalogItem` includes only the truthful presentation fields needed now:
`id`, `slug`, `name`, `categoryKey`, `categoryLabel`, `shortDescription`,
`mediaVariant`, and `featuredOrder`. Room fields were removed.

Price, stock, rating, SKU, variants, seller data, and other backend commerce
fields remain intentionally absent.

## 4. Presentation Taxonomy and Fixtures

Category keys come from the presentation-only taxonomy in
`src/lib/config/store-categories.ts`. The ten development fixtures cover a
useful subset of the taxonomy for filtering. They are not production inventory
and must be replaced by a backend-driven source before production launch.

## 5. Query Parameters

The supported query state is:

- `category`: A V1 presentation category key, such as `kitchen` or `storage`.
- `sort`: `featured`, `name-asc`, or `name-desc`.

Invalid values fall back safely. The obsolete `room` parameter is not parsed or
preserved, so old URLs such as `/products?room=living-room` render the default
catalog without reintroducing a room filter.

## 6. Filters, Toolbar, and ProductCard

The filter UI exposes the ten broad presentation categories with accessible
selected state. Sorting preserves only the selected category. Product cards
show a category label, name, and concise description without room, price,
stock, or rating metadata.

## 7. Accessibility and Boundaries

Filters are native links with `aria-current`; sorting remains a native GET form
with a labeled select. Abstract media placeholders remain local and decorative.
There is no API request, global catalog state, marketplace concept, or new
runtime dependency.
