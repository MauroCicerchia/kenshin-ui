# Playground

> Development playground for testing @kenshinx/ui components

The playground is a Vite-based React application used for rapid development and testing of components from the `@kenshinx/ui` package.

## Purpose

This app serves as:

- **Development Environment** - Quick iteration and testing of components
- **Visual Testing** - Manual visual regression testing
- **Prototyping** - Experimenting with component combinations
- **Demo** - Showcasing component usage examples

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Dependencies installed at the root level (`bun install`)

### Development

Start the development server:

```bash
# From the root directory
bun run --filter '@kenshinx/playground' dev

# Or from this directory
cd apps/playground
bun run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Building

Build for production:

```bash
bun run --filter '@kenshinx/playground' build
```

### Preview Production Build

Preview the production build locally:

```bash
bun run --filter '@kenshinx/playground' preview
```

## Project Structure

```
playground/
├── index.html          # HTML entry point
├── src/
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── postcss.config.js   # PostCSS configuration
```

## Usage

The playground uses the local `@kenshinx/ui` package via workspace linking. Any changes to components in `packages/ui` will be reflected in the playground when using development mode.

### Hot Module Replacement (HMR)

Changes to components will automatically reload in the browser thanks to Vite's HMR.

### Adding Test Cases

Add new component examples in `src/App.tsx`:

```tsx
import { Button, Card } from '@kenshinx/ui';

function App() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Test Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Test Button</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Configuration

### Vite

The Vite configuration (`vite.config.ts`) is set up for React development with TypeScript support.

### Tailwind CSS

Tailwind is configured to use the Kenshin UI preset and scan both the playground source and the UI package for classes.

### TypeScript

TypeScript is configured to work with React and Vite. The config extends the root TypeScript configuration.

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Lint code (currently not configured)

## Notes

- This is a development tool and should not be deployed to production
- The playground uses the workspace version of `@kenshinx/ui`, so it always reflects the latest local changes
- For production-ready examples, see the Storybook documentation

## Related

- [Main README](../../README.md)
- [UI Package README](../../packages/ui/README.md)
- [Storybook Documentation](../storybook/README.md)
