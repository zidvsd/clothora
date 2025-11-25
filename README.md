# Clothora

![version](https://img.shields.io/badge/version-0.1.0-blue)
![next](https://img.shields.io/badge/Next.js-15.5.3-black)

Clothora is a minimal, modern clothing storefront built with Next.js, TypeScript and Tailwind CSS. It demonstrates a clean UI, smooth animations, and simple state management suitable for small e-commerce prototypes and design-focused storefronts.

**Live demo:** https://clothora-amber.vercel.app/

## Why this project is useful

- **Design-focused starter:** Minimal UI and responsive layouts for quick prototyping.
- **Modern stack:** Next.js 15, React 19, TypeScript 5 and Tailwind CSS 4.
- **Small but complete:** Product lists, carousel, cart flows and toast notifications.
- **Easy state:** Global state handled with `zustand` for a tiny, easy-to-follow store.

## Key features

- Product listing and collections (under `app/collections`)
- Product detail pages and nested routing (dynamic routes in `app/collections/[slug]/[productId]`)
- Responsive carousel using `keen-slider`
- Loading skeletons with `react-loading-skeleton`
- Toast notifications with `sonner`
- Lightweight global state using `zustand`

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Zustand for state management
- Keen Slider, Lucide React, Sonner, html-to-image

## Getting started

Prerequisites

- Node.js 18+ (tested with Node 18/20)
- npm or yarn

Clone and run

```bash
git clone <your-repo-url> clothora
cd clothora
npm install
# or: yarn
```

Development

```bash
npm run dev
# Open http://localhost:3000
```

Build and production

```bash
npm run build
npm start
```

Lint

```bash
npm run lint
```

Notes

- The project uses Turbopack flags for `dev` and `build` (`--turbopack`). Remove these flags if you prefer the standard Next.js bundler or run into compatibility issues.
- If you use a Node version manager, ensure your active Node version matches the prerequisites.

## Project structure (overview)

- `app/` — Next.js App Router pages and route groups (primary app code)
- `components/` — Shared React components (carousel, product list, UI primitives)
- `section/` — Page sections (home/hero/featured)
- `lib/` — Utilities and animation helpers
- `store/` — `zustand` stores (`useCartStore.ts`, `useProductsStore.ts`)
- `public/` — Static assets and sample data

Explore the `app/` directory to see how routes are organized and how components are composed.

## Usage examples

Import a component in a page (TypeScript / Next.js App Router example):

```tsx
import ProductList from "@/components/ProductList";

export default function Page() {
  return <ProductList />;
}
```

Programmatic cart update using the `useCartStore` (simplified):

```ts
import useCartStore from "@/store/useCartStore";

const add = useCartStore((s) => s.addProduct);
add({ id: "sku-123", name: "T-Shirt", price: 29.99 });
```

## Where to get help

- If this repo includes an active maintainer, open an issue.
- For questions about the codebase, contact the repository owner or the original author: `rashidvisda@gmail.com`.

## Contributing

See `CONTRIBUTING.md` for brief contribution pointers and a minimal workflow.

Please keep contributions focused and small: design improvements, accessibility, test coverage, or bug fixes are all welcome.

## Maintainers

- Original author / contact: `rashidvisda@gmail.com`

If you would like to become a contributor, open an issue or submit a PR and reference the changes you'd like to make.

## Acknowledgements

- Built as a small demo and design prototype inspired by modern e-commerce patterns.

---

_Generated and updated by project maintainer tooling._
