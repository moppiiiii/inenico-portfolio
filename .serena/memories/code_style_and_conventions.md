# Code Style and Conventions

## Linter & Formatter
- **Tool**: Biome (NOT ESLint/Prettier)
- **Config**: `biome.json`

## JavaScript/TypeScript Style
- **Quote style**: Double quotes (`"`)
- **Indent style**: Spaces (2 spaces)
- **Import organization**: Automatic via Biome
- **Linter rules**: Biome recommended rules

## TypeScript Configuration
- **Target**: ES2024
- **Strict mode**: Enabled
- **Module resolution**: Bundler
- **Path alias**: `@/*` → `./src/*`

## Naming Conventions
- **Components**: PascalCase (e.g., `SiteNav`, `PageTransition`)
- **Files**: kebab-case (e.g., `site-nav.tsx`, `page-transition.tsx`)
- **CSS custom properties**: kebab-case with prefix (e.g., `--inenico-progress`)
- **Animations**: Prefixed with `inenico-*` to avoid conflicts

## Component Patterns
- Functional components with explicit types
- No class components
- Export default for page components
- Named exports for shared components

## Styling Conventions
- **Color system**: OKLCH color space (better perceptual uniformity)
- **Colors**: Defined as CSS custom properties in `globals.css`
- **Animation accessibility**: Use `motion-safe:` prefix for animations
- **Design pattern**: Glassmorphic UI with backdrop blur

### Animation Usage Example
```tsx
className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_500ms_ease-out_both] motion-safe:[animation-delay:1100ms]"
```

## Page Layout Pattern
Pages stack backgrounds with z-index layering:
```tsx
<StaticBackground />
<EnhancedBackground />
<SiteNav />
<div className="relative z-10">{/* page content */}</div>
```

## File Organization
- Pages in `src/app/` following Next.js App Router conventions
- Shared components in `src/components/`
- Global styles in `src/app/globals.css`
