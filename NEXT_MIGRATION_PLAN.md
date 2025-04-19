# Next.js Migration Plan

## Completed Tasks
- [x] Updated package.json (removed Vitest, updated project name)
- [x] Created Next.js project structure (app directory)
- [x] Created root layout.tsx with metadata 
- [x] Created page.tsx with client component wrapper
- [x] Updated tsconfig.json for Next.js
- [x] Created next.config.js
- [x] Updated vercel.json (removed SPA rewrites)

## Remaining Tasks

### Priority 1: Core Structure
- [ ] Move static files from `/` to `/public` directory
- [ ] Update image imports to use Next.js Image component
- [ ] Create a Next.js API route folder structure for `/api`
- [ ] Move content from src/main.tsx to appropriate Next.js files
- [ ] Update all imports in the codebase to reflect new structure
- [ ] Fix GSAP initialization for Next.js

### Priority 2: Remove Vite-specific Files and Code
- [ ] Delete vite.config.ts
- [ ] Delete vite-schema-plugin.js
- [ ] Delete index.html
- [ ] Delete tsconfig.node.json
- [ ] Delete vite-env.d.ts
- [ ] Refactor any vite-specific environment variable usage to Next.js

### Priority 3: Routing Updates
- [ ] Refactor src/router.tsx to use Next.js App Router
- [ ] Create appropriate page components in the app directory
- [ ] Update any navigation components to use Next.js Link component

### Priority 4: Code and Component Optimization
- [ ] Update GSAP initialization to work properly with Next.js
- [ ] Fix theme detection for server components
- [ ] Implement optimized image loading with Next.js Image
- [ ] Refactor any imperative DOM manipulation to be Next.js friendly

### Priority 5: Testing and Deployment
- [ ] Test the application thoroughly for regressions
- [ ] Update all environment variables for Vercel deployment
- [ ] Create proper .env.local and .env.production files
- [ ] Update deployment scripts and configuration

## Notes
- The codebase was already using Next.js for some aspects, but had a mix of Vite configurations
- The GSAP animations need special attention to work with Next.js's server components
- Some components might need 'use client' directives
- Existing CSS handling seems to be compatible with Next.js 