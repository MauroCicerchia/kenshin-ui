# @kenshinx/ui — AI Agent Context (Spec)


## 0) What we’re building
A personal React UI component library for Mauro’s projects, published to npm as `@kenshinx/ui`, based on **shadcn/ui** primitives and patterns, with:
- Tailwind-first styling
- A **theme system** that is:
    - shipped as a **Tailwind preset + CSS variables**
    - **overridable by the consumer app** (colors, radii, etc.)
- Storybook-based documentation published to a **public, free URL**
- Bun-powered workflows (install, scripts, testing, build orchestration)
- Automated versioning + publishing via **semantic-release + GitHub Actions**


## 1) Goals
- Provide a consistent, recognizable “personal brand” UI across projects.
- Keep the library minimal and composable (Vite-first consumers).
- Ship typed React components (TypeScript).
- Encourage reuse: components should be reusable without app-specific assumptions.
- Consumer app must be able to override theme tokens without forking the library.


## 2) Non-goals (for v1)
- No Next.js/RSC-specific guarantees (it should still *work* in Next, but we won’t optimize for it yet).
- No complex design system governance (figma tokens pipeline, multi-brand, etc.).
- No separate “registry” distribution model (we do classic npm imports).


## 3) Tech stack (decisions)
- Language: TypeScript
- UI: React
- Base components/patterns: shadcn/ui
- Styling: Tailwind CSS + CSS variables
- Monorepo tool: bun workspaces (or equivalent bun-supported workspace setup)
- Bundling/build for library:
    - Use **Bun** for orchestration and speed
    - Use a library-oriented bundler that reliably emits `.d.ts`:
        - Prefer **bunup** (purpose-built for libraries on top of Bun) :contentReference[oaicite:0]{index=0}
        - Reason: `bun build` historically does **not** generate TypeScript declaration files by itself; this is a known gap :contentReference[oaicite:1]{index=1}
- Docs: Storybook
- Release: semantic-release + GitHub Actions :contentReference[oaicite:2]{index=2}


## 4) Repository layout (monorepo)
Recommended structure:


```
/
├── docs/
├── apps/
│   ├── storybook/ # Storybook site (docs)
│   └── playground/ # Optional Vite app consuming @kenshinx/ui locally
├── packages/
│   ├── ui/ # The published npm package (@kenshinx/ui)
│   └── tailwind-preset/ # Optional: separated preset pkg (or kept inside ui)
├── .github/
│   └── workflows/
├── package.json
└── bun.lockb
```


Notes:
- Keeping Storybook as an app avoids bundling docs into the npm package.
- A `playground` Vite app is extremely useful for smoke-testing consumption patterns.


## 5) Package design: `@kenshinx/ui`
### 5.1 Public API
- Consumers do: `import { Button, Card, ... } from "@kenshinx/ui"`
- Entry should be tree-shakeable (ESM).
- Export only stable components and tokens; avoid exporting internal helpers unless intended.


### 5.2 Module format
- Prefer **ESM** output only for v1 (fits modern tooling; Vite-first).
- Include types (`.d.ts`) in published package.
- Keep peer deps strict:
    - `react`, `react-dom`, `tailwindcss` (and possibly `@radix-ui/*` as deps depending on usage)
- Avoid bundling React in the output.


### 5.3 Component philosophy
- Wrap shadcn/ui patterns; do not fight them.
- Use:
    - `cn()` helper (clsx + tailwind-merge)
    - `class-variance-authority` for variants
- Accessibility is a feature:
    - Prefer Radix primitives used by shadcn/ui
- Component “slots” and composition:
    - Favor polymorphic patterns only when needed
    - Avoid over-abstracting early


### 5.4 Adding components from shadcn/ui
- The library will **vendor** shadcn/ui components (copy/adapt into `packages/ui/src/components/...`).
- Maintain the shadcn conventions (file names, variant patterns) to ease updates.


#### Using the shadcn MCP server with Cursor
- Install/configure the shadcn MCP server to let Cursor browse/search/install components from registries :contentReference[oaicite:3]{index=3}
- Workflow intent:
    - Use MCP to pull the latest shadcn component source as a starting point
    - Adapt it into the library structure (exports, theming, docs story)


## 6) Theming system (preset + CSS variables)
You want:
- a Tailwind preset for defaults
- plus consumer control over tokens (palette, radius, etc.)


### 6.1 Approach
- Ship:
    1) A **Tailwind preset** (`@kenshinx/ui/tailwind-preset` or `@kenshinx/tailwind-preset`)
    2) A **CSS tokens file** (CSS variables) that the consumer imports, e.g.:
        - `@kenshinx/ui/styles.css` (or `tokens.css`)
- Consumer overrides tokens by:
    - redefining CSS variables in their own CSS (preferred)
    - optionally layering multiple themes via `[data-theme="..."]`


This matches shadcn’s CSS-variable theming model :contentReference[oaicite:4]{index=4} and stays override-friendly.


### 6.2 Token surface (minimum viable)
Define CSS variables at least for:
- colors: `--background`, `--foreground`, `--primary`, `--primary-foreground`, etc.
- radii: `--radius` (and optionally derived radii)
- shadows (optional)
- spacing scale (optional, can stay Tailwind-default early)


### 6.3 Tailwind preset responsibilities
The preset should:
- set `theme.extend.colors` to use `hsl(var(--...))` tokens
- set borderRadius defaults to reference `--radius`
- add required plugins used by shadcn components (animations, etc.)
- expose a helper import path so the consumer can do:


```ts
// tailwind.config.ts
import kenshinPreset from "@kenshinx/ui/tailwind-preset"


export default {
presets: [kenshinPreset],
content: ["./index.html", "./src/**/*.{ts,tsx}"],
}
```

## 6.4 Consumer override contract

### How to override theme tokens

Consumers can override theme tokens by redefining CSS variables in:

- `:root`
- `.dark`
- `[data-theme="..."]`

Example:

```css
:root {
  --primary: 220 90% 56%;
  --radius: 0.75rem;
}
```

## Contract Rules

- No token values should be hardcoded inside components (except rare, justified cases).
- All design primitives (colors, radius, etc.) must reference CSS variables.
- Components must remain theme-agnostic and override-friendly.

---

## 7) Storybook (Docs + Visual QA)

- Storybook lives in `apps/storybook`.

### Each component should include:

- Stories covering:
  - Variants (e.g., size, intent)
  - States (disabled, loading, etc.)
- Basic interaction tests (optional at first)

### Add Docs pages covering:

- Usage
- Props
- Theming overrides
- Accessibility notes

---

## 7.1 Free Public Hosting

- **GitHub Pages** — Free and straightforward for static Storybook builds.

> Implementation should keep Storybook output fully static

---

## 8) Testing Strategy

### Unit / Component Tests

Start minimal:

- Utility tests
- A few component render tests

### Test runner considerations

- `bun test` is fine for non-DOM tests.
- For DOM-based tests, consider **Vitest + jsdom**, even if Bun orchestrates scripts.

### Linting

- ESLint (TypeScript + React Hooks rules)
- Prettier (optional but recommended)

---

## 9) Build & Publish

### 9.1 Build

`packages/ui` build should output:

- ESM JavaScript
- `.d.ts` type declarations
- CSS entry (tokens/styles)

Use **bunup** (recommended) since it is designed for library packaging on Bun.

Avoid relying solely on `bun build` for type declarations (historically missing capability).

---

### 9.2 Versioning & Release

Use **semantic-release** with:

- `@semantic-release/commit-analyzer`
- `@semantic-release/release-notes-generator`
- `@semantic-release/npm`
- `@semantic-release/github` (creates GitHub release + changelog notes)

GitHub Actions workflow on `main`:

1. Install dependencies via Bun  
2. Run lint  
3. Run tests  
4. Run build  
5. Run semantic-release  

Consider using **npm Trusted Publishing** for GitHub Actions (more secure than long-lived tokens).

---

### 9.3 Conventional Commits

Enforce conventional commits (recommended):

- `feat:`
- `fix:`
- `chore:`
- `refactor:`
- `docs:`
- `test:`

Required for semantic-release to compute versions reliably.

---

## 10) Maintenance Rules

- Keep shadcn-derived components close to upstream patterns.
- Avoid unnecessary divergence from shadcn conventions.

### When updating components:

1. Pull latest shadcn version via MCP (or manually).
2. Re-apply library conventions (exports, tokens usage).
3. Update or add stories.
4. Release via semantic-release.

---

## 11) Done Definition (v1)

- `@kenshinx/ui` published to npm.
- A consumer Vite app can install and use it with:
  - Tailwind preset
  - Tokens import
- Storybook deployed to a public URL.
- CI publishes automatically on merge to `main`.
