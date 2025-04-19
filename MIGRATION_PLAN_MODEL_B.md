# Next.js Migration Plan - MODEL B (Components & Routing)

## Overview
This plan focuses on migrating React components, implementing Next.js routing, handling GSAP animations, and optimizing the codebase for Next.js. These tasks are separate from Model A's structural changes to prevent conflicts.

## Completed Tasks (Reference)
- [x] Updated package.json (removed Vitest, updated project name)
- [x] Created Next.js project structure (app directory)
- [x] Created root layout.tsx with metadata 
- [x] Created page.tsx with client component wrapper
- [x] Updated tsconfig.json for Next.js
- [x] Created next.config.js
- [x] Updated vercel.json (removed SPA rewrites)

## Your Tasks (Model B)

### Task B1: Create GSAP Initialization Component
- **Description**: Create a dedicated client component for initializing GSAP
- **Specific Steps**:
  1. Create a file `/app/components/providers/GSAPProvider.tsx`
  2. Add the 'use client' directive at the top
  3. Create a component that initializes GSAP and registers plugins
  4. Example implementation:
     ```tsx
     'use client'
     
     import { ReactNode, useEffect } from 'react'
     import { gsap } from 'gsap'
     import { ScrollTrigger } from 'gsap/ScrollTrigger'
     
     export function GSAPProvider({ children }: { children: ReactNode }) {
       useEffect(() => {
         // Register GSAP plugins
         gsap.registerPlugin(ScrollTrigger)
         
         // Configure GSAP
         ScrollTrigger.config({
           ignoreMobileResize: true,
         })
         
         return () => {
           // Clean up ScrollTrigger on unmount
           ScrollTrigger.getAll().forEach(trigger => trigger.kill(false))
         }
       }, [])
       
       return <>{children}</>
     }
     ```
  5. Update `app/layout.tsx` to include this provider
  6. Ensure the provider is added inside ThemeProvider but outside other components

### Task B2: Create Image Utilities for Next.js
- **Description**: Create utilities for handling images with Next.js Image component
- **Specific Steps**:
  1. Create a file `/app/lib/image-utils.ts`
  2. Implement utilities to work with Next.js Image components
  3. Example implementation:
     ```tsx
     import { StaticImageData } from 'next/image'
     
     // Map to store preloaded images
     const imageCache = new Map<string, StaticImageData>()
     
     export function registerImage(key: string, image: StaticImageData) {
       imageCache.set(key, image)
     }
     
     export function getImage(key: string): StaticImageData | undefined {
       return imageCache.get(key)
     }
     
     export function getImagePath(key: string): string {
       const image = imageCache.get(key)
       return image ? image.src : `/images/${key}`
     }
     ```
  4. Create a component wrapper for Next.js Image in `/app/components/ui/NextImage.tsx`
  5. Use this component to standardize image handling across the application

### Task B3: Create Page Components
- **Description**: Create Next.js page components for each route in the current router
- **Specific Steps**:
  1. Examine `src/router.tsx` to identify all routes
  2. For each route:
     - Create a corresponding directory in the app folder
     - Create a `page.tsx` file in that directory
     - Add the 'use client' directive if the page uses client-side features
  3. Example directory structure based on common routes:
     ```
     /app
       /page.tsx (already created - home page)
       /about
         /page.tsx
       /courses
         /page.tsx
         /[courseId]
           /page.tsx
     ```
  4. For each page component:
     - Import the corresponding component from the src directory
     - Wrap with any necessary providers
     - Add metadata export if needed
  5. Example page implementation:
     ```tsx
     'use client'
     
     import { CourseDetail } from '@/components/CourseDetail'
     import { useParams } from 'next/navigation'
     
     export default function CourseDetailPage() {
       const { courseId } = useParams()
       return <CourseDetail id={courseId as string} />
     }
     ```

### Task B4: Update Navigation Components
- **Description**: Update navigation to use Next.js Link component
- **Specific Steps**:
  1. Locate all navigation components (navbar, sidebar, footer links, etc.)
  2. For each component:
     - Import Link from 'next/link'
     - Replace `<a href="...">` with `<Link href="...">`
  3. Example conversion:
     ```tsx
     // Before
     <a href="/courses" className="nav-link">Courses</a>
     
     // After
     import Link from 'next/link'
     
     <Link href="/courses" className="nav-link">Courses</Link>
     ```
  4. For programmatic navigation:
     - Import useRouter from 'next/navigation'
     - Replace any history.push() or similar with router.push()
  5. Example:
     ```tsx
     // Before
     const handleClick = () => {
       history.push(`/courses/${id}`)
     }
     
     // After
     import { useRouter } from 'next/navigation'
     
     const router = useRouter()
     const handleClick = () => {
       router.push(`/courses/${id}`)
     }
     ```

### Task B5: Fix GSAP Animations
- **Description**: Update GSAP animations to work properly with Next.js
- **Specific Steps**:
  1. Locate all files using GSAP animations
  2. For each file:
     - Add 'use client' directive at the top
     - Import useGSAP from '@gsap/react'
     - Replace direct GSAP calls in useEffect with useGSAP
  3. Example conversion:
     ```tsx
     // Before
     useEffect(() => {
       const ctx = gsap.context(() => {
         gsap.to('.element', { opacity: 1, duration: 1 })
       }, containerRef)
       
       return () => ctx.revert()
     }, [])
     
     // After
     import { useGSAP } from '@gsap/react'
     
     useGSAP(() => {
       gsap.to('.element', { opacity: 1, duration: 1 })
     }, { scope: containerRef })
     ```
  4. Ensure all GSAP animations have proper cleanup
  5. Add window checks for server-side rendering compatibility:
     ```tsx
     if (typeof window !== 'undefined') {
       // GSAP code here
     }
     ```

### Task B6: Optimize Image Components
- **Description**: Replace standard img tags with Next.js Image components
- **Specific Steps**:
  1. Locate all components using `<img>` tags
  2. For each image:
     - Import Image from 'next/image'
     - Replace `<img>` with `<Image>`
     - Add required width, height, and alt attributes
  3. Example conversion:
     ```tsx
     // Before
     <img src="/path/to/image.jpg" alt="Description" className="my-image" />
     
     // After
     import Image from 'next/image'
     
     <Image 
       src="/path/to/image.jpg" 
       width={500} 
       height={300} 
       alt="Description" 
       className="my-image"
     />
     ```
  4. For dynamic images, use the imageCache utility created earlier
  5. For background images in CSS, keep using CSS but optimize the images

### Task B7: Fix Client-Side Only Code
- **Description**: Identify and fix code that can only run on the client
- **Specific Steps**:
  1. Search for code that accesses browser-only APIs:
     - `window`, `document`, `localStorage`, etc.
     - Direct DOM manipulation
     - Browser-specific APIs
  2. For each instance:
     - Add 'use client' directive to the file if it's not already there
     - Wrap the code in a check for window:
       ```tsx
       if (typeof window !== 'undefined') {
         // Browser-only code here
       }
       ```
     - Or move the code into a useEffect:
       ```tsx
       useEffect(() => {
         // Browser-only code here
       }, [])
       ```
  3. For components that must be client-side:
     - Create a wrapper component with 'use client' directive
     - Import the original component and export it

### Task B8: Create Dynamic Client Components
- **Description**: Optimize components for server/client rendering
- **Specific Steps**:
  1. Identify components that need to render on the client side
  2. For each component, create a dynamically imported version:
     ```tsx
     // In /app/components/dynamic.ts
     import dynamic from 'next/dynamic'
     
     export const DynamicHeader = dynamic(
       () => import('@/components/Header'),
       { ssr: false }
     )
     
     export const DynamicChart = dynamic(
       () => import('@/components/Chart'),
       { 
         ssr: false,
         loading: () => <div>Loading chart...</div>
       }
     )
     ```
  3. Use these dynamic components in your page components
  4. Consider adding a Suspense boundary around dynamic components:
     ```tsx
     import { Suspense } from 'react'
     import { DynamicChart } from '@/components/dynamic'
     
     export default function AnalyticsPage() {
       return (
         <div>
           <h1>Analytics</h1>
           <Suspense fallback={<div>Loading...</div>}>
             <DynamicChart />
           </Suspense>
         </div>
       )
     }
     ```

## Notes for Model B
- Focus exclusively on components, routing, and client-side optimizations
- Do not modify files that Model A is working on (API routes, configuration files, etc.)
- Add 'use client' directive to all component files that use client-side features
- All your work should be in `/app` directories and component files
- Create a clear separation between server and client components
- If you encounter any uncertainties or issues, document them clearly 