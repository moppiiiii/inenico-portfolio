# Suggested Commands

## Development

```bash
# Start development server (uses Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Linting & Formatting

```bash
# Check code with Biome
pnpm lint:biome

# Auto-fix with Biome (formatting + linting)
pnpm fix:biome

# Run all linters
pnpm lint
```

## Type Checking

```bash
# TypeScript type check (no output)
npx tsc --noEmit
```

## Code Quality

```bash
# Check for unused files/exports
pnpm knip
```

## Cloudflare Deployment

```bash
# Local preview on Cloudflare runtime
pnpm preview

# Deploy to Cloudflare Workers
pnpm deploy

# Build and upload without deploying
pnpm upload

# Generate Cloudflare types
pnpm cf-typegen
```

## Security

```bash
# Audit packages for vulnerabilities
pnpm audit
```

## Git Hooks (Automated via Lefthook)

These run automatically:
- **Pre-commit**: Biome check, TypeScript check, Knip
- **Pre-push**: pnpm audit
- **Commit-msg**: commitlint validation

## System Utilities (macOS/Darwin)

```bash
# Common commands
git status/add/commit/push
ls -la
cd <directory>
grep -r "pattern" .
find . -name "*.tsx"
```
