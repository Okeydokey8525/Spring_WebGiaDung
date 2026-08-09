# Catalog Product Core

## 1. Purpose
The Product Core module establishes the base `Product` aggregate and the fundamental Admin management API. It serves as the central domain entity for the catalog, linking together categories, brands, and eventually variants.

## 2. Core Associations
- **Category**: Each Product belongs to exactly ONE `Category`. The `category_id` is a required non-null scalar reference. It is NOT restricted to leaf categories. There is no many-to-many product-category association.
- **Brand**: A Product may optionally belong to a `Brand`. The `brand_id` is a nullable scalar reference. Unbranded/generic products simply leave this null (no fake "No Brand" records are used).

## 3. Identifiers and Fields
- **Name**: The Product name is NOT globally unique. Multiple products can legally share the exact same display name.
- **Slug**: The Product slug IS globally unique (`UX_products_slug`).
- **Deferred Properties**: The Product Core explicitly DOES NOT contain SKU, price, or inventory information. These properties will be owned by `ProductVariant` in future milestones. Additionally, ProductAttribute assignment and Media management are deferred.

## 4. Lifecycle and Status
Products follow a strict status lifecycle:
- `DRAFT`: Initial or incomplete state.
- `ACTIVE`: Ready for storefront display (when storefront APIs are added).
- `INACTIVE`: Hidden from storefront.
- `ARCHIVED`: Terminal state.

`OUT_OF_STOCK` is intentionally excluded, as stock state will be derived from Inventory later.

## 5. Deletion and Archive Semantics
- **No Hard Delete**: Products are never physically deleted from the database. A `DELETE` operation archives the Product instead.
- **Archive Action**: When archived, `status` becomes `ARCHIVED`, and `archived_at` is set to the current UTC timestamp. 
- **Terminal State**: `ARCHIVED` is a terminal state. An archived product cannot be modified via normal `PUT` operations. A second `DELETE` operation against an archived product is idempotent and preserves the original `archived_at` timestamp.
- **Restoration**: Un-archiving or restoring products is not supported in this milestone.

## 6. Referential Integrity Restrictions
Because archived products are never physically deleted, they retain their `category_id` and `brand_id` foreign keys.
Therefore, any Category or Brand referenced by any Product (including archived ones) CANNOT be physically deleted from the database. Deleting such referenced entities will yield a 409 Conflict.

## 7. Admin Only API
Currently, only Admin APIs are exposed (`/api/v1/admin/products`). There is no public storefront Product API, as the product requires variants, pricing, and media before it becomes fully functional for public presentation.

## 8. Description Format
The `description` field holds textual content. No HTML rendering or sanitization contract is enforced at this layer; it is considered plain text or deferred for frontend handling.
