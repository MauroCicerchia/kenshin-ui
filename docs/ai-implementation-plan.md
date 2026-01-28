# @kenshin/ui — Implementation Plan


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
- `package.json` name `@kenshin/ui`, version `0.0.0-development`
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


Deliverable: `@kenshin/ui` can render a small UI in a consumer app.


---


## Phase 5 — Playground consumer app (Vite)
1. Create `apps/playground` (Vite React TS).
2. Configure Tailwind in playground:
- import preset in `tailwind.config`
- import `@kenshin/ui/styles.css` in `main.tsx`
3. Link workspace dependency to `@kenshin/ui`.
4. Add a demo page that uses all core components.


Deliverable: real “consumer” validation that imports work and theming overrides work.


---

## Phase 6 — Storybook docs app
1. Create `apps/storybook` with Storybook for React + Vite builder.
2. Configure it to load:
- Tailwind preset (or reuse playground Tailwind config)
- `@kenshin/ui/styles.css`
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
- Prefer npm Trusted Publishing if you want to avoid long-lived tokens :contentReference[oaicite:14]{index=14}
- Otherwise use `NPM_TOKEN` secret


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
- Separate package for `@kenshin/tailwind-preset` if you want independent versioning
