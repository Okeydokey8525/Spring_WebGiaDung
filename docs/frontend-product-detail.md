# HomeStore Frontend Product Detail (HOME-FE-5)

## 1. Product Detail Purpose
The Product Detail Page (`/products/[slug]`) provides an expanded, contextual view of a single product. It strictly adheres to the Premium Editorial Commerce aesthetic established in earlier milestones. 

Currently, this milestone focuses exclusively on structural presentation and domain separation. It deliberately avoids fabricating commercial data (such as pricing, availability, and cart interactions) until the backend API provides a stable contract.

## 2. Route Architecture
- **Path**: `/products/[slug]`
- **Layout**: Inherits the `(storefront)` global layout.
- **States**: 
  - `page.tsx`: Server Component that dynamically resolves the slug parameter. Uses `notFound()` if the slug is invalid.
  - `loading.tsx`: Segment-level skeleton indicating structural loading.
  - `error.tsx`: Client-side error boundary providing a resilient failure state.

## 3. Data Boundary (Catalog Source)
The PDP retrieves product information via `getCatalogItemBySlug(slug)`, an extension of the existing catalog fixture abstraction (`src/features/catalog/data/catalog-source.ts`).
- The PDP **MUST NOT** import `catalog-fixtures.ts` directly.
- The `CatalogItem` interface is reused because it currently contains all truthful presentation data needed. 
- When the backend is ready, this abstraction layer will be replaced with an API adapter.

## 4. Metadata
Dynamic `generateMetadata` uses the actual product name (`[Tên sản phẩm] | HomeStore`) and description. It does not output fake structured data (JSON-LD) or pricing metadata, preventing search engines from indexing incomplete commercial information.

## 5. Breadcrumb & Navigation
An accessible `<nav aria-label="Breadcrumb">` provides clear context: `Trang chủ > Sản phẩm > [Tên sản phẩm]`. A call-to-action at the bottom of the page encourages returning to the catalog (`/products`) to continue discovery.

## 6. Media Strategy
The page reuses the `ProductMediaPlaceholder` from FE4. It is constrained within a responsive layout rather than duplicating the SVG drawing logic. No external/remote images are permitted at this stage.

## 7. Deferred Commercial Features
The following features are **intentionally deferred** and have no UI placeholders to avoid user confusion:
- Price / Discount / Currency
- Stock / Inventory / SKU
- Ratings / Reviews
- Add to Cart / Buy Now / Wishlist
- Size / Color / Variant selection
- Related Products / Recommendations

## 8. Accessibility
- Includes exactly one `<h1>` (the product name).
- The breadcrumb clearly designates `aria-current="page"`.
- Media elements use `aria-hidden="true"` as they are purely decorative abstractions of the product.
- Proper semantic HTML (`<dt>`, `<dd>`) is used for product information.

## 9. Responsive Layout
The UI transitions from a stacked single-column on mobile to a balanced two-column (Media + Summary) grid on desktop, avoiding any horizontal overflow or forced heights.
