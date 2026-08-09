# Product Attribute Module

The `catalog.attribute` module manages configurable product metadata, such as generic attribute definitions and their predefined values. It establishes global definitions but does NOT assign them to Products or Categories yet.

## Domain Model
- **Attribute**: A global metadata definition (e.g. "Color", "Size").
- **AttributeValue**: A predefined option/label for an attribute (e.g. "Black" for Color, "1.8 L" for Capacity).

### Boundaries & Distinctions
- **Metadata Only**: Attributes represent global catalog metadata.
- **No Assignments**: Attributes and their values are not associated with Products, Categories, or Variants. These relationships will be introduced in future product core modules.
- **Label Orientation**: Values currently represent display labels without strict programmatic data typing (e.g., numeric, color hex) unless explicitly introduced later.
- **Admin Only**: In this initial foundation, Attributes are strictly managed via Admin APIs. Public storefront APIs for filtering will be added when product assignments exist.

## Unique Constraints
1. **Attribute Name & Slug**: Globally unique among all Attributes. Slug uniqueness prevents URL routing conflicts for potential future filtering endpoints.
2. **AttributeValue Scope**: Both the `value` and `slug` of an AttributeValue are unique strictly *within its parent Attribute*. 
    - E.g., The value "Black" can exist independently under the "Color" attribute and the "Finish" attribute.

## Slug Normalization
The module reuses the shared `SlugNormalizer` which standardizes text into URL-safe formats, automatically handling Vietnamese diacritics and whitespace collapsing while retaining case insensitivity rules.
- Empty or undividable slugs are rejected with `InvalidRequestException` (HTTP 400).

## Deletion Rules
- **Safe Delete**: An Attribute cannot be deleted if it contains any AttributeValues. This ensures no orphaned values exist in the system. Database `FK_attribute_values_attribute` constraints guarantee consistency.
- **Value Deletion**: Currently, AttributeValues can be freely deleted because no actual Products reference them.

## API Endpoints (Admin)
- `GET /api/v1/admin/attributes` - List attributes, ordered deterministically by `sortOrder` ASC, then `name` ASC.
- `GET /api/v1/admin/attributes/{id}` - Retrieve attribute details.
- `POST /api/v1/admin/attributes` - Create a new attribute.
- `PUT /api/v1/admin/attributes/{id}` - Update an existing attribute.
- `DELETE /api/v1/admin/attributes/{id}` - Delete an attribute without values.
- `GET /api/v1/admin/attributes/{id}/values` - List values for an attribute, ordered by `sortOrder` ASC, then `value` ASC.
- `POST /api/v1/admin/attributes/{id}/values` - Add a new value to an attribute.
- `PUT /api/v1/admin/attributes/{id}/values/{valueId}` - Update a value.
- `DELETE /api/v1/admin/attributes/{id}/values/{valueId}` - Delete a value.

Entities are fully abstracted by Request/Response DTOs.
