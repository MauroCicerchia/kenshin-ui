# Component Addition Checklist

This checklist ensures consistency when adding new components to `@kenshinx/ui`. Follow these steps to maintain design system coherence and predictable library growth.

## Pre-Development Checklist

- [ ] **Identify the component source**
  - Is this a new shadcn/ui component? Use MCP to pull it (see [Upstream shadcn Update Guide](./upstream-shadcn-update.md))
  - Is this a custom component? Design it following shadcn patterns

- [ ] **Check for dependencies**
  - Identify required Radix primitives or other dependencies
  - Add any new peer dependencies to `packages/ui/package.json`

## Implementation Checklist

### 1. Component File

- [ ] Create component file in `packages/ui/src/components/`
- [ ] Follow naming convention: `component-name.tsx` (kebab-case)

### 2. Token Usage (Critical)

**No hardcoded values allowed.** All design primitives must use CSS variables:

- [ ] **Colors** use CSS variables (`bg-background`, `text-foreground`, `bg-primary`, etc.)
- [ ] **Border radius** uses `--radius` token (via Tailwind classes like `rounded-md`)
- [ ] **Spacing** uses Tailwind scale (acceptable) or CSS variables if custom
- [ ] **Shadows** use CSS variables if component uses shadows

```tsx
// ✅ Good - uses design tokens
<button className="bg-primary text-primary-foreground rounded-md">

// ❌ Bad - hardcoded values
<button className="bg-blue-500 text-white rounded-lg">
```

### 3. Component Patterns

- [ ] Use `cn()` helper for class merging
- [ ] Use `class-variance-authority` for variants
- [ ] Follow existing component patterns (check Button or Card for reference)
- [ ] Export all necessary types (props interface)
- [ ] Support `className` prop for consumer customization
- [ ] Forward refs where appropriate (especially for form elements)

```tsx
// Example structure
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", secondary: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### 4. Export from Index

- [ ] Add export to `packages/ui/src/index.ts`

```ts
// In src/index.ts
export { ComponentName } from "./components/component-name"
export type { ComponentNameProps } from "./components/component-name"
```

### 5. Story Added

- [ ] Create story file in `apps/storybook/src/stories/`
- [ ] Follow naming convention: `ComponentName.stories.tsx`

Story must include:

- [ ] **Default story** showing basic usage
- [ ] **Variants story** showing all variant options
- [ ] **Sizes story** (if applicable) showing all size options
- [ ] **States story** showing disabled, loading, error states (if applicable)
- [ ] **Composition examples** (if component composes with others)

```tsx
// Example story structure
import type { Meta, StoryObj } from "@storybook/react"
import { ComponentName } from "@kenshinx/ui"

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline"],
    },
  },
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: { children: "Example" },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="default">Default</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
}
```

## Post-Implementation Checklist

### Build Verification

- [ ] Run `bun run build` in `packages/ui` - no errors
- [ ] Run `bun run lint` - no linting errors
- [ ] Run `bun run test` (if tests exist) - all pass

### Visual Verification

- [ ] Run `bun run storybook` in `apps/storybook`
- [ ] Verify component renders correctly in all stories
- [ ] Check light and dark mode (if theme switching is available)
- [ ] Verify responsive behavior (if applicable)

### Consumer App Test (Optional but Recommended)

- [ ] Import and use component in `apps/playground`
- [ ] Verify token overrides work correctly

## Commit and Release

- [ ] Commit with conventional commit format: `feat(component-name): add ComponentName component`
- [ ] Push to `main` (or create PR for review)
- [ ] CI will automatically release if all checks pass

## Quick Reference

| Step | Location | Verification |
| ---- | -------- | ------------ |
| Component file | `packages/ui/src/components/` | File exists |
| Token usage | Component file | No hardcoded colors/radii |
| Export | `packages/ui/src/index.ts` | Component exported |
| Story | `apps/storybook/src/stories/` | Story file exists |
| Build | `packages/ui` | `bun run build` passes |
| Visual | `apps/storybook` | Storybook renders correctly |
