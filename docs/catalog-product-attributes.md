# Product Attribute Assignments

## Domain Concept
Product attributes define the dynamic properties of a product. 
- `ProductAttribute` represents an assignment of a global `Attribute` to a `Product`.
- `ProductAttributeValue` represents the assignment of a global `AttributeValue` to a `ProductAttribute`.

## Key Rules
- Assignments are Admin-only.
- A Product may use multiple Attributes.
- Each Attribute may be assigned to a Product at most once.
- Each AttributeValue may be assigned to a ProductAttribute at most once.
- The assigned AttributeValue MUST belong to the same global Attribute represented by the ProductAttribute.
- Text content is not copied into assignment tables; foreign keys are used exclusively.
- Deleting an assignment physically removes the assignment (unless restricted).
- Archived products retain all assignments, but those assignments cannot be modified (added, updated, or removed).
- An Attribute or AttributeValue cannot be deleted if it is assigned to any product (even archived products).
- Ordering is maintained via `sortOrder` for deterministic listing.

## Out of Scope
- This module does NOT introduce Variants, SKUs, pricing, or inventory.
- It only establishes which attributes and values are valid/assigned for a particular product.
