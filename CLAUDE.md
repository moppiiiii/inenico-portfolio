# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for "inenico" (いねにこ), a Frontend Developer. The site is built with Next.js 15 and deployed to Cloudflare Workers using OpenNext Cloudflare adapter. It features animated backgrounds, custom page transitions, and a modern glassmorphic design with OKLCH color system.

## Tech Stack

- **Framework**: Next.js 15.5 (App Router) with React 19
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- **Styling**: Tailwind CSS 4 with custom OKLCH color tokens
- **Animations**: Framer Motion + custom CSS animations (inenico-* keyframes)
- **Package Manager**: pnpm (version 10.28.1)
- **Linting/Formatting**: Biome (not ESLint/Prettier)
- **Git Hooks**: Lefthook for pre-commit and pre-push automation
- **Type Checking**: TypeScript with strict mode

## Development Commands

```bash
# Development server (uses Turbopack)
pnpm dev

# Build for production
pnpm build

# Lint with Biome
pnpm lint:biome

# Auto-fix with Biome
pnpm fix:biome

# Type checking (automatically runs in pre-commit hook)
npx tsc --noEmit

# Check for unused files/exports
pnpm knip

# Local Cloudflare preview (builds and runs on Cloudflare runtime)
pnpm preview

# Deploy to Cloudflare
pnpm deploy
```

## Code Quality Automation

The project uses Lefthook for git hooks:

- **Pre-commit**: Runs Biome formatting/linting, TypeScript type checking, and Knip (unused code detection)
- **Pre-push**: Runs `pnpm audit` for security vulnerabilities
- **Commit-msg**: Enforces conventional commits via commitlint

**Commit Message Format**: Follow conventional commits. Allowed types:
`feat`, `feature`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `build`, `delete`, `wip`

## Architecture

### App Structure

```
src/app/
├── layout.tsx          # Root layout with Geist fonts, metadata
├── page.tsx           # Home page
├── about/page.tsx     # About page
├── works/page.tsx     # Portfolio works page
├── contact/page.tsx   # Contact page
└── globals.css        # Tailwind imports, theme tokens, custom animations
```

### Component Architecture

**Background System** (layered rendering):
- `<StaticBackground />` - Base static background layer
- `<EnhancedBackground />` - Animated background with particle effects (uses `<AnimatedBackground />` internally)
- These components are stacked in pages using z-index layering

**Navigation**:
- `<SiteNav />` - Main navigation component used across all pages
- `<PageTransition />` - Wraps page content for route transition animations

**Key Pattern**: Pages compose layouts by stacking backgrounds, navigation, and content with z-index control:
```tsx
<StaticBackground />
<EnhancedBackground />
<SiteNav />
<div className="relative z-10">{/* page content */}</div>
```

### Styling System

**Color Tokens**: Uses OKLCH color space (better perceptual uniformity than HSL). All colors defined in `globals.css` as CSS custom properties (`--background`, `--foreground`, `--primary`, etc.) and mapped to Tailwind via `@theme inline`.

**Custom Animations**: Prefixed with `inenico-*` to avoid conflicts:
- `inenico-fade-in-up`, `inenico-fade-in-left`, `inenico-fade-in-right` - Entry animations
- `inenico-scale-in` - Scale entrance
- `inenico-float`, `inenico-float-small` - Floating effects
- `inenico-progress` - Progress bar animations

Applied via Tailwind classes with animation delays:
```tsx
className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_500ms_ease-out_both] motion-safe:[animation-delay:1100ms]"
```

**Design Pattern**: Glassmorphic UI with backdrop blur, semi-transparent cards, and border layering.

### Cloudflare Integration

**Next.js Config** (`next.config.ts`):
- Calls `initOpenNextCloudflareForDev()` to enable Cloudflare bindings in local development
- Cache headers configured for static assets (1 year immutable cache)

**OpenNext Config** (`open-next.config.ts`):
- R2 incremental cache is available but commented out (uncomment for production caching)

**Wrangler Config** (`wrangler.jsonc`):
- Worker name: `inenico-portfolio`
- Images binding enabled for Next.js Image optimization
- Self-reference service binding for caching support
- Observability enabled

**Path Alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json`)

## Important Notes

- **Biome, not Prettier/ESLint**: This project uses Biome exclusively. Do not add ESLint or Prettier configs.
- **Imports organization**: Biome automatically organizes imports on save/commit.
- **Quote style**: Use double quotes for JavaScript/TypeScript (enforced by Biome).
- **Animation considerations**: All animations use `motion-safe:` prefix to respect user preferences.
- **Font loading**: Geist and Geist Mono are loaded via `next/font/google` with variable fonts.
- **Metadata base**: Set to `https://portfolio.inenico.dev` for Open Graph images.
