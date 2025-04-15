# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- `npm run dev`: Start development server (port 5173, 5174, or 5175)
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run typecheck`: Run TypeScript type checking
- `npm run lint`: Run ESLint checks
- `npm run format`: Format code with Prettier
- `npm test`: Run Vitest tests
- `npm test -- src/components/path/to/Component.test.tsx`: Run a single test file

## Code Style Guidelines
- **Imports**: Group imports by type (React, libraries, components, styles)
- **Naming**: Use PascalCase for components, camelCase for variables/functions
- **Formatting**: Project uses Prettier with 2-space indentation
- **Types**: Always use proper TypeScript types, avoid `any`
- **Theme Styling**: Always use theme-aware utility classes and variables (never raw colors)
- **CSS**: Use theme utility classes like `text-theme-primary`, `bg-theme-gradient`
- **Components**: Follow theme-aware design principles for all components
- **Git**: Use prefixed commit messages: `Solo: `, `A: `, or `B: ` based on your role

For detailed styling guidance, refer to VS_STYLING_GUIDE.md and THEME_SYSTEM.md.

## Current Priority
Component refactoring to match copy in Website-Copy-Guidance.md and ensure all components use course-utils.tsx for data.