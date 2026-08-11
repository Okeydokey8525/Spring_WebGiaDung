# HomeStore Frontend Commerce Positioning (HOME-FE-6)

## 1. Why FE6 Exists

The FE2–FE5 storefront presentation gradually became centered on rooms,
interiors, and lifestyle editorial discovery. That direction was too narrow for
HomeStore's intended product breadth. HOME-FE-6 resets the presentation layer
without rebuilding the frontend architecture.

## 2. New Positioning

HomeStore is a broad online store for household goods, daily-use items, and
practical lifestyle utilities. It is one store with a restrained visual system,
not a collection of seller storefronts.

HomeStore is explicitly **not a marketplace**. FE6 introduces no sellers,
seller shops, commissions, seller chat, vouchers, affiliate mechanics, flash
sales, ratings, or marketplace accounts.

## 3. Category-First Information Architecture

Product discovery now begins with categories instead of rooms. Primary
navigation emphasizes the catalog, products, and featured fixture ordering.
Room routes and editorial collection routes are no longer primary storefront
entry points.

The V1 presentation taxonomy is:

1. Nhà bếp
2. Gia dụng
3. Điện gia dụng
4. Lưu trữ & sắp xếp
5. Vệ sinh nhà cửa
6. Phòng tắm
7. Chăm sóc cá nhân
8. Học tập & văn phòng
9. Du lịch & tiện ích
10. Đồ dùng khác

The homepage shows a restrained subset of six categories and links directly to
`/products?category=<key>`. No category detail routes are created in FE6.

## 4. Homepage Changes

The homepage now positions HomeStore as a store for practical daily needs. Its
six sections are a broad-commerce hero, category discovery, everyday-use
discovery, practical editorial features, the HomeStore value proposition, and
a closing catalog CTA. Room cards and story-first CTAs were removed.

## 5. Catalog Changes

`CatalogItem` is category-first and no longer contains `roomKey` or
`roomLabel`. The catalog supports only `category` and `sort` query parameters.
An obsolete `room` query is ignored safely. Fixtures remain behind the FE4
source boundary and cover enough categories to exercise the filter without
pretending to be production inventory.

## 6. Product Detail Changes

The FE5 dynamic route and slug lookup architecture remain intact. The PDP now
shows the product name, category, and truthful fixture description without room
context or fabricated specifications.

## 7. Frontend Taxonomy vs Backend Category

`src/lib/config/store-categories.ts` is presentation-only static configuration
for the current fixture stage. It does not use database IDs, parent IDs, backend
DTOs, or persistence terminology. It must not be treated as the production
Category contract.

A future production taxonomy must be backend-driven. Brand discovery and
additional filters such as product attributes or price may be integrated only
after truthful API contracts exist.

## 8. Deferred Commerce Capabilities

FE6 does not add pricing, inventory, cart behavior, checkout, authentication,
payments, ratings, reviews, product variants, recommendations, real media, or a
brand fixture list. Existing search, account, and cart links remain future
utility entry points.
