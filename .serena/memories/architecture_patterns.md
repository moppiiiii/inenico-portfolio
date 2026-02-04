# Architecture Patterns

## Next.js App Router Structure

This project uses Next.js 15 App Router with the following patterns:

### Route Structure
```
src/app/
├── layout.tsx     # Root layout (fonts, metadata, global providers)
├── page.tsx       # Home page (/)
├── about/page.tsx # About page (/about)
├── works/page.tsx # Works page (/works)
└── contact/page.tsx # Contact page (/contact)
```

### Root Layout Features
- Geist font family (variable fonts via next/font/google)
- Global metadata configuration
- CSS imports for Tailwind and animations

## Component Architecture

### Background System (Layered Rendering)
The site uses a layered background system for visual effects:

1. `<StaticBackground />` - Base static background layer
2. `<EnhancedBackground />` - Animated background with particle effects
   - Internally uses `<AnimatedBackground />`

### Page Composition Pattern
Each page follows this structure:
```tsx
export default function PageName() {
  return (
    <main>
      <StaticBackground />
      <EnhancedBackground />
      <SiteNav />
      <div className="relative z-10">
        {/* Page content */}
      </div>
    </main>
  );
}
```

### Navigation Components
- `<SiteNav />` - Primary navigation used across pages
- `<CreativeNav />` - Alternative creative navigation variant

### Page Transitions
- `<PageTransition />` - Wraps content for Framer Motion route animations

## Cloudflare Integration

### Configuration Files
- `next.config.ts` - Calls `initOpenNextCloudflareForDev()` for local dev
- `open-next.config.ts` - OpenNext configuration (R2 cache available)
- `wrangler.jsonc` - Worker configuration
  - Worker name: `inenico-portfolio`
  - Images binding for Next.js Image optimization
  - Service binding for caching

### Environment Types
- `cloudflare-env.d.ts` - Cloudflare environment type definitions

## Animation System

### Custom Keyframes (globals.css)
All animations prefixed with `inenico-*`:
- `inenico-fade-in-up` - Fade in from below
- `inenico-fade-in-left` - Fade in from left
- `inenico-fade-in-right` - Fade in from right
- `inenico-scale-in` - Scale up entrance
- `inenico-float` - Floating effect (20px)
- `inenico-float-small` - Small floating effect (15px)
- `inenico-progress` - Progress bar animation

### Usage with Accessibility
Always use `motion-safe:` prefix:
```tsx
className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_500ms_ease-out_both]"
```

## Color System

### OKLCH Color Space
Colors use OKLCH for better perceptual uniformity:
```css
--primary: oklch(0.7 0.12 180);
```

### Theme Tokens
Defined in `:root` and mapped to Tailwind via `@theme inline`:
- `--background`, `--foreground`
- `--primary`, `--secondary`, `--accent`
- `--card`, `--popover`, `--muted`
- `--border`, `--input`, `--ring`
