# @kenshinx/ui

> A React UI component library built with Tailwind CSS and shadcn/ui patterns

[![npm version](https://img.shields.io/npm/v/@kenshinx/ui.svg)](https://www.npmjs.com/package/@kenshinx/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @kenshinx/ui
# or
bun add @kenshinx/ui
# or
yarn add @kenshinx/ui
# or
pnpm add @kenshinx/ui
```

## Peer Dependencies

This package requires the following peer dependencies:

- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `tailwindcss` ^3.4.0

Install them if you haven't already:

```bash
npm install react react-dom tailwindcss
```

## Quick Start

### 1. Configure Tailwind CSS

Add the Kenshin UI preset to your `tailwind.config.js`:

```js
import { kenshinPreset } from '@kenshinx/ui/tailwind-preset';

export default {
  presets: [kenshinPreset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@kenshinx/ui/**/*.{js,jsx,ts,tsx}',
  ],
};
```

### 2. Import Styles

Import the CSS file in your app's entry point:

```js
// main.js or App.js
import '@kenshinx/ui/styles.css';
```

### 3. Use Components

```tsx
import { Button, Card, Input } from '@kenshinx/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Type something..." />
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Utilities

### `cn` - Class Name Utility

A utility function for merging Tailwind CSS classes, combining `clsx` and `tailwind-merge`.

```tsx
import { cn } from '@kenshinx/ui';

<div className={cn('base-class', condition && 'conditional-class', className)} />
```

## TypeScript

This package is written in TypeScript and includes type definitions. All components are fully typed:

```tsx
import { Button, type ButtonProps } from '@kenshinx/ui';

const props: ButtonProps = {
  variant: 'default',
  size: 'lg',
  children: 'Click me',
};
```

## Theming

Components use CSS custom properties (CSS variables) for theming. You can customize the theme by overriding these variables in your CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

See `src/styles/tokens.css` for the complete list of design tokens.

## Tree Shaking

This package is tree-shakeable. Import only the components you need:

```tsx
// ✅ Good - only imports Button
import { Button } from '@kenshinx/ui';

// ❌ Avoid - imports everything
import * as UI from '@kenshinx/ui';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Building

```bash
bun run build
```

### Development Mode

```bash
bun run dev
```

### Linting

```bash
bun run lint
bun run lint:fix
```

## License

MIT © [Mauro Cicerchia](https://github.com/MauroCicerchia)

## Related

- [shadcn/ui](https://ui.shadcn.com/) - Design system inspiration
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
