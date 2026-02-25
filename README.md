## Rick & Morty Explorer (SSR + URL Filters)

Technical assignment: integrate `https://rickandmortyapi.com` to list characters, filter by **status** and **gender**, and manage filters via URL query params (e.g. `?status=alive&gender=male`). Filter changes must trigger **SSR** (new server request) via `nuqs` with `shallow: false`. Data fetching is managed with **React Query** and hydrated from SSR to the client. UI uses **shadcn/ui** + Tailwind.

## Getting Started

- Install dependencies:

```bash
npm install
```

- Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` (it redirects to `/characters`).

## Routes

- **`/characters`**: SSR list + URL-driven filters (`status`, `gender`, `page`) and selectable cards (Zustand).
- **`/episodes`**: SSR episodes list with URL-driven pagination (`page`).

## How SSR + hydration works

- **Server**: `src/app/**/page.tsx` parses `searchParams` using `nuqs/server`, prefetches with a per-request QueryClient, then renders `HydrationBoundary`.
- **Client**: `src/app/providers.tsx` mounts `QueryClientProvider` + `NuqsAdapter`. URL changes from `useQueryStates(..., { shallow: false })` trigger a server navigation, and the client consumes the hydrated cache.

## Scripts

```bash
npm run lint
npm run format
npm run typecheck
```

## Notes

- Pre-commit runs `typecheck` + `lint-staged` (ESLint + Prettier).
- ESLint bans `any` via `@typescript-eslint/no-explicit-any`.
