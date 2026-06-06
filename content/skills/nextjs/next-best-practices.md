---
title: Next.js Best Practices
name: next-best-practices
description: Next.js best practices for file conventions, RSC boundaries, data patterns, async APIs (Next.js 15+), metadata, error handling, route handlers, and image/font optimization.
tags: [nextjs, react, rsc, server-components, vercel]
source: https://github.com/vercel-labs/next-skills/tree/main/skills/next-best-practices
---

# Next.js Best Practices

Apply these rules when writing or reviewing Next.js code.

## File Conventions

- Project structure: `app/`, `pages/`, `public/`, `src/` (optional)
- Special files: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `middleware.ts`
- Dynamic routes: `[id]`, catch-all `[...slug]`, optional `[[...slug]]`
- Route groups: `(group-name)` — organize without affecting URL
- Parallel routes: `@slot` — render multiple pages in the same layout
- Middleware renamed to `proxy` in Next.js 16

## RSC Boundaries

React Server Components (RSC) cannot:
- Use hooks (`useState`, `useEffect`, etc.)
- Handle browser events
- Access browser APIs
- Be async client components (invalid pattern)

Pass only serializable props across the server/client boundary:
- Strings, numbers, booleans, null, undefined
- Plain objects and arrays of the above
- Dates (serialized to string), BigInt
- Not: functions, classes, Map, Set, Symbol, DOM elements

Server Actions (`'use server'`) can be passed as props to Client Components as an exception.

## Async Patterns (Next.js 15+)

In Next.js 15, `params` and `searchParams` are now Promises:

```
// Before (Next.js 14)
export default function Page({ params }) {
  const { id } = params;
}

// After (Next.js 15+)
export default async function Page({ params }) {
  const { id } = await params;
}
```

Same for `cookies()`, `headers()`, and `draftMode()` — they are now async.

Run the migration codemod: `npx @next/codemod@canary next-async-request-api`

## Data Patterns

### When to use what

- **Server Components** — data fetching, reads, no user interaction needed
- **Server Actions** — mutations, form submissions, side effects
- **Route Handlers** — webhooks, third-party integrations, file downloads
- **Client Components** — interactive features, browser APIs, real-time updates

### Avoiding Data Waterfalls

Parallel fetching with `Promise.all`:
```
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id),
]);
```

Use `Suspense` boundaries to stream content progressively. Use `preload()` pattern to start fetching before await.

## Error Handling

- `error.tsx` — catches errors in route segment and children (must be Client Component)
- `global-error.tsx` — catches errors in root layout
- `not-found.tsx` — renders when `notFound()` is called

Helper functions:
- `redirect(url)` — 307 temporary redirect
- `permanentRedirect(url)` — 308 permanent redirect
- `notFound()` — renders not-found.tsx
- `forbidden()`, `unauthorized()` — auth-specific errors (experimental)
- `unstable_rethrow()` — in catch blocks, rethrow Next.js-specific errors

## Route Handlers

- Defined in `route.ts` — cannot coexist with `page.tsx` at same path
- Export named HTTP method functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- No React DOM available — pure Node.js environment
- Use for: webhooks, third-party auth callbacks, file streams, non-page APIs
- Prefer Server Actions over Route Handlers for form mutations

## Image Optimization

- Always use `next/image` — automatic format conversion, lazy loading, size optimization
- Set `width` and `height` to prevent layout shift
- Use `priority` for LCP images (above the fold)
- `fill` prop for full-parent-size images (pair with `position: relative` parent)

## Font Optimization

- Use `next/font` — automatic self-hosting, no external requests
- Define fonts at root layout, use CSS variables to share across components
- `next/font/google` for Google Fonts, `next/font/local` for custom fonts

## Metadata

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: { ... }
};

// Or dynamic
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name };
}
```

OG Images: create `opengraph-image.tsx` in route segment, or use `ImageResponse` in route handler.
