# Catalog Category

## 1. Purpose
The Category module manages the hierarchical taxonomy of products. It allows organizing products into manageable logical groupings (e.g. Home Appliances -> Kitchen -> Blenders).

## 2. Hierarchy Model
The hierarchy is modeled using an Adjacency List (`parent_id -> categories.id`).
- Root categories have `parent_id = null`.
- Child categories reference their immediate parent.

## 3. Slug
Categories have a globally unique `slug` for URL-friendly routing.
- The slug is ASCII-normalized, lowercase, and hyphens replace non-alphanumeric sequences.
- Example: `Đồ Gia Dụng` -> `do-gia-dung`

## 4. Cycle Prevention
The application service prevents hierarchy cycles to avoid infinite loops:
- Direct self-parent: A category cannot be its own parent.
- Indirect cycle: A category cannot be moved under one of its descendants (e.g. A -> B -> C -> A).

## 5. Delete Behavior
A parent category that has children cannot be deleted. Attempting to do so results in a 409 Conflict.
Leaf categories can be deleted freely.

## 6. Active Behavior & Public Tree Visibility
The `is_active` flag determines storefront visibility.
- Public read API returns a hierarchy of active categories.
- An active child category beneath an inactive parent is hidden from the storefront (it will NOT be artificially elevated to a root).
- Both tree listing and direct slug lookup enforce this rule.

## 7. Sorting
Sibling categories are sorted by:
1. `sort_order` ASC
2. `name` ASC

## 8. Security Strategy
- `GET /api/v1/categories`: Public read access.
- `GET/POST/PUT/DELETE /api/v1/admin/categories`: Admin access (authorization roles will be enforced in the security milestone).

## 9. Entity / DTO Rule
The JPA `Category` entity is never returned directly to the client. The application service transforms domain entities into appropriate DTOs.
