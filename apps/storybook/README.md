# Storybook

> Component documentation and visual testing environment for @kenshinx/ui

This Storybook instance provides comprehensive documentation, interactive examples, and visual testing capabilities for all components in the `@kenshinx/ui` package.

## Purpose

Storybook serves as:

- **Documentation** - Living documentation for all components
- **Component Showcase** - Interactive examples and use cases
- **Visual Testing** - Visual regression testing and component isolation
- **Design System** - Design tokens and theming documentation
- **Developer Reference** - API documentation and prop tables

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Dependencies installed at the root level (`bun install`)

### Development

Start the Storybook development server:

```bash
# From the root directory
bun run --filter '@kenshinx/storybook' dev

# Or from this directory
cd apps/storybook
bun run dev
```

Storybook will be available at `http://localhost:6006`.

### Building

Build a static Storybook site:

```bash
bun run --filter '@kenshinx/storybook' build
```

The static build will be output to `storybook-static/` directory.

### Deploying

The built Storybook can be deployed to any static hosting service:

- **GitHub Pages** - See `.github/workflows/deploy-docs.yml`
- **Netlify** - Drag and drop the `storybook-static` folder
- **Vercel** - Configure build command and output directory
- **Any static host** - Upload the `storybook-static` folder

## Project Structure

```
storybook/
├── .storybook/
│   ├── main.ts         # Storybook configuration
│   └── preview.ts      # Global decorators and parameters
├── src/
│   ├── stories/        # Component stories
│   │   ├── Button.stories.tsx
│   │   ├── Card.stories.tsx
│   │   ├── Dialog.stories.tsx
│   │   ├── Input.stories.tsx
│   │   ├── Label.stories.tsx
│   │   ├── Switch.stories.tsx
│   │   ├── Introduction.mdx
│   │   └── Theming.mdx
│   └── styles.css      # Global styles
├── package.json
└── tsconfig.json
```

## Writing Stories

Stories are written in TypeScript/TSX format. Each component has its own story file:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@kenshinx/ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
```

## Story Organization

Stories are organized by component:

- **Components/** - Individual component stories
  - Button
  - Card
  - Dialog
  - Input
  - Label
  - Switch
- **Introduction** - Getting started guide (MDX)
- **Theming** - Design tokens and theming documentation (MDX)

## Features

### Addons

This Storybook includes:

- **Essentials** - Core addons (Controls, Actions, Viewport, etc.)
- **Interactions** - Testing user interactions
- **Links** - Navigation between stories
- **Themes** - Theme switching support

### Controls

All components expose interactive controls for props:

- Variant selectors
- Size options
- Boolean toggles
- Text inputs
- And more...

### Documentation

- **Auto-generated Docs** - Prop tables and component descriptions
- **MDX Pages** - Custom documentation pages
- **Code Examples** - Copy-paste ready code snippets

## Configuration

### Main Configuration (`.storybook/main.ts`)

Configures:
- Story locations and file patterns
- Addons
- Framework (React + Vite)
- TypeScript support

### Preview Configuration (`.storybook/preview.ts`)

Configures:
- Global decorators
- Parameters
- Theme switching
- CSS imports

## Scripts

- `dev` - Start Storybook development server (port 6006)
- `build` - Build static Storybook site
- `lint` - Lint code (currently not configured)
- `test` - Run tests (currently not configured)

## Best Practices

### Writing Stories

1. **Cover all variants** - Create stories for each component variant
2. **Show states** - Include disabled, loading, error states
3. **Provide examples** - Show real-world usage patterns
4. **Document props** - Use JSDoc comments for better prop tables
5. **Use MDX** - For complex documentation, use MDX pages

### Component Isolation

- Each story should be self-contained
- Use decorators for common wrappers
- Avoid external dependencies in stories

### Visual Testing

- Use consistent viewport sizes
- Test responsive behavior
- Document visual regressions

## Deployment

### GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) that automatically deploys Storybook to GitHub Pages on push to main.

### Manual Deployment

1. Build Storybook: `bun run build`
2. Upload `storybook-static/` to your hosting service
3. Configure your host to serve the static files

## Troubleshooting

### Port Already in Use

If port 6006 is in use, Storybook will automatically use the next available port.

### Build Errors

- Ensure all dependencies are installed: `bun install`
- Check TypeScript errors: `bun run --filter '@kenshinx/ui' build`
- Verify component exports in `packages/ui/src/index.ts`

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that `@kenshinx/ui/styles.css` is imported in `preview.ts`
- Verify the Tailwind preset is included in `tailwind.config.ts`

## Related

- [Main README](../../README.md)
- [UI Package README](../../packages/ui/README.md)
- [Playground README](../playground/README.md)
- [Storybook Documentation](https://storybook.js.org/)
