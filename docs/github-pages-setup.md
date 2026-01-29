# GitHub Pages Setup for Storybook

This document explains how to enable GitHub Pages for the Storybook documentation.

## Prerequisites

- Repository pushed to GitHub
- GitHub repository settings access

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 2. Workflow Configuration

The workflow is already configured in `.github/workflows/deploy-docs.yml`. It will:

1. Trigger on pushes to `main` branch
2. Install dependencies with Bun
3. Build the `@kenshin/ui` package
4. Build Storybook static site
5. Deploy to GitHub Pages

### 3. First Deployment

After enabling GitHub Pages:

1. Push any change to the `main` branch, or
2. Go to **Actions** tab and manually trigger the "Deploy Storybook" workflow

### 4. Access Your Docs

Once deployed, your Storybook will be available at:

```
https://<username>.github.io/<repository-name>/
```

For example:
- `https://maurocicerchia.github.io/kenshin-ui/`

## Workflow Details

The workflow (`.github/workflows/deploy-docs.yml`) includes:

```yaml
on:
  push:
    branches: ["main"]  # Auto-deploy on main branch
  workflow_dispatch:     # Manual trigger option

permissions:
  contents: read
  pages: write
  id-token: write
```

### Build Steps

1. **Checkout** - Clone the repository
2. **Setup Bun** - Install Bun runtime
3. **Setup Pages** - Configure GitHub Pages
4. **Install dependencies** - `bun install`
5. **Build package** - Build `@kenshin/ui` (required for Storybook)
6. **Build Storybook** - Generate static site
7. **Upload & Deploy** - Push to GitHub Pages

## Troubleshooting

### Build Fails

- Check that `bun run build` works locally in both `packages/ui` and `apps/storybook`
- Ensure all dependencies are listed in `package.json`

### Pages Not Updating

- Check the Actions tab for workflow status
- Verify GitHub Pages source is set to "GitHub Actions"
- Clear browser cache or use incognito mode

### 404 on Subpaths

This shouldn't happen with Storybook, but if it does:
- Storybook uses hash routing by default, which works on GitHub Pages
- No additional configuration needed

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add DNS records as instructed by GitHub
4. Enable "Enforce HTTPS"

The workflow will automatically deploy to your custom domain.
