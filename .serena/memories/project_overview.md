# inenico-portfolio Project Overview

## Purpose
Personal portfolio website for "inenico" (いねにこ), a Frontend Developer. The site showcases work, skills, and contact information with modern animations and glassmorphic design.

## Tech Stack
- **Framework**: Next.js 15.5 (App Router) with React 19
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- **Styling**: Tailwind CSS 4 with custom OKLCH color tokens
- **Animations**: Framer Motion + custom CSS animations (inenico-* keyframes)
- **Package Manager**: pnpm (version 10.28.1)
- **Linting/Formatting**: Biome (NOT ESLint/Prettier)
- **Git Hooks**: Lefthook
- **Type Checking**: TypeScript with strict mode

## Key Dependencies
- `next`: 15.5.9
- `react`: 19.1.4
- `framer-motion`: ^12.28.1
- `lucide-react`: ^0.562.0
- `@opennextjs/cloudflare`: ^1.14.4

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout (Geist fonts, metadata)
│   ├── page.tsx             # Home page
│   ├── globals.css          # Tailwind, theme tokens, animations
│   ├── about/page.tsx       # About page
│   ├── works/page.tsx       # Portfolio works
│   └── contact/page.tsx     # Contact page
└── components/
    ├── site-nav.tsx         # Main navigation
    ├── page-transition.tsx  # Route transition animations
    ├── static-background.tsx    # Base background layer
    ├── enhanced-background.tsx  # Animated background with particles
    ├── animated-background.tsx  # Internal animated component
    ├── creative-nav.tsx     # Creative navigation variant
    └── x-icon.tsx           # X (Twitter) icon
```

## Path Alias
`@/*` maps to `./src/*`

## Metadata
Base URL: `https://portfolio.inenico.dev`
