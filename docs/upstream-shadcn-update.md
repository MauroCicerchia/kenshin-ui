# Upstream shadcn Update Guide

This guide explains how to update components from the upstream shadcn/ui registry and maintain alignment with library conventions.

## Overview

`@kenshinx/ui` vendors shadcn/ui components, adapting them to the library's structure and conventions. When shadcn/ui releases updates, follow this process to incorporate changes while maintaining consistency.

## Using the shadcn MCP Server

The recommended way to pull shadcn components is via the MCP (Model Context Protocol) server in Cursor.

### Pull a Component

Use the MCP server to fetch the latest component source:

1. Open Cursor with MCP configured
2. Ask the AI to fetch the component using the shadcn MCP server
3. The component source will be pulled from the shadcn registry

Example prompt:
```
Use the shadcn MCP server to get the latest source for the Alert component
```

### What Gets Pulled

The MCP server provides:
- Component TypeScript/TSX source
- Required dependencies list
- Any sub-components or utilities

## Update Workflow

### Step 1: Pull Latest Component

Use MCP to fetch the current upstream version:

```
Fetch the latest [ComponentName] from shadcn using the MCP server
```

### Step 2: Compare Changes

Review differences between:
- Current library version (`packages/ui/src/components/`)
- Upstream version from MCP

Key areas to check:
- New props or variants
- Changed class names or styling
- Updated Radix primitive usage
- Bug fixes or accessibility improvements
- Breaking changes

### Step 3: Re-Apply Library Conventions

After pulling the updated component, ensure it follows library conventions:

#### Token Usage

Verify all design values use CSS variables:

```tsx
// ✅ Correct - uses tokens
<div className="bg-background text-foreground border-border rounded-md">

// ❌ Incorrect - hardcoded values
<div className="bg-white text-gray-900 border-gray-200 rounded-lg">
```

Common token mappings:
| Value Type | Token Pattern | Example |
| ---------- | ------------- | ------- |
| Background | `bg-{semantic}` | `bg-background`, `bg-primary`, `bg-muted` |
| Text | `text-{semantic}` | `text-foreground`, `text-primary-foreground` |
| Border | `border-{semantic}` | `border-border`, `border-input` |
| Radius | `rounded-{size}` | Uses `--radius` via preset |

#### Export Pattern

Ensure component is exported from `src/index.ts`:

```ts
// packages/ui/src/index.ts
export { ComponentName } from "./components/component-name"
export type { ComponentNameProps } from "./components/component-name"
```

#### File Naming

Follow kebab-case convention:
- `button.tsx`
- `alert-dialog.tsx`
- `dropdown-menu.tsx`

#### Import Paths

Update internal imports to match library structure:

```tsx
// ✅ Library structure
import { cn } from "../lib/utils"

// ❌ shadcn default (update this)
import { cn } from "@/lib/utils"
```

### Step 4: Update Stories

After updating the component, update or add Storybook stories:

1. **Update existing stories** if component API changed
2. **Add new stories** for new variants or features
3. **Document breaking changes** in story descriptions

```tsx
// apps/storybook/src/stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { ComponentName } from "@kenshinx/ui"

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ComponentName>

// Add stories for new variants
export const NewVariant: Story = {
  args: {
    variant: "new-variant",
    children: "New Variant Example",
  },
}
```

### Step 5: Test Changes

1. **Build the package:**
   ```bash
   cd packages/ui
   bun run build
   ```

2. **Run Storybook:**
   ```bash
   cd apps/storybook
   bun run storybook
   ```

3. **Visual verification:**
   - Check all component stories render correctly
   - Verify light/dark mode (if applicable)
   - Test interactive states

4. **Consumer app test (recommended):**
   ```bash
   cd apps/playground
   bun run dev
   ```

### Step 6: Commit and Release

Follow conventional commit format:

```bash
# For updates with new features
git commit -m "feat(component-name): update to latest shadcn version

- Add new variant option
- Improve accessibility
- Update styling tokens"

# For bug fixes
git commit -m "fix(component-name): sync with upstream fix

Cherry-picked fix for focus trap issue from shadcn"

# For breaking changes
git commit -m "feat(component-name)!: update API to match shadcn v2

BREAKING CHANGE: The 'variant' prop has been renamed to 'intent'"
```

## Handling Breaking Changes

When upstream changes break the API:

### Option 1: Adopt the Breaking Change

If the change improves the component:

1. Update the component to match upstream
2. Mark commit as breaking change
3. Document migration in release notes

### Option 2: Maintain Backward Compatibility

If you want to avoid breaking consumers:

1. Keep existing prop names as aliases
2. Add deprecation warnings (optional)
3. Plan removal in future major version

```tsx
interface ButtonProps {
  /** @deprecated Use `intent` instead */
  variant?: "default" | "destructive"
  intent?: "default" | "destructive"
}

const Button = ({ variant, intent, ...props }) => {
  const resolvedIntent = intent ?? variant // Support both
  // ...
}
```

## When to Update

Consider updating when:

- shadcn releases security or accessibility fixes
- New features you want to adopt
- Bug fixes relevant to your usage
- Periodic sync (quarterly recommended)

## Tracking Upstream Versions

While there's no direct version tracking, you can:

1. **Check shadcn changelog:** https://ui.shadcn.com/docs/changelog
2. **Monitor GitHub:** https://github.com/shadcn-ui/ui
3. **Compare dates:** Note when you last updated each component

Consider adding a comment in component files:

```tsx
/**
 * Based on shadcn/ui Button
 * Last synced: 2024-01-15
 * https://ui.shadcn.com/docs/components/button
 */
```

## Update Checklist

For each component update:

- [ ] Pull latest from shadcn MCP
- [ ] Compare with current library version
- [ ] Re-apply token usage (no hardcoded values)
- [ ] Update internal import paths
- [ ] Verify export from `src/index.ts`
- [ ] Update stories for new features/variants
- [ ] Run build (`bun run build`)
- [ ] Visual test in Storybook
- [ ] Commit with conventional format
- [ ] Document breaking changes (if any)

## Quick Reference

| Task | Command/Location |
| ---- | ---------------- |
| Pull component | MCP: "Fetch [Component] from shadcn" |
| Component location | `packages/ui/src/components/` |
| Exports | `packages/ui/src/index.ts` |
| Stories | `apps/storybook/src/stories/` |
| Build | `cd packages/ui && bun run build` |
| Storybook | `cd apps/storybook && bun run storybook` |
