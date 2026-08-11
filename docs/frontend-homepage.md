# HomeStore Frontend Homepage (HOME-FE-3, repositioned by HOME-FE-6)

## 1. Homepage Purpose

The homepage introduces HomeStore as a broad single-store destination for
household goods and daily utilities. HOME-FE-6 supersedes the room-first
presentation taxonomy introduced in HOME-FE-3 while preserving the original
component architecture, restrained design system, and accessibility baseline.

## 2. Information Architecture

The homepage contains six meaningful sections:

1. **Hero**: Broad daily-goods positioning with catalog and category CTAs.
2. **Category Discovery**: Six category-first entry points into `/products`.
3. **Everyday-Use Discovery**: A practical need-based entry point.
4. **Editorial Feature**: Two static, practical discovery themes linked to catalog filters.
5. **HomeStore Values**: Practicality, clear discovery, and breadth of use cases.
6. **Closing CTA**: A final prompt to browse all products or a useful category.

## 3. Hero

The headline is “Đồ dùng thiết thực cho cuộc sống mỗi ngày.” Supporting copy
describes household goods and daily utilities without exaggerated commerce
claims. CTAs lead to `/products` and the catalog category filter section.

## 4. Category and Need Discovery

`CategoryDiscovery` reads from the shared presentation taxonomy in
`src/lib/config/store-categories.ts`. It displays six cards in a responsive
one-, two-, or three-column grid without a horizontal carousel. Each card links
to `/products?category=<key>`.

`EverydayUseDiscovery` provides a secondary path based on a common task rather
than a room. It is static presentation, not an article or recommendation engine.

## 5. Practical Editorial and Values

Editorial features link to real catalog filter states rather than unimplemented
collection or story routes. Values describe the intended discovery experience
without quality, price, certification, or material guarantees.

## 6. Responsive and Accessible Behavior

- Mobile layouts stack content and use full-width controls where appropriate.
- Category cards reflow at tablet and desktop breakpoints without horizontal scrolling.
- The page contains one `<h1>` and follows a logical heading hierarchy.
- Decorative SVGs are hidden from assistive technology.
- Native links retain visible keyboard focus states.

## 7. Static Content Boundary

Homepage content and taxonomy are presentational. The homepage contains no
prices, ratings, inventory, seller data, API requests, or production product
media.
