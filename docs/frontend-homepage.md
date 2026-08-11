# HomeStore Frontend Homepage (HOME-FE-3)

## 1. Homepage Purpose
The homepage is designed for editorial discovery, not catalog listing. It communicates what HomeStore is, its design principles, and how visitors can discover products by space or lifestyle collection. It is the entry point that sets the premium editorial tone.

## 2. Information Architecture
The current structure consists of exactly 6 main sections:
1. **Hero**: Main headline, mission statement, and primary CTAs.
2. **Room Discovery**: Navigational entry points grouped by living spaces (Living Room, Bedroom, Kitchen, Bathroom).
3. **Editorial Feature**: Alternating layout featuring curated collections or lifestyle principles.
4. **Design Principles**: HomeStore's core approach to products (Easy living, Intentional minimalism, Daily rhythm).
5. **Inspiration**: A call to action leading to storytelling content.
6. **Closing CTA**: Final prompt to browse products or spaces.

## 3. Hero
- **Headline**: "Không gian sống, được chọn lựa có chủ đích."
- Uses an asymmetrical layout with a large abstract decorative SVG placeholder that will later be replaced by high-quality brand photography.
- CTAs lead to `/products` and `/rooms`.

## 4. Room Discovery
- Displays 4 generic spaces using restrained cards.
- Does not contain fake product data or counts.
- Uses subtle hover transitions and abstract SVG placeholders.

## 5. Editorial Feature
- Displays 2 featured themes in a large alternating layout.
- Provides deep links to `/collections/minimalism` and `/collections/dining`.
- Abstract geometry placeholders maintain the layout structure without violating the "no external network image" policy.

## 6. Value/Design Principles
- A 3-column layout highlighting HomeStore's approach.
- Free of unverifiable marketing claims (e.g., no "highest quality" or "cheapest").

## 7. Inspiration & Closing CTA
- The inspiration block directs users to `/stories`.
- The closing CTA acts as a soft transition to the footer, asking "Bạn đang tìm điều gì cho không gian của mình?".

## 8. Responsive Behavior
- **Mobile**: Single column layouts, stacked elements, full-width CTAs.
- **Tablet**: Balanced 2-column or 3-column layouts where appropriate.
- **Desktop**: Expansive layouts (up to 4 columns for rooms, asymmetrical grids for hero and editorial features).
- No horizontal scrolling or overflow.

## 9. Accessibility
- Includes one single `<h1>` for the page.
- Section headings use `<h2>` and `<h3>` logically.
- All decorative SVGs include `aria-hidden="true"`.
- Buttons/links are native, accessible elements with focus states (`focus-visible:ring`).
- The page does not introduce a duplicate `<main>` landmark.

## 10. Static Presentational Content Policy
All content displayed is strictly presentational. It is defined in `src/lib/config/home-content.ts` using types like `RoomDiscoveryItem` and `EditorialFeature`. This ensures presentational data is not confused with domain/catalog data.

## 11. Media Placeholder Strategy
- Abstract SVG geometry is used with `currentColor` and opacity utilities.
- It provides visual weight and structure without fetching external images or pretending to be product photos.
- **Future Photography**: These SVG blocks are structured as containers with aspect ratios. When photography is ready, it is a simple drop-in replacement via `next/image` within these containers.

## 12. Intentional Absence of Product Data
This homepage contains NO product data. There are no grids of products, prices, ratings, or SKUs. The catalog display is explicitly deferred to **HOME-FE-4**. This prevents scope creep and ensures domain boundaries remain clean.
