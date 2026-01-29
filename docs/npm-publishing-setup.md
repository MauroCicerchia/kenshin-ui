# npm Publishing Setup

This guide explains how to configure npm publishing for automated releases via GitHub Actions.

## Prerequisites

1. An npm account at [npmjs.com](https://www.npmjs.com/)
2. Access to the GitHub repository settings

## Setup Steps

### 1. Create an npm Access Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to **Account Settings** (click your avatar → Access Tokens)
3. Click **Generate New Token**
4. Select **Automation** token type (recommended for CI/CD)
5. Copy the generated token

### 2. Add the Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 3. Verify Package Configuration

Ensure `packages/ui/package.json` has:

```json
{
  "name": "@kenshinx/ui",
  "publishConfig": {
    "access": "public"
  }
}
```

The `access: "public"` is required for scoped packages (`@kenshinx/*`) to be published publicly.

## Alternative: npm Trusted Publishing (OIDC)

For enhanced security without long-lived tokens, you can use npm's Trusted Publishing feature.

### Setup Trusted Publishing

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to your package settings
3. Navigate to **Publishing access** → **Add trusted publisher**
4. Configure:
   - Repository: `maurocicerchia/kenshin-ui`
   - Environment: `release` (if using GitHub environments)
   - Workflow: `ci.yml`

### Update CI Workflow

If using Trusted Publishing, update `.github/workflows/ci.yml`:

```yaml
release:
  # ... other config
  permissions:
    contents: write
    issues: write
    pull-requests: write
    id-token: write  # Required for OIDC

  steps:
    # ... other steps

    - name: Setup Node.js (for semantic-release)
      uses: actions/setup-node@v4
      with:
        node-version: "lts/*"
        registry-url: "https://registry.npmjs.org"

    # No NPM_TOKEN needed with Trusted Publishing
    - name: Release
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: |
        npm config set //registry.npmjs.org/:_authToken ''
        bunx semantic-release
```

## Testing the Setup

### Dry Run

Test semantic-release without actually publishing:

```bash
bun run release:dry-run
```

This will:
- Analyze commits to determine version
- Show what changes would be made
- Not publish or create releases

### First Release

The first release will be triggered automatically when:

1. You push a commit with type `feat:` or `fix:` to `main`
2. CI passes (lint, test, build)
3. semantic-release determines a new version is needed

Check the **Actions** tab in GitHub to monitor the release process.

## Troubleshooting

### "npm ERR! 403 Forbidden"

- Ensure the npm token has publish permissions
- Verify `publishConfig.access` is set to `"public"` for scoped packages
- Check token hasn't expired

### "No release published"

- Commits must follow conventional commit format
- Only `feat`, `fix`, `perf`, `refactor` types trigger releases
- Check that there are eligible commits since the last release

### "GITHUB_TOKEN permissions"

Ensure the workflow has proper permissions:

```yaml
permissions:
  contents: write    # Create releases
  issues: write      # Comment on issues
  pull-requests: write  # Comment on PRs
```

## CI Workflow Overview

The CI workflow (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

| Job      | Trigger              | Steps                        |
| -------- | -------------------- | ---------------------------- |
| `ci`     | All pushes and PRs   | Install, Lint, Test, Build   |
| `release`| Push to `main` only  | Build, semantic-release      |

semantic-release will:
1. Analyze commits since last release
2. Determine version bump (major/minor/patch)
3. Update `package.json` version
4. Generate release notes
5. Publish to npm
6. Create GitHub release
