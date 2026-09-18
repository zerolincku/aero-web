# Aero Cloud Admin Template

English | [简体中文](./README-zh.md)

A modern admin template built with **React 19 + TypeScript + Vite + Tailwind CSS**, including auth routing, theme system, i18n, command palette, paginated lists, and a typed API layer.

## Project Scope

- Ready-to-use frontend foundation for cloud/admin dashboards
- Built-in demo pages: Dashboard / Hosts / Regions & AZs / Users / Orgs / Settings
- Clear extension points for integrating real backend services

## Screenshots

### 1. Dashboard Home

![Dashboard](./doc/dashboard.png)

### 2. Hosts List

![Hosts](./doc/host.png)

### 3. Hosts Detail/List Extended View

![Hosts Info](./doc/host-info.png)

### 4. Host Detail Page

![Host Detail](./doc/host-info-2.png)

### 5. Regions & AZs

![Regions & AZs](./doc/az.png)

### 6. Command Palette (Quick Search)

![Quick Search](./doc/quick-search.png)

### 7. Theme & Appearance

![Theme](./doc/theme.png)

## Core Features

- Auth guard: unauthenticated users are redirected to `/login`
- Session handling: auto cleanup + redirect on `401`
- API layer: shared axios instance, typed errors, pagination models
- i18n: `en` / `zh-CN` with dev-time key diff and missing-key warning
- Theme system: `light / dark / system` + 5 accent colors
- Command palette: `⌘K` / `Ctrl+K`
- Async data lifecycle: stale-response protection, retry, and refresh state
- Reusable local/server table pagination with consistent loading, empty, and error rows
- Engineering baseline: ESLint + strict TypeScript + Vitest

## Tech Stack

- React 19.2
- TypeScript 6.0
- Vite 8.2
- Tailwind CSS 4.3
- React Router DOM 7
- Zustand 5
- Axios
- react-i18next / i18next
- Vitest + Testing Library

## Quick Start

### 1. Requirements

- Node.js >= 20.19.0
- pnpm >= 8

### 2. Install & Run

```bash
pnpm install
pnpm run dev
```

Default URL: `http://localhost:5173`

### 3. Common Commands

```bash
pnpm run dev         # start dev server
pnpm run build       # build production assets (tsc + vite build)
pnpm run preview     # preview production build
pnpm run lint        # run ESLint
pnpm run test        # run Vitest
pnpm run test:watch  # run Vitest in watch mode
pnpm exec tsc -b     # TypeScript project build check
```

## Environment Variables

Copy template:

```bash
cp .env.example .env
```

Variables:

- `VITE_API_BASE_URL`: API base path, default `/api`
- `VITE_ROUTER_MODE`: router mode, `hash` or `browser` (default `hash`)
- `VITE_APP_BASENAME`: deployment sub-path (for example `/admin`)
- `VITE_USE_MOCK_AUTH`: whether to use frontend mock login (default `true`)

## Backend Response Contract

### Success Response

- Response body directly returns business data

### Error Response

```json
{ "code": 1001, "msg": "error message" }
```

### Pagination Response

```json
{
  "total": 100,
  "page_num": 1,
  "page_size": 10,
  "data": []
}
```

Frontend support included:

- `PageResponse<T>`
- `apiClient.getPage<T>()`
- `toPaginatedResult()` mapper
- `useDataTable()` local and server pagination modes

Keep `loadPage` stable (declare it at module scope or wrap it in `useCallback`).
Change `queryKey` whenever filters or sorting change so the table reloads page one.

```tsx
const loadItemsPage = useCallback(
  async (page: number, pageSize: number) => toPaginatedResult(
    await apiClient.getPage<Item[]>('/items', {
      page_num: page,
      page_size: pageSize,
      status: filters.status,
    }),
  ),
  [filters.status],
);

const table = useDataTable<Item>({
  loadPage: loadItemsPage,
  queryKey: filters.status,
});
```

## Route Overview

- `/login`
- `/`
- `/infrastructure/hosts`
- `/infrastructure/hosts/:hostId`
- `/infrastructure/regions-azs`
- `/management/users`
- `/management/orgs`
- `/system/settings`

Placeholder routes (currently NotFound):

- `/infrastructure/vms`
- `/infrastructure/storage-pools`
- `/management/groups`
- `/system/security`

## Key Directory Structure

```text
src/
├── api/
│   ├── axios.ts
│   ├── client.ts
│   ├── error.ts
│   ├── types.ts
│   └── modules/
│       └── auth.ts
├── auth/
│   └── session.ts
├── components/
│   ├── AppErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   ├── ThemeController.tsx
│   └── ui/
│       └── data-table-state.tsx
├── config/
│   ├── app.ts
│   └── router.ts
├── hooks/
│   ├── use-data-table.ts
│   ├── use-fetch-data.ts
│   └── use-mobile.ts
├── i18n/
│   ├── index.ts
│   ├── dev-check.ts
│   └── locales/
├── lib/
│   ├── routes.tsx
│   ├── pagination.ts
│   └── utils.ts
├── pages/
├── store/
│   └── useStore.ts
├── theme/
│   └── palette.ts
└── test/
```

## React Compiler Notes

React Compiler is enabled in `vite.config.ts` through
`reactCompilerPreset()` and `@rolldown/plugin-babel`. No additional compiler
package is required for the default setup.

## License

MIT License. See [LICENSE](./LICENSE).
