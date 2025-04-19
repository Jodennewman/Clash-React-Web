# Next.js Migration - Integration Notes

This document provides guidance for integrating the work from Model A (Structure & Organization) and Model B (Components & Routing) for the Next.js migration.

## Migration Status

### Model A Progress Tracking

**Responsibilities**: Structure, organization, API routes, static files, and deployment

<details>
<summary><b>Click to view/edit Model A progress</b></summary>

<!-- MODEL A TEAM: Please update this section with your progress -->

#### Completed Tasks
- [ ] Moving static files to /public
- [ ] API routes conversion 
- [ ] Vite cleanup
- [ ] Environment configuration
- [ ] Directory structure setup
- [ ] Deployment configuration

#### In Progress
- [ ] List any tasks currently in progress

#### Blockers
- [ ] List any blockers or issues

#### Notes
- Add any relevant notes or details about your implementation

</details>

### Model B Progress Tracking

**Responsibilities**: Components, routing, GSAP animations, and client-side code

<details>
<summary><b>Click to view Model B progress</b></summary>

#### Completed Tasks
- [x] Create GSAP Initialization Component
- [x] Create Image Utilities for Next.js
- [x] Create Page Components for all routes
- [x] Update Navigation Components
- [x] Fix GSAP Animations
- [x] Optimize Image Components
- [x] Fix Client-Side Only Code
- [x] Create Dynamic Client Components

#### Notes
- See MODEL_B_PROGRESS.md for detailed implementation information
- All tasks are complete for Model B
- Ready for integration with Model A's work

</details>

## Integration Points

### Directory Structure

The final structure should integrate both models:

```
/app                  # Next.js app directory (Model B)
  /api                # API routes (Model A)
  /components         # UI components (Model B)
  /lib                # Utility functions (Model B)
  /[routes]           # Page routes (Model B)
  layout.tsx          # Root layout (Model B)
  page.tsx            # Home page (Model B)

/public               # Static assets (Model A)
  /assets             # Moved from src/assets (Model A)
  /components         # Component assets (Model A)
  /favicons           # Favicon files (Model A)

/src                  # Original source code
  # Still needed for transitional period
```

### Key Files to Coordinate

1. **Configuration Files**:
   - `next.config.js` (Model A)
   - `tsconfig.json` (Model A)
   - `package.json` (Model A)
   - `vercel.json` (Model A)

2. **Static Assets**:
   - Image references in components (Model B)
   - Public file paths (Model A)

3. **API Routes**:
   - API implementation (Model A)
   - API usage in components (Model B)

4. **Environment Variables**:
   - `.env` configuration (Model A)
   - Usage in components (Model B)

## Integration Process

1. **Merge Directory Structure**:
   - Verify no conflicts in `/app` structure
   - Ensure correct static asset paths in `/public`

2. **Test Page Routing**:
   - Verify all routes render correctly
   - Check for 404 handling
   - Test navigation between pages

3. **Test API Routes**:
   - Verify API endpoints work
   - Test API calls from components
   - Check error handling

4. **Test Static Assets**:
   - Verify correct image paths
   - Check for missing assets
   - Test responsiveness of images

5. **Deployment Testing**:
   - Test build process
   - Verify deployment configuration
   - Test on staging environment

## Common Issues & Solutions

### Image Path References

**Issue**: Components may reference old image paths.
**Solution**: Use the new `OptimizedImage` components from Model B that integrate with Next.js Image.

### GSAP Animation Issues

**Issue**: GSAP animations may not work correctly after integration.
**Solution**: Use the `GSAPProvider` and animation utilities from Model B.

### API Route Formats

**Issue**: Next.js API routes use a different format than Express routes.
**Solution**: Adapt API calls in components to match the new route format.

### Client-Side Code in Server Components

**Issue**: Browser-only code may cause errors in server components.
**Solution**: Use the `client-utils.ts` helpers and 'use client' directive.

## Final Verification Checklist

- [ ] All routes render correctly
- [ ] All animations work as expected
- [ ] All images load properly
- [ ] API calls function correctly
- [ ] No console errors
- [ ] Mobile responsiveness maintained
- [ ] Build process completes successfully
- [ ] Deployment works on staging environment

## Contact Points

- **Model A Coordinator**: TBD
- **Model B Coordinator**: TBD

For any integration issues, document them clearly and communicate with both coordinators to resolve.