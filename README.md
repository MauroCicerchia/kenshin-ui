# Kenshin UI

> A modern React UI component library built with Tailwind CSS and shadcn/ui patterns

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB.svg)](https://react.dev/)

## Overview

Kenshin UI is a monorepo containing a collection of reusable React components built with modern web standards. The library follows the [shadcn/ui](https://ui.shadcn.com/) design patterns and provides accessible, customizable components powered by Radix UI primitives and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Beautiful, accessible components built with Tailwind CSS
- ♿ **Accessible** - Built on Radix UI primitives for full accessibility support
- 🎯 **TypeScript** - Fully typed components with TypeScript
- 🎭 **Customizable** - Easy to theme and customize with Tailwind CSS
- 📦 **Tree-shakeable** - Import only what you need
- 🚀 **Fast** - Optimized builds with tsup
- 📚 **Documented** - Storybook documentation included

## Project Structure

This is a monorepo managed with Bun workspaces:

```
kenshin-ui/
├── packages/
│   └── ui/              # Main component library
├── apps/
│   ├── playground/      # Development playground (Vite)
│   └── storybook/       # Component documentation
└── docs/                # Project documentation
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- Node.js 18+ (if not using Bun)

### Installation

Clone the repository:

```bash
git clone https://github.com/MauroCicerchia/kenshinx-ui.git
cd kenshin-ui
```

Install dependencies:

```bash
bun install
```

### Development

Run all packages in development mode:

```bash
bun run dev
```

Run specific workspace:

```bash
# Run playground
bun run --filter '@kenshinx/playground' dev

# Run Storybook
bun run --filter '@kenshinx/storybook' dev
```

### Building

Build all packages:

```bash
bun run build
```

Build specific package:

```bash
bun run --filter '@kenshinx/ui' build
```

### Linting

Lint all packages:

```bash
bun run lint
```

## Using the Library

### Installation

Install the package from npm:

```bash
npm install @kenshinx/ui
# or
bun add @kenshinx/ui
```

### Setup

1. **Install peer dependencies:**

```bash
npm install react react-dom tailwindcss
```

2. **Configure Tailwind CSS:**

Add the Tailwind preset to your `tailwind.config.js`:

```js
import { kenshinPreset } from '@kenshinx/ui/tailwind-preset';

export default {
  presets: [kenshinPreset],
  // ... your config
};
```

3. **Import styles:**

Add the CSS file to your app:

```js
import '@kenshinx/ui/styles.css';
```

### Usage

```tsx
import { Button, Card, Input } from '@kenshinx/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Available Components

See the [Storybook documentation](apps/storybook/README.md) for detailed component documentation.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Commit Convention** - This project uses [Conventional Commits](https://www.conventionalcommits.org/)
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

2. **Code Style** - The project uses ESLint and Prettier. Run `bun run lint` before committing.

3. **Pull Requests** - Open a pull request with a clear description of changes.

## Scripts

- `bun run build` - Build all packages
- `bun run dev` - Start development mode for all packages
- `bun run lint` - Lint all packages
- `bun run test` - Run tests (when implemented)
- `bun run release` - Create a new release (uses semantic-release)
- `bun run release:dry-run` - Preview release without publishing

## Release Process

This project uses [semantic-release](https://semantic-release.gitbook.io/) for automated version management and package publishing. Releases are automatically created based on conventional commit messages.

## License

MIT © [Mauro Cicerchia](https://github.com/MauroCicerchia)

## Links

- [Component Library Package](./packages/ui/README.md)
- [Playground App](./apps/playground/README.md)
- [Storybook Documentation](./apps/storybook/README.md)
- [GitHub Repository](https://github.com/MauroCicerchia/kenshinx-ui)
