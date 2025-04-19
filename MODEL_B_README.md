# Next.js Migration - Model B

This document provides an overview of the Model B migration for the Vertical Shortcut project. Model B focuses on components, routing, and client-side aspects of the migration.

## Directory Structure

```
/app
  /components
    /animation        # GSAP animations and wrappers
    /layout           # Layout components
    /providers        # App providers (GSAP, Theme)
    /ui               # UI components
    dynamic.ts        # Dynamic component imports
  /lib
    animation-presets.ts  # Animation presets
    client-utils.ts       # Browser API utilities
    gsap-utils.ts         # GSAP utilities
    image-utils.ts        # Image utilities
  /[routes]           # Next.js page routes
  layout.tsx          # Root layout
  not-found.tsx       # 404 page
  page.tsx            # Home page
```

## Key Components

### Animation System

- **GSAPProvider**: Initializes GSAP and registers plugins
- **AnimationWrapper**: Reusable animation component with ScrollTrigger
- **SmoothScroll**: ScrollSmoother implementation for Next.js
- **animation-presets.ts**: Common animation configurations

### Image Optimization

- **OptimizedImage**: Next.js Image wrapper with caching
- **ModuleThumbnail**: Specialized component for module thumbnails
- **CreatorAvatar**: Specialized component for creator avatars
- **image-utils.ts**: Integration with existing image mapping system

### Navigation

- **NextLayout**: Layout component with Next.js navigation
- **NextNavbar**: Navigation bar with Next.js Link components

### Client Utilities

- **client-utils.ts**: Safe browser API access
- **gsap-utils.ts**: GSAP helpers for Next.js
- **dynamic.ts**: Dynamic imports for client components

## Page Routing

All routes from the original router.tsx have been implemented as Next.js pages:

- Home (/)
- Application form (/application-form)
- Example components (/example)
- Marble buttons (/marble-buttons)
- Modals showcase (/modals)
- Pain points section (/painpoints)
- Charts section (/charts)
- Calendly integration (/calendly)
- Style guide (/style-guide)
- Qualification modals (/qualification, /tia-qualification)
- Module HUD (/modulehud)
- Theme visualizer (/theme-visualizer)
- Connect everything section (/connect-everything)
- Debug page (/debug)
- 404 page (not-found.tsx)

## Migration Patterns

1. **Client Component Pattern**:
   ```tsx
   'use client'
   
   import { useEffect } from 'react'
   import { isBrowser } from '../lib/client-utils'
   
   export function ClientComponent() {
     useEffect(() => {
       if (!isBrowser()) return
       
       // Browser-only code here
     }, [])
     
     return <div>Client component</div>
   }
   ```

2. **Dynamic Import Pattern**:
   ```tsx
   // In dynamic.ts
   export const DynamicComponent = dynamic(
     () => import('../../src/components/Component'),
     { 
       ssr: false,
       loading: () => <div>Loading...</div>
     }
   )
   
   // In page.tsx
   import { Suspense } from 'react'
   import { DynamicComponent } from '../components/dynamic'
   
   export default function Page() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <DynamicComponent />
       </Suspense>
     )
   }
   ```

3. **GSAP Animation Pattern**:
   ```tsx
   'use client'
   
   import { useRef } from 'react'
   import { useGSAP } from '@gsap/react'
   import { gsap } from 'gsap'
   
   export function AnimatedComponent() {
     const containerRef = useRef(null)
     
     useGSAP(() => {
       gsap.from('.animated-element', { 
         opacity: 0, 
         y: 20,
         duration: 0.8
       })
     }, { scope: containerRef })
     
     return (
       <div ref={containerRef}>
         <div className="animated-element">Content</div>
       </div>
     )
   }
   ```

4. **Image Component Pattern**:
   ```tsx
   import { ModuleThumbnail } from '../components/ui/ImageOptimizer'
   
   export function CourseCard({ moduleId, title }) {
     return (
       <div className="card">
         <ModuleThumbnail 
           moduleId={moduleId} 
           alt={title}
           width={480}
           height={270}
           priority
         />
         <h3>{title}</h3>
       </div>
     )
   }
   ```

## Integration Notes

1. **Static Assets**: All static assets are now referenced from the public directory.
2. **Server Components**: Coordinate with Model A for server component integration.
3. **Environment Variables**: Next.js environment variables use a different format.
4. **API Routes**: API routes need to be tested with Next.js API route format.
5. **Deployment**: Next.js deployment configuration is handled by Model A.

## Testing

Test all components after integrating with Model A's changes. Verify that:

- All routes work correctly
- All animations function as expected
- Images load properly with Next.js Image optimization
- Client-side functionality works in the Next.js environment
- No console errors related to SSR incompatibilities