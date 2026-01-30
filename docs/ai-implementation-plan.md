# @kenshinx/ui — Implementation Plan


## Phase 0 — Repo bootstrap (monorepo)
1. Create repo `kenshin-ui` (GitHub).
2. Initialize bun project at repo root:
- `bun init`
3. Configure workspaces:
- root `package.json` with `workspaces: ["apps/*", "packages/*"]`
4. Create folders:
- `packages/ui`
- `apps/storybook`
- (optional) `apps/playground`


Deliverable: repo boots, `bun install` works at root.


---


## Phase 1 — Package: `packages/ui`
1. Initialize `packages/ui`:
- `package.json` name `@kenshinx/ui`, version `0.0.0-development`
- set `type: "module"`
- set `sideEffects: false`
- set `exports` map:
- `"." -> dist/index.js`
- `"./styles.css" -> dist/styles.css`
- `"./tailwind-preset" -> dist/tailwind-preset.js` (or separate package)
2. Add dependencies aligned with shadcn (typical):
- `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` etc. (as needed by chosen components) :contentReference[oaicite:9]{index=9}
3. Add peerDependencies:
- `react`, `react-dom`, `tailwindcss`


Deliverable: package structure ready with clean exports.


---


## Phase 2 — Theming foundation (preset + CSS variables)
1. Create `packages/ui/src/styles/tokens.css`:
- `:root` tokens
- `.dark` tokens (optional)
- include `--radius`
2. Create Tailwind preset module:
- `packages/ui/src/tailwind/preset.ts`
- implements `theme.extend.colors` using CSS vars
- sets `borderRadius` based on `--radius`
- adds needed plugins (animate, etc.)
3. Add build step to output:
- `dist/styles.css` (copy tokens.css)
- `dist/tailwind-preset.js`


Deliverable: consumer can import preset + tokens and override tokens in app CSS.


---

## Phase 3 — Build system with Bun + bunup
1. Add bun scripts at root and package level:
- `lint`, `test`, `build`, `dev`
2. Choose library builder:
- Use bunup for `packages/ui` to produce ESM + types :contentReference[oaicite:10]{index=10}
- Reason: don’t depend on `bun build` alone for `.d.ts` :contentReference[oaicite:11]{index=11}
3. Configure bunup:
- entry: `src/index.ts`
- output: `dist/`
- generate `.d.ts`
4. Add `src/index.ts` exporting:
- components
- `cn` helper
- (optional) theme utilities


Deliverable: `bun run build` produces publishable `dist/` artifacts.


---


## Phase 4 — Add first component set (minimal but representative)
Start with a “core kit”:
- Button
- Input
- Label
- Card
- Dialog (Radix-based)
- Toast/Sonner (optional later)


Steps per component:
1. Use shadcn MCP server in Cursor to fetch/install the component source as baseline :contentReference[oaicite:12]{index=12}
2. Adapt into library conventions:
- ensure tokens are used (no hardcoded theme values)
- ensure exports from `src/index.ts`
3. Add stories (Phase 6) for each.


Deliverable: `@kenshinx/ui` can render a small UI in a consumer app.


---


## Phase 4A — Form Controls Expansion ✅ COMPLETED
Priority components to complete form functionality.

### 4A.1 — Select ✅
1. ~~Use shadcn MCP server to fetch Select component source.~~
2. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used (no hardcoded theme values)~~
   - ~~Export from `src/index.ts`~~
3. ~~Add Radix UI Select as dependency if not present.~~
4. ~~Add story with variants: default, disabled, with placeholder, with groups.~~
5. ~~Add component demo to playground app.~~

### 4A.2 — Checkbox ✅
1. ~~Use shadcn MCP server to fetch Checkbox component source.~~
2. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
3. ~~Add Radix UI Checkbox as dependency if not present.~~
4. ~~Add story with variants: default, checked, disabled, indeterminate.~~
5. ~~Add component demo to playground app.~~

### 4A.3 — Textarea ✅
1. ~~Use shadcn MCP server to fetch Textarea component source.~~
2. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
3. ~~Add story with variants: default, disabled, with placeholder, with rows.~~
4. ~~Add component demo to playground app.~~


Deliverable: Complete form control set for typical form UIs.


---


## Phase 4B — Feedback & Notification Components ✅ COMPLETED
Components for user feedback and status communication.

### 4B.1 — Toast (Sonner) ✅
1. ~~Use shadcn MCP server to fetch Sonner/Toast component source.~~
2. ~~Add `sonner` as dependency.~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used for toast styling~~
   - ~~Export Toaster and toast utilities from `src/index.ts`~~
4. ~~Add story demonstrating: success, error, warning, info, with action, with description.~~
5. ~~Add component demo to playground app.~~

### 4B.2 — Alert ✅
1. ~~Use shadcn MCP server to fetch Alert component source.~~
2. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
3. ~~Add story with variants: default, destructive, with icon, with title and description.~~
4. ~~Add component demo to playground app.~~

### 4B.3 — Badge ✅
1. ~~Use shadcn MCP server to fetch Badge component source.~~
2. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
3. ~~Add story with variants: default, secondary, destructive, outline.~~
4. ~~Add component demo to playground app.~~


Deliverable: Comprehensive feedback system for user notifications and status indicators.


---


## Phase 4C — Navigation & Overlay Components ✅ COMPLETED
Components for navigation patterns and contextual overlays.

### 4C.1 — Dropdown Menu ✅
1. ~~Use shadcn MCP server to fetch Dropdown Menu component source.~~
2. ~~Add Radix UI Dropdown Menu as dependency if not present.~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export all subcomponents from `src/index.ts`~~
4. ~~Add story with: basic menu, with icons, with shortcuts, with submenus, with checkboxes/radios.~~
5. ~~Add component demo to playground app.~~

### 4C.2 — Tabs ✅
1. ~~Use shadcn MCP server to fetch Tabs component source.~~
2. ~~Add Radix UI Tabs as dependency if not present.~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
4. ~~Add story with variants: default, with icons, vertical orientation.~~
5. ~~Add component demo to playground app.~~

### 4C.3 — Tooltip ✅
1. ~~Use shadcn MCP server to fetch Tooltip component source.~~
2. ~~Add Radix UI Tooltip as dependency if not present.~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
4. ~~Add story with: basic tooltip, different positions, with delay.~~
5. ~~Add component demo to playground app.~~

### 4C.4 — Popover ✅
1. ~~Use shadcn MCP server to fetch Popover component source.~~
2. ~~Add Radix UI Popover as dependency if not present.~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
4. ~~Add story with: basic popover, with form content, different alignments.~~
5. ~~Add component demo to playground app.~~

### 4C.5 — Sheet ✅
1. ~~Use shadcn MCP server to fetch Sheet component source.~~
2. ~~Add Radix UI Dialog as dependency if not present (Sheet uses Dialog primitive).~~
3. ~~Adapt to library conventions:~~
   - ~~Ensure tokens are used~~
   - ~~Export from `src/index.ts`~~
4. ~~Add story with: left/right/top/bottom positions, with form content.~~
5. ~~Add component demo to playground app.~~


Deliverable: Full navigation and overlay toolkit for menus, panels, and contextual content.


---


## Phase 4D — Data Display & Loading Components
Components for displaying data and loading states.

### 4D.1 — Avatar
1. Use shadcn MCP server to fetch Avatar component source.
2. Add Radix UI Avatar as dependency if not present.
3. Adapt to library conventions:
   - Ensure tokens are used
   - Export from `src/index.ts`
4. Add story with: with image, with fallback initials, different sizes.
5. Add component demo to playground app.

### 4D.2 — Skeleton
1. Use shadcn MCP server to fetch Skeleton component source.
2. Adapt to library conventions:
   - Ensure tokens are used
   - Export from `src/index.ts`
3. Add story with: basic skeleton, card skeleton, list skeleton patterns.
4. Add component demo to playground app.

### 4D.3 — Table
1. Use shadcn MCP server to fetch Table component source.
2. Adapt to library conventions:
   - Ensure tokens are used
   - Export all subcomponents from `src/index.ts`
3. Add story with: basic table, with sorting indication, with selection, responsive patterns.
4. Add component demo to playground app.


Deliverable: Essential components for data-heavy interfaces and loading states.


---


## Phase 4E — Form Integration
React Hook Form integration for comprehensive form handling.

### 4E.1 — Form
1. Use shadcn MCP server to fetch Form component source.
2. Add `react-hook-form` and `@hookform/resolvers` as peer dependencies.
3. Add `zod` as optional peer dependency for validation.
4. Adapt to library conventions:
   - Ensure tokens are used
   - Export Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage from `src/index.ts`
5. Add story with: complete form example, validation states, error messages.
6. Add documentation for Form usage with react-hook-form.
7. Add component demo to playground app.


Deliverable: Full form handling integration with validation support.


---


## Phase 5 — Playground consumer app (Vite)
1. Create `apps/playground` (Vite React TS).
2. Configure Tailwind in playground:
- import preset in `tailwind.config`
- import `@kenshinx/ui/styles.css` in `main.tsx`
3. Link workspace dependency to `@kenshinx/ui`.
4. Add a demo page that uses all core components.


Deliverable: real “consumer” validation that imports work and theming overrides work.


---

## Phase 6 — Storybook docs app
1. Create `apps/storybook` with Storybook for React + Vite builder.
2. Configure it to load:
- Tailwind preset (or reuse playground Tailwind config)
- `@kenshinx/ui/styles.css`
3. Add stories per component:
- variants
- sizes
- disabled states
4. Add docs pages:
- “Getting Started”
- “Theming” (how to override CSS vars and radius)
- “Changelog / Versioning policy”


Deliverable: `bun run storybook` works locally; `bun run build-storybook` outputs static site.


---


## Phase 7 — Publish docs
GitHub Pages
1. Add workflow that builds storybook and deploys `/storybook-static` to Pages.


Deliverable: public URL for Storybook docs.


---


## Phase 8 — CI + semantic-release + npm publishing
1. Configure conventional commits (lightweight):
- add commitlint (optional) + a docs note.
2. Add semantic-release config:
- plugins: commit-analyzer, release-notes-generator, npm, github :contentReference[oaicite:13]{index=13}
3. Add GitHub Actions workflow:
- trigger: push to `main`
- steps:
- checkout
- setup bun
- `bun install`
- `bun run lint`
- `bun run test`
- `bun run build`
- `bunx semantic-release` (or `bun run release`)
4. Configure npm auth:
- Use `NPM_TOKEN` secret for npm authentication


Deliverable: merging to `main` publishes a new npm version + GitHub release notes.


---

## Phase 9 — Maintenance workflows (operationalize)
1. Add “Component addition checklist”:
- tokens used
- story added
- export added
2. Add “Release checklist” (mostly automated):
- conventional commit
- green CI
3. Add “Upstream shadcn update” doc:
- use MCP to pull latest component
- re-apply conventions
- update stories


Deliverable: predictable maintenance and growth without design drift.


---


## Phase 10 — Nice-to-haves (later)
- Visual regression (Chromatic)
- More complex components (Table, Combobox, Date picker)
- Theme switching utilities
- Separate package for `@kenshinx/tailwind-preset` if you want independent versioning
