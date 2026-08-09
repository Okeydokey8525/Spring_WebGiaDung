# Brand Module (HOME-BE-6)

## Purpose
The Brand module represents product manufacturers or consumer brands (e.g., "Apple", "Samsung", "Điện Quang").

## Key Characteristics
1. **Not Hierarchical**: Unlike Categories, Brands do not have a parent-child relationship. They are flat.
2. **Unique Identifiers**: Both `name` and `slug` are globally unique within brands.
3. **Storefront Visibility**: Brands can be marked as active or inactive using the `is_active` flag. Inactive brands are hidden from public API endpoints but remain visible in admin APIs.
4. **Sorting**: Public listings sort by `sort_order` ASC, then `name` ASC. Admin listings follow the same deterministic ordering.
5. **Slug Normalization**: Brand leverages a generic `SlugNormalizer` to safely construct URL-friendly slugs from Vietnamese strings.
6. **Website URL Validation**: The application strictly enforces `http` or `https` for website URLs, rejecting any dangerous schemes (e.g., `javascript:`, `data:`).

## API Endpoints

### Public Endpoints
- `GET /api/v1/brands`: Returns a list of active brands, ordered by `sortOrder` then `name`.
- `GET /api/v1/brands/{slug}`: Returns a single active brand by its unique slug.

### Admin Endpoints
- `GET /api/v1/admin/brands`: Returns a list of all brands (including inactive).
- `GET /api/v1/admin/brands/{id}`: Returns a single brand by its internal ID.
- `POST /api/v1/admin/brands`: Creates a new brand.
- `PUT /api/v1/admin/brands/{id}`: Updates an existing brand. Follows strict PUT semantics where nullable fields omitted from the payload are explicitly cleared.
- `DELETE /api/v1/admin/brands/{id}`: Deletes a brand. (Note: Foreign Key constraints prevent deleting brands referenced by any Products, including archived ones. Attempting to do so results in a 409 Conflict).
