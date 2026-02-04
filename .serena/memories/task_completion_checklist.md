# Task Completion Checklist

When a coding task is completed, ensure the following steps are done:

## 1. Code Quality Checks

### Run Biome (Required)
```bash
pnpm fix:biome
```
This will:
- Format code (indentation, quotes, etc.)
- Organize imports automatically
- Fix auto-fixable lint issues

### Run TypeScript Check (Required)
```bash
npx tsc --noEmit
```
Ensure no type errors exist.

### Run Knip (Recommended)
```bash
pnpm knip
```
Check for unused files, exports, or dependencies.

## 2. Testing

Currently no test framework is configured. Manual testing via:
```bash
pnpm dev
```

## 3. Build Verification

For production changes, verify the build:
```bash
pnpm build
```

For Cloudflare-specific changes:
```bash
pnpm preview
```

## 4. Commit Message Format

Use conventional commits. Allowed types:
- `feat` / `feature` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance
- `ci` - CI/CD changes
- `perf` - Performance improvements
- `build` - Build system changes
- `delete` - Removing code/files
- `wip` - Work in progress

Example:
```bash
git commit -m "feat: add new contact form validation"
```

## 5. Pre-commit Hooks (Automatic)

Lefthook will automatically run on commit:
- Biome check with auto-fix
- TypeScript type checking
- Knip unused code detection

## 6. Pre-push Hooks (Automatic)

On push, Lefthook runs:
- `pnpm audit` for security vulnerabilities
