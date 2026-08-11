# HomeStore Frontend Product Detail (HOME-FE-5, repositioned by HOME-FE-6)

## 1. Product Detail Purpose

The Product Detail Page at `/products/[slug]` presents a single fixture product
within HomeStore's broad category-first commerce direction. HOME-FE-6 removes
room context while preserving the FE5 dynamic route, static parameter
generation, metadata, loading, error, and 404 behavior.

## 2. Data and Route Boundary

The PDP resolves products through `getCatalogItemBySlug(slug)` and never imports
fixtures directly. Unknown slugs call `notFound()`. Dynamic metadata uses only
the fixture name and description.

## 3. Product Information

The page presents:

- Product name
- Presentation category
- Short description
- Abstract local media placeholder

Room metadata and room-oriented discovery copy are removed. The information
panel uses semantic `<dl>`, `<dt>`, and `<dd>` elements and reflows without blank
room fields.

## 4. Deferred Commercial Features

The PDP contains no price, discount, inventory, SKU, rating, review, cart
action, wishlist, variant, fabricated material, dimensions, brand, origin, or
warranty data. Related-product and recommendation engines remain deferred.

## 5. Responsive and Accessible Behavior

The layout stacks on mobile and becomes a balanced media/summary grid on
desktop. The product name is the single `<h1>`, breadcrumb semantics remain
intact, and decorative media stays hidden from assistive technology.
