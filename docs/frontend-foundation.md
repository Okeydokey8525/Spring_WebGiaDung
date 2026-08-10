# Frontend Foundation

## 1. Frontend Location
The frontend source code is located in the `homestore-web` directory at the repository root.

## 2. Stack
- **Framework:** Next.js
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linter:** ESLint
- **Formatter:** Prettier
- **Package Manager:** npm

## 3. App Router Choice
The project uses the modern Next.js App Router paradigm (`src/app`). This provides React Server Components (RSC), streamlined routing, and optimized layout trees.

## 4. `src` Directory Organization
- `src/app/`: Next.js App Router files (pages, layouts, API routes).
- `src/components/`: Reusable React components.
- `src/features/`: Domain-driven feature modules (e.g., product, cart, auth).
- `src/lib/`: Library code, configurations, utilities.
- `src/hooks/`: Custom React hooks.
- `src/types/`: Shared TypeScript types and interfaces.
- `src/styles/`: Global stylesheets and Tailwind configurations.

## 5. TypeScript Strict Policy
The project uses strict mode (`"strict": true` in `tsconfig.json`). Type safety must be maintained, and the use of `any` is highly discouraged unless strictly necessary.

## 6. Tailwind Foundation
Tailwind CSS provides utility-first styling. The global stylesheet resets defaults and configures basic CSS variables. It avoids premature design decisions until the Design System milestone.

## 7. Environment Variable Policy
Frontend environment variables are configured via `.env` files (e.g., `.env.local` for local secrets, which is git-ignored). An example file is provided at `.env.example`. Secrets must *never* be committed or stored in client-exposed environment variables. 

## 8. Frontend/Backend Separation
The frontend application is entirely decoupled from the backend REST API (`homestore-api`). It is built and operated as a standalone Node.js process and interacts with the API exclusively over HTTP.

## 9. Current HOME-FE-0 Boundary
The scope of `HOME-FE-0` is strictly limited to setting up the generic scaffolding, build tools, formatting, linter, and runtime configurations. No business logic, commerce UI, mock data, or visual components have been implemented. Docker and SQL Server are NOT required to run this foundational setup.

## 10. Future Milestones
- **HOME-FE-1:** [Design System](frontend-design-system.md) (Completed)
- **HOME-FE-2:** Global Layout
- **HOME-FE-3:** Homepage
- **HOME-FE-4:** Catalog
- **HOME-FE-5:** Product Detail
- *(Further integration and checkout milestones)*

## 11. Local Commands
Run these commands from the `homestore-web` directory:
- `npm run dev`: Start the local development server.
- `npm run build`: Create an optimized production build.
- `npm run start`: Start the application in production mode (requires `npm run build` first).
- `npm run lint`: Run ESLint.
- `npm run typecheck`: Run TypeScript compiler type-checking without emitting files.
- `npm run format`: Format the code using Prettier.
- `npm run format:check`: Check code formatting.
