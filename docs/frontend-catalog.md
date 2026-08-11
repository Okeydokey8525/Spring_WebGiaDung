# HomeStore Frontend Catalog (HOME-FE-4)

## 1. Catalog Purpose
The Catalog (`/products`) is the primary discovery interface for HomeStore products. It continues the Premium Editorial Commerce aesthetic established by the homepage, emphasizing clarity, scannability, and restrained visual presentation over dense dashboard-style interfaces.

## 2. Route Architecture
- **Path**: `/products`
- **Layout**: Inherits the `(storefront)` global layout, automatically receiving the header and footer.
- **States**: 
  - `page.tsx`: Server component handling search parameters and rendering the grid.
  - `loading.tsx`: Segment-level skeleton matching the grid structure.
  - `error.tsx`: Client boundary handling unexpected rendering failures safely.

## 3. Catalog Feature Architecture
Located at `src/features/catalog`, this architecture isolates the catalog domain:
- **`model/`**: Contains the `CatalogItem` view model and query state definitions.
- **`data/`**: Houses development fixtures and the source abstraction layer.
- **`components/`**: UI components specific to the catalog presentation (e.g., `ProductCard`, filters, grid).

## 4. CatalogItem View Model
The `CatalogItem` is strictly a presentation-layer interface. 
- It contains only metadata required for FE4 UI (e.g., `slug`, `name`, `categoryKey`, `roomKey`, `shortDescription`).
- **CRITICAL**: It intentionally omits `price`, `stock`, `rating`, `SKU`, and other commerce backend fields, as those contracts are not yet finalized in the backend.

## 5. Fixture Source Boundary
The UI components never import fixtures directly. Instead, they call `getFilteredCatalogItems` from `catalog-source.ts`. This thin abstraction layer ensures that when the real backend API is ready (future milestone), only the source adapter needs to be rewritten, leaving the UI components untouched. 

**Development fixtures MUST be replaced before production catalog launch.**

## 6. Query Parameters (Server-Driven State)
The catalog uses Next.js `searchParams` for all filtering and sorting. There is no global client state (e.g., Redux, Zustand, or React Context) used for the catalog view. This ensures URLs are fully shareable and server-renderable.
- `room`: Filters by room context (e.g., `living-room`, `bedroom`).
- `category`: Filters by product category (e.g., `storage`, `textile`).
- `sort`: Controls ordering (`featured`, `name-asc`, `name-desc`).

Invalid query parameters safely fall back to default values (`all` or `featured`) without throwing 500 errors.

## 7. ProductCard
The `ProductCard` component focuses on clear presentation:
- Uses a local, abstract SVG placeholder (`ProductMediaPlaceholder`) instead of random external images.
- Displays metadata (category/room) and a concise description.
- Clicks route to `/products/{slug}`. Note that Product Detail Pages (PDP) are deferred to HOME-FE-5 and will currently return a 404.

## 8. Missing Commerce Features Explained
- **Price/Sale/Discount**: Absent because the pricing contract and promotional rules engine are not finalized.
- **Stock/Inventory**: Absent because the inventory tracking contract is deferred.
- **Ratings/Reviews**: Absent because user-generated content features are not yet implemented.
- **Real Photography**: The media backend is deferred. We use semantic SVG placeholders to represent items abstractly.

## 9. Accessibility
- Includes exactly one `<h1>` for the catalog route.
- Filters use native `<Link>` tags with `aria-current` to denote active state (avoiding color-only indication).
- Sorting uses a native `<form method="GET">` with a real `<label>` and `<select>`, maximizing accessibility and allowing functionality without JavaScript.
- Decorative SVGs use `aria-hidden="true"`.
