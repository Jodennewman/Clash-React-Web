# Detailed Next.js Migration Plan

## Completed Tasks
- [x] Updated package.json (removed Vitest, updated project name)
- [x] Created Next.js project structure (app directory)
- [x] Created root layout.tsx with metadata 
- [x] Created page.tsx with client component wrapper
- [x] Updated tsconfig.json for Next.js
- [x] Created next.config.js
- [x] Updated vercel.json (removed SPA rewrites)

## Remaining Tasks - Highly Detailed

### Priority 1: Core Structure

#### 1.1 Move Static Files to Public Directory
- **Description**: Move all static assets from root to the public directory
- **Files to Move**:
  - `/vs-logo-icon.svg` → `/public/vs-logo-icon.svg`
  - `/vs-og-image.png` → `/public/vs-og-image.png`
  - `/vs-twitter-card.png` → `/public/vs-twitter-card.png`
  - Any other image/font/static files in root
- **Required Updates**:
  - Update references in layout.tsx and other files to use the /public path

#### 1.2 Update Image Imports for Next.js Image Component
- **Description**: Replace standard img tags with Next.js Image component
- **Steps**:
  - Import Image from 'next/image'
  - Replace `<img src="..." />` with `<Image src="..." width={X} height={Y} alt="..." />`
  - Ensure all images have width, height, and alt attributes
  - Update any dynamic image imports to work with Next.js

#### 1.3 Create Next.js API Routes
- **Description**: Replace Vite API handlers with Next.js API routes
- **Steps**:
  - Create `/app/api` directory
  - Move API handlers from src/api to appropriate files in /app/api
  - For each API endpoint, create a route.ts file with the appropriate handler
  - Example: Move `crmIntegrationHandler` to `/app/api/crm-integration/route.ts`

#### 1.4 Move Content from src/main.tsx
- **Description**: Move initialization code to appropriate Next.js files
- **Steps**:
  - Move GSAPPlugin registrations to a client component in the /app directory
  - Move theme provider setup to layout.tsx (already done)
  - Move image mappers to a utility that can be imported where needed

#### 1.5 Update All Imports
- **Description**: Update import paths to reflect the new structure
- **Steps**:
  - Update any absolute paths to use the '@/' alias
  - Fix any imports that reference files that have moved
  - Ensure paths are compatible with Next.js module resolution

#### 1.6 Fix GSAP Initialization for Next.js
- **Description**: Properly initialize GSAP in the Next.js environment
- **Steps**:
  - Create a dedicated GSAP initialization component with 'use client'
  - Move GSAP registration to this component
  - Make sure ScrollTrigger is properly imported and configured
  - Handle SSR compatibility by checking for window object

### Priority 2: Remove Vite-specific Files and Code

#### 2.1 Delete Vite Configuration Files
- **Description**: Remove all Vite-specific configuration files
- **Files to Delete**:
  - vite.config.ts
  - vite-schema-plugin.js
  - index.html
  - tsconfig.node.json
  - vite-env.d.ts
  - .vite-pid
  - browser-sync-config.js (if used with Vite)

#### 2.2 Refactor Environment Variables
- **Description**: Update environment variable usage to Next.js format
- **Steps**:
  - Replace `import.meta.env.XXXX` with `process.env.XXXX`
  - Create `.env.local` file for local development
  - Update any environment variable documentation
  - Ensure environment variables are prefixed with `NEXT_PUBLIC_` if used client-side

### Priority 3: Routing Updates

#### 3.1 Refactor Router to Next.js App Router
- **Description**: Replace custom router implementation with Next.js App Router
- **Steps**:
  - Identify all routes in `src/router.tsx`
  - For each route, create a corresponding file in the app directory structure
  - Example: `/about` route becomes `/app/about/page.tsx`
  - Update any dynamic routes to use Next.js parameter syntax

#### 3.2 Create Page Components
- **Description**: Create page components for each route
- **Steps**:
  - Create appropriate directory structure in `/app`
  - Create `page.tsx` files in each directory
  - Add 'use client' directive to client components
  - Move relevant component code from src components

#### 3.3 Update Navigation Components
- **Description**: Update navigation to use Next.js Link
- **Steps**:
  - Import Link from 'next/link'
  - Replace `<a href="...">` with `<Link href="...">`
  - Update onClick handlers that change routes to use router.push
  - Fix any dynamic route generation

### Priority 4: Code and Component Optimization

#### 4.1 Update GSAP for Next.js
- **Description**: Ensure GSAP works correctly with Next.js SSR
- **Steps**:
  - Use `@gsap/react` package for React integration
  - Use useGSAP hook for all animations
  - Ensure all GSAP code is in client components
  - Add proper cleanup for all animations

#### 4.2 Fix Theme Detection
- **Description**: Ensure theme detection works with SSR
- **Steps**:
  - Use next-themes correctly in provider component
  - Ensure no theme flickering on initial load
  - Check for any direct DOM manipulation related to themes

#### 4.3 Optimize Images
- **Description**: Use Next.js Image optimization
- **Steps**:
  - Update Image components with appropriate props
  - Configure next.config.js with correct image domains
  - Test image loading performance

#### 4.4 Refactor DOM Manipulation
- **Description**: Fix any direct DOM manipulation that's incompatible with Next.js
- **Steps**:
  - Search for getElementById, querySelector, etc.
  - Replace with useRef where appropriate
  - Ensure all DOM manipulation is in client components
  - Use useEffect for any initialization that requires the DOM

### Priority 5: Testing and Deployment

#### 5.1 Test Application
- **Description**: Thoroughly test for regressions
- **Steps**:
  - Test all pages and features
  - Check for SSR-related issues
  - Verify all animations and interactions work
  - Test on multiple browsers and devices

#### 5.2 Update Deployment Configuration
- **Description**: Configure for Vercel deployment
- **Steps**:
  - Update vercel.json if needed
  - Create appropriate .env files
  - Set up build scripts and hooks
  - Configure any needed redirects or rewrites

## Notes
- The codebase was already using Next.js for some aspects, but had a mix of Vite configurations
- The GSAP animations need special attention to work with Next.js's server components
- Some components might need 'use client' directives
- Existing CSS handling seems to be compatible with Next.js
