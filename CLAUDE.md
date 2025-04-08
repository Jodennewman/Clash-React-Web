# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `npm run dev` - Start development server (may freeze Claude, use alternatives)
- `npm run build` - Build production version
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `vitest component-name.test.tsx` - Run specific test file

## Code Style & Conventions
- Use theme-aware utility classes for all styling (e.g., `text-theme-primary`, `bg-theme-accent`)
- Never use competing light/dark mode styles - use theme variables
- All animations must use `useGSAP` with proper cleanup
- Follow cubic-bezier(0.34, 1.56, 0.64, 1) for "VS Bubbly" hover effects
- For Git: use `git add .` and commit with prefix (TeamSection, Solo, A, B)

## Documentation Order
1. Read this CLAUDE.md completely
2. Read `src/app/globals.css` completely 
3. Read `VS_STYLING_GUIDE.md` completely
4. Read `VS_COLOR_IMPLEMENTATION.md` completely
5. Read `THEME_SYSTEM.md` completely
6. Read `THEME_IMPLEMENTATION_SUMMARY.md` completely

## Key Theme Implementation Rules
- ALWAYS use theme utility classes when available
- ALWAYS use theme-aware gradient classes
- ALWAYS test components in both light and dark modes
- NEVER use raw Tailwind color classes without theme awareness
- NEVER use standard Tailwind gradients - use theme-aware variables