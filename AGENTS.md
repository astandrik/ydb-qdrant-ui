## Project overview

This repository contains a small marketing/docs UI built with **Next.js 16** (App Router) and **React 19** for the YDB + Qdrant integration.

The app serves a public landing page (English and Russian), documentation pages, and a few reusable UI sections under `src/components`.

Reference for this file format and intent: see the AGENTS.md spec at `https://agents.md`.

## Setup commands

- **Install dependencies (npm, recommended)**:
  - `npm install`

- **Alternative package managers** (supported by the default Next.js template, but not tracked by lockfile here):
  - `yarn install`
  - `pnpm install`
  - `bun install`

- **TypeScript / ESLint config**:
  - TypeScript 5, React 19, Node 20 types.
  - ESLint 9 with `eslint-config-next`.

## Development workflow

- **Start dev server (port 3000 by default)**:
  - `npm run dev`

- **Open the app**:
  - Browser URL: `http://localhost:3000`

- **Primary entry points**:
  - App layout and global styles: `src/app/layout.tsx`, `src/app/globals.css`.
  - Default root page: `src/app/page.tsx`.
  - Localized root pages: `src/app/en/page.tsx`, `src/app/ru/page.tsx`.
  - Docs pages: `src/app/docs/page.tsx`, `src/app/ru/docs/page.tsx`.
  - Shared sections/components under `src/components/**`.

## Build and deployment

- **Production build**:
  - `npm run build`

- **Start production server (after build)**:
  - `npm run start`

- **Static export / hosting**:
  - The repo includes a pre-built `out/` directory from Next.js output, but you should **treat it as generated**. Do not hand-edit files inside `out/`; regenerate via `npm run build` when needed.

- **Next.js docs**:
  - Next.js framework docs: `https://nextjs.org/docs`

## Linting and formatting

- **Lint the project**:
  - `npm run lint`

- **ESLint configuration**:
  - Root config: `eslint.config.mjs`.
  - Uses Next.js recommended rules via `eslint-config-next`.

- **Conventions**:
  - Prefer TypeScript strictness and explicit types.
  - Avoid `any`, nested ternaries, and inline complex callbacks in JSX render paths.

## Testing

- **Current state**:
  - No explicit `test` script is defined in `package.json`.

- **When adding tests**:
  - Add a `test` script in `package.json` (e.g., using Jest or Vitest) and document the expected command here.
  - Keep mocks in dedicated `__mocks__` (or similar) folders, separate from test files.

## UI and styling conventions

- **Styling**:
  - Global styles: `src/app/globals.css`.
  - Page-specific styles: `src/app/page.module.css` and similar CSS modules where present.

- **Components**:
  - Import components directly from their implementation file where possible (`FooSection/FooSection.tsx`), even if an `index.tsx` re-export exists.
  - Favor small, focused components rather than large multi-mode components.

- **UI kit (`@gravity-ui/uikit`)**:
  - Use Gravity UI Kit components for layout primitives, typography, buttons, and common controls instead of hand-rolled HTML+CSS where possible.
  - Prefer UIKit layout components and spacing props over custom flexbox/CSS for standard section layout, following existing patterns in `src/components/**`.
  - Import components directly from `@gravity-ui/uikit` in each file; avoid extra local wrapper abstractions unless there is clear reuse.

- **Icons (`@gravity-ui/icons`)**:
  - Icons come from `@gravity-ui/icons` and should be chosen to match the semantic meaning in the UI (e.g., navigation, files, globe).
  - Configure icon size/color via UIKit props or existing CSS utility classes rather than ad-hoc inline styles.
  - Prefer built-in icons from `@gravity-ui/icons` before adding new custom SVG assets to `public/assets`.

- **Internationalization**:
  - Language-specific pages live under `src/app/en` and `src/app/ru`.
  - Shared UI sections have localized copy in `locales` or `locales.tsx` files in their respective component folders.

## Analytics and external integrations

- **Yandex Metrika**:
  - Tracking is handled via the `YandexMetrika` component under `src/app/YandexMetrika.tsx`.
  - The verification file `public/yandex_d61301df40d00f05.html` must remain available for Yandex site verification.

## Agent-specific guidance

- **General behavior**:
  - Prefer **minimal, behavior-preserving diffs**.
  - Avoid touching the generated `out/` directory; treat it as build output.
  - Do not change tracking/analytics IDs or verification files without explicit user request.

- **When modifying code**:
  - Verify TypeScript and ESLint are clean:
    - `npm run lint`
  - For larger changes, also run a fresh production build:
    - `npm run build`

- **When adding features**:
  - Reuse existing patterns in `src/components/**` for layout and locales.
  - Keep user-facing strings centralized in existing `locales` files where applicable.


