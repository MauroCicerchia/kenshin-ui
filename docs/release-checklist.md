# Release Checklist

This guide covers the release process for `@kenshinx/ui`. The process is **mostly automated** via semantic-release, but understanding the workflow helps ensure smooth releases.

## Automated Release Flow

When commits are pushed to `main`, the CI workflow automatically:

1. Runs lint, test, and build checks
2. Analyzes commit messages to determine version bump
3. Publishes to npm (if releasable commits exist)
4. Creates GitHub release with generated notes

**You don't need to manually version or publish.** The system handles it based on your commit messages.

## Pre-Merge Checklist

Before merging to `main`, verify:

### 1. Conventional Commits

- [ ] All commits follow [Conventional Commits](./conventional-commits.md) format
- [ ] Commit types accurately reflect changes:
  - `feat:` for new features (triggers MINOR bump)
  - `fix:` for bug fixes (triggers PATCH bump)
  - `docs:` for documentation (no release)
  - `chore:` for maintenance (no release)
  - Breaking changes marked with `!` or `BREAKING CHANGE:` footer

```bash
# Examples of proper commit messages
feat(button): add outline variant
fix(dialog): resolve focus trap on mobile
docs: update theming guide
feat(input)!: change default size prop value

BREAKING CHANGE: Default size is now "md" instead of "default"
```

### 2. Green CI

- [ ] All CI checks pass:
  - Lint (`bun run lint`)
  - Test (`bun run test`)
  - Build (`bun run build`)

### 3. Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings/errors
- [ ] New components follow [Component Addition Checklist](./component-addition-checklist.md)
- [ ] Stories added for new/modified components

## Version Bump Reference

| Commit Type | Example | Version Bump | From → To |
| ----------- | ------- | ------------ | --------- |
| `feat:` | `feat(card): add hover effect` | MINOR | 1.2.0 → 1.3.0 |
| `fix:` | `fix(button): correct padding` | PATCH | 1.2.0 → 1.2.1 |
| `perf:` | `perf(dialog): optimize renders` | PATCH | 1.2.0 → 1.2.1 |
| `refactor:` | `refactor(utils): simplify cn` | PATCH | 1.2.0 → 1.2.1 |
| `feat!:` or `BREAKING CHANGE:` | `feat!: rename props` | MAJOR | 1.2.0 → 2.0.0 |
| `docs:`, `chore:`, `ci:`, `test:` | `docs: update readme` | None | No release |

## Monitoring Releases

### Check Release Status

1. Go to **Actions** tab in GitHub
2. Find the latest `CI` workflow run on `main`
3. Check the `release` job status

### Verify Published Package

After a successful release:

```bash
# Check latest version on npm
npm view @kenshinx/ui version

# Check all published versions
npm view @kenshinx/ui versions
```

### Check GitHub Releases

Navigate to **Releases** in the GitHub repository to see:
- Version number
- Generated changelog
- Release notes from commits

## Troubleshooting

### No Release Published

**Possible causes:**

1. **No releasable commits** - Only `feat`, `fix`, `perf`, `refactor` trigger releases
   ```bash
   # These won't trigger a release
   docs: update readme
   chore: update dependencies
   test: add unit tests
   ```

2. **Invalid commit format** - Commits don't follow conventional format
   ```bash
   # Invalid - won't be recognized
   added new button variant
   Fixed the bug
   
   # Valid
   feat(button): add new variant
   fix(button): resolve rendering issue
   ```

3. **CI failure** - Check if lint/test/build failed before release step

### Release Failed

1. Check CI logs for specific error
2. Common issues:
   - npm token expired or invalid
   - Package name already taken
   - Network timeout

### Manual Release (Emergency Only)

If automated release fails and you need to publish urgently:

```bash
# Only use if automated release is broken!
cd packages/ui
bun run build
npm publish --access public
```

**Note:** Manual releases bypass changelog generation and GitHub releases. Fix the automation as soon as possible.

## Dry Run Testing

Test what semantic-release would do without publishing:

```bash
bun run release:dry-run
```

This shows:
- Which version would be released
- What commits would be included
- What changelog would be generated

## Release Configuration

The release process is configured in:

- **Workflow:** `.github/workflows/ci.yml`
- **semantic-release:** `.releaserc.json`
- **Commit validation:** `commitlint.config.js`

## Quick Checklist

Before merging to `main`:

- [ ] Commits follow conventional format
- [ ] CI is green (lint, test, build)
- [ ] New components have stories
- [ ] Breaking changes are marked

After merge:

- [ ] Check Actions tab for release status
- [ ] Verify new version on npm (if releasable commits)
- [ ] Check GitHub releases for changelog
