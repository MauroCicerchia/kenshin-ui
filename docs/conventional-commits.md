# Conventional Commits Guide

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation via [semantic-release](https://semantic-release.gitbook.io/).

## Commit Message Format

Each commit message must follow this format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Examples

```bash
# Feature (triggers MINOR version bump)
feat(button): add loading state variant

# Bug fix (triggers PATCH version bump)
fix(dialog): resolve focus trap issue on mobile

# Documentation (no version bump)
docs: update theming guide

# Chore (no version bump)
chore(deps): update dependencies

# Breaking change (triggers MAJOR version bump)
feat(card)!: rename variant prop to appearance

BREAKING CHANGE: The `variant` prop has been renamed to `appearance`.
```

## Commit Types

| Type       | Description                                          | Version Bump |
| ---------- | ---------------------------------------------------- | ------------ |
| `feat`     | A new feature                                        | Minor        |
| `fix`      | A bug fix                                            | Patch        |
| `perf`     | A performance improvement                            | Patch        |
| `refactor` | Code change that neither fixes a bug nor adds a feature | Patch     |
| `docs`     | Documentation only changes                           | None         |
| `style`    | Code style changes (formatting, etc.)                | None         |
| `test`     | Adding or updating tests                             | None         |
| `build`    | Build system or external dependency changes          | None         |
| `ci`       | CI configuration changes                             | None         |
| `chore`    | Other maintenance tasks                              | None         |
| `revert`   | Reverting a previous commit                          | Varies       |

## Breaking Changes

To indicate a breaking change, either:

1. Add `!` after the type/scope:
   ```
   feat(api)!: change response format
   ```

2. Include `BREAKING CHANGE:` in the footer:
   ```
   feat(api): change response format

   BREAKING CHANGE: Response now returns an object instead of array.
   ```

Breaking changes trigger a **MAJOR** version bump.

## Scope (Optional)

The scope provides additional context about what part of the codebase is affected:

- `button`, `card`, `dialog`, etc. - Component names
- `deps` - Dependencies
- `build` - Build system
- `ci` - CI/CD

## Local Validation

Commits are validated locally using [commitlint](https://commitlint.js.org/) via a git hook. If your commit message doesn't follow the format, the commit will be rejected.

### Bypassing Validation (Not Recommended)

In rare cases, you can bypass the hook:

```bash
git commit --no-verify -m "your message"
```

**Note:** Commits that don't follow the format will still be rejected by CI on pull requests.

## Automated Releases

When commits are merged to `main`:

1. **semantic-release** analyzes commit messages
2. Determines the appropriate version bump
3. Generates release notes from commit messages
4. Publishes to npm
5. Creates a GitHub release

This means your commit messages directly impact the changelog and version number!

## Tips

- Keep subjects under 72 characters
- Use present tense ("add feature" not "added feature")
- Use lowercase for the subject
- Don't end the subject with a period
- Be descriptive but concise
