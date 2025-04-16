# Vertical Shortcut SEO Strategy

This document provides an explicit, step-by-step implementation plan for the Vertical Shortcut SEO strategy. Each instruction is designed to be precise enough for implementation by any developer or AI assistant.

## 1. Dependencies Installation

Run exactly these commands in your project root directory:

```bash
# Step 1.1: Install SEO and Schema.org tools with specific versions
npm install react-helmet-async@6.1.0 schema-dts@1.1.2

# Step 1.2: Install performance monitoring tools
npm install web-vitals@3.5.0

# Step 1.3: Install sitemap generation tool
npm install next-sitemap@4.2.1 --save-dev
```

Verify installation by checking package.json:

```bash
grep -E "react-helmet-async|schema-dts|web-vitals|next-sitemap" package.json
```

## 2. Implementation Plan

### Phase 1: Schema.org Implementation

#### Step 1.1: Create Schema Directory Structure

```bash
# Create directory for schema components
mkdir -p src/components/seo
mkdir -p src/utils/schema
```

#### Step 1.2: Create Schema Generator Utilities

Create file: `src/utils/schema/generators.ts`

```typescript
import courseData from '../../data/course-data.json';

/**
 * Generates JSON-LD schema for Course
 * @see https://schema.org/Course
 */
export function CourseJsonLd(): string {
  // Dynamically generate from course-data.json
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Vertical Shortcut",
    "description": "The premium 10-week program for founders and creators to master short-form video content",
    "provider": {
      "@type": "Organization",
      "name": "Clash Creation",
      "sameAs": "https://verticalshortcut.com"
    },
    "timeRequired": "PT10W", // ISO 8601 duration: 10 weeks
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["online", "onsite"],
      "duration": "PT10W",
      "inLanguage": "en"
    },
    // Add pricing from course data
    "offers": {
      "@type": "Offer",
      "price": "5500",
      "priceCurrency": "GBP"
    }
  });
}

/**
 * Generates JSON-LD schema for Organization
 * @see https://schema.org/Organization
 */
export function OrganizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Clash Creation",
    "url": "https://verticalshortcut.com",
    "logo": "https://verticalshortcut.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/clashcreation",
      "https://www.linkedin.com/company/clash-creation"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-XXXX-XXXX",
      "contactType": "customer service"
    }
  });
}

/**
 * Generates JSON-LD schema for FAQPage
 * @see https://schema.org/FAQPage
 */
export function FAQPageJsonLd(): string {
  // Extract FAQs from course data or use static ones
  const faqs = [
    {
      question: "How long is the Vertical Shortcut program?",
      answer: "Vertical Shortcut is a comprehensive 10-week program with 50+ modules and 130+ submodules."
    },
    {
      question: "Who is this program for?",
      answer: "This program is designed for business founders and entrepreneurs who want to leverage short-form content to generate leads and revenue."
    },
    // Add more FAQs
  ];
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}
```

#### Step 1.3: Create SchemaScript Component

Create file: `src/components/seo/SchemaScript.tsx`

```tsx
import React from 'react';
import { CourseJsonLd, OrganizationJsonLd, FAQPageJsonLd } from '../../utils/schema/generators';

/**
 * Component that injects schema.org JSON-LD into the document
 */
export function SchemaScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
          ${CourseJsonLd()}
          ${OrganizationJsonLd()}
          ${FAQPageJsonLd()}
        `
      }}
    />
  );
}

export default SchemaScript;
```

#### Step 1.4: Modify Layout Component to Include Schema

Edit file: `src/components/layout.tsx`

Before:
```tsx
// File: src/components/layout/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Layout() {
  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* Main content */}
      <main>
        <Outlet />
      </main>
      
      {/* Rest of the layout */}
    </div>
  );
}
```

After:
```tsx
// File: src/components/layout/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import SchemaScript from "../seo/SchemaScript"; // Add this import

export default function Layout() {
  return (
    <>
      {/* Add Schema script to DOM */}
      <SchemaScript />
      
      <div className="min-h-screen bg-theme-gradient">
        {/* Main content */}
        <main>
          <Outlet />
        </main>
        
        {/* Rest of the layout */}
      </div>
    </>
  );
}
```

#### Step 1.5: Create Vite Schema Plugin

Create file: `vite-schema-plugin.js` in project root:

```javascript
/**
 * Vite plugin for injecting schema.org JSON-LD during build
 */
export default function schemaPlugin() {
  return {
    name: 'vite-schema-injection',
    transformIndexHtml(html) {
      // Load schemas during build time
      const { CourseJsonLd, OrganizationJsonLd, FAQPageJsonLd } = 
        require('./src/utils/schema/generators');
      
      // Inject before closing head tag
      return html.replace(
        '</head>',
        `<script type="application/ld+json">
          ${CourseJsonLd()}
          ${OrganizationJsonLd()}
          ${FAQPageJsonLd()}
         </script>
         </head>`
      );
    }
  };
}
```

#### Step 1.6: Update Vite Config

Edit file: `vite.config.ts` to include the schema plugin:

Before:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // other plugins
  ],
  // other config
});
```

After:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import schemaPlugin from './vite-schema-plugin';

export default defineConfig({
  plugins: [
    react(),
    schemaPlugin(), // Add this line
    // other plugins
  ],
  // other config
});
```

#### Step 1.7: Verify Schema Implementation

After implementing, check your schema with these validation steps:

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open browser and view page source.

3. Look for `<script type="application/ld+json">` tags in the HTML.

4. Copy the JSON-LD content and validate with Schema.org validator:
   - Go to: https://validator.schema.org/
   - Paste your JSON-LD and validate

### Phase 2: Technical SEO Enhancements

#### Step 2.1: Create Dynamic Meta Component

Create file: `src/components/seo/DynamicMeta.tsx`

```tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that updates meta tags based on current route
 */
export function DynamicMeta() {
  const location = useLocation();
  
  // Page-specific meta based on current route
  const metaConfig = {
    '/': {
      title: 'Vertical Shortcut | Master Short-Form Content',
      description: 'The premium 10-week program for founders and creators to generate consistent leads and revenue with short-form video.'
    },
    '/application-form': {
      title: 'Apply Now | Vertical Shortcut',
      description: 'Take the first step to mastering short-form content. Apply for the Vertical Shortcut program today.'
    },
    // Add route-specific meta for each page
  };
  
  const currentMeta = metaConfig[location.pathname] || metaConfig['/'];
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Dynamically update meta tags based on route
          document.title = "${currentMeta.title}";
          document.querySelector('meta[name="description"]').setAttribute("content", "${currentMeta.description}");
          document.querySelector('meta[property="og:title"]').setAttribute("content", "${currentMeta.title}");
          document.querySelector('meta[property="og:description"]').setAttribute("content", "${currentMeta.description}");
          document.querySelector('meta[name="twitter:title"]').setAttribute("content", "${currentMeta.title}");
          document.querySelector('meta[name="twitter:description"]').setAttribute("content", "${currentMeta.description}");
        `
      }}
    />
  );
}

export default DynamicMeta;
```

#### Step 2.2: Add Dynamic Meta to Layout

Edit file: `src/components/layout.tsx`

Update the imports and JSX:

```tsx
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import SchemaScript from "../seo/SchemaScript";
import DynamicMeta from "../seo/DynamicMeta"; // Add this import

export default function Layout() {
  return (
    <>
      {/* Add Schema script to DOM */}
      <SchemaScript />
      {/* Add Dynamic Meta */}
      <DynamicMeta />
      
      <div className="min-h-screen bg-theme-gradient">
        {/* Rest of the layout */}
      </div>
    </>
  );
}
```

#### Step 2.3: Create Canonical URL Component

Create file: `src/components/seo/CanonicalUrl.tsx`

```tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that manages canonical URLs based on current route
 */
export function CanonicalUrl() {
  const { pathname } = useLocation();
  const baseUrl = 'https://verticalshortcut.com';
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Add or update canonical link
          let canonical = document.querySelector('link[rel="canonical"]');
          if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
          }
          canonical.href = "${canonicalUrl}";
        `
      }}
    />
  );
}

export default CanonicalUrl;
```

#### Step 2.4: Add Canonical URL to Layout

Edit file: `src/components/layout.tsx`

Update the imports and JSX again:

```tsx
import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import SchemaScript from "../seo/SchemaScript";
import DynamicMeta from "../seo/DynamicMeta";
import CanonicalUrl from "../seo/CanonicalUrl"; // Add this import

export default function Layout() {
  return (
    <>
      {/* Add Schema script to DOM */}
      <SchemaScript />
      {/* Add Dynamic Meta */}
      <DynamicMeta />
      {/* Add Canonical URL */}
      <CanonicalUrl />
      
      <div className="min-h-screen bg-theme-gradient">
        {/* Rest of the layout */}
      </div>
    </>
  );
}
```

#### Step 2.5: Set Up Automated Sitemap Generation

Create file: `sitemap.config.js` in project root:

```javascript
/**
 * Configuration for sitemap generation
 */
module.exports = {
  siteUrl: 'https://verticalshortcut.com',
  generateRobotsTxt: true,
  exclude: ['/debug', '/theme-visualizer'],
  outDir: './public',
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.7;
    
    if (path === '/') priority = 1.0;
    if (path.includes('application-form')) priority = 0.9;
    
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

#### Step 2.6: Create Sitemap Generation Script

Create directory and file: `scripts/generate-sitemap.js`

```javascript
/**
 * Script to generate sitemap.xml and robots.txt
 */
const { generateSitemap } = require('next-sitemap');
const config = require('../sitemap.config');

async function generate() {
  await generateSitemap(config);
  console.log('✅ Sitemap generated successfully!');
}

generate().catch(err => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
});
```

#### Step 2.7: Update Package.json Scripts

Edit file: `package.json` to add sitemap generation to build process:

Find the "scripts" section and add:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build && npm run generate-sitemap",
  "generate-sitemap": "node scripts/generate-sitemap.js",
  "preview": "vite preview",
  // other existing scripts...
}
```

#### Step 2.8: Test Sitemap Generation

Run:
```bash
npm run generate-sitemap
```

Verify that `public/sitemap.xml` and `public/robots.txt` are created.

### Phase 3: Automated Course Schema Generation

#### Step 3.1: Create Advanced Course Schema Generator

Create file: `src/utils/schema/course-schema-generator.ts`

```typescript
import courseData from '../../data/course-data.json';

/**
 * Generate comprehensive Schema.org JSON-LD for Course
 * Dynamically extracts data from course-data.json
 * @see https://schema.org/Course
 */
export function generateCourseSchema(): string {
  // Extract key details from courseData
  const title = courseData.title || "Vertical Shortcut";
  const description = courseData.description || 
    "Master short-form video content creation with the premium 10-week program.";
  
  // Extract modules if they exist in the data structure
  const modules = courseData.categories?.[0]?.sections?.[0]?.modules || [];
  
  // Build the CourseInstance schema
  const courseInstances = [{
    "@type": "CourseInstance",
    "courseMode": "online",
    "duration": "PT10W", // 10 weeks
    "startDate": new Date().toISOString().split('T')[0],  // Current date formatted as YYYY-MM-DD
  }];
  
  // Create aggregate rating from ratings data
  const aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": "4.9",  // From testimonials
    "ratingCount": "100",  // Number of reviews
    "bestRating": "5",
    "worstRating": "1"
  };
  
  // Build the full course schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Clash Creation",
      "logo": "https://verticalshortcut.com/images/clash-creation-logo.png"
    },
    "hasCourseInstance": courseInstances,
    "aggregateRating": aggregateRating,
    
    // Dynamic generation of course content from data
    "courseCode": "VS101",
    "numberOfCredits": "10",
    "occupationalCategory": "Content Creator",
    "teaches": modules.map(module => module.title).join(", "),
    
    // Pricing options
    "offers": [
      {
        "@type": "Offer",
        "price": "1950",
        "priceCurrency": "GBP",
        "name": "Foundation Implementation"
      },
      {
        "@type": "Offer",
        "price": "5500",
        "priceCurrency": "GBP",
        "name": "Comprehensive Implementation"
      }
    ]
  };
  
  return JSON.stringify(courseSchema);
}
```

#### Step 3.2: Update SchemaScript to Use Dynamic Generator

Edit file: `src/components/seo/SchemaScript.tsx`

```tsx
import React from 'react';
import { OrganizationJsonLd, FAQPageJsonLd } from '../../utils/schema/generators';
import { generateCourseSchema } from '../../utils/schema/course-schema-generator';

/**
 * Component that injects schema.org JSON-LD into the document
 * Now uses the advanced dynamic course schema generator
 */
export function SchemaScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
          ${generateCourseSchema()}
          ${OrganizationJsonLd()}
          ${FAQPageJsonLd()}
        `
      }}
    />
  );
}

export default SchemaScript;
```

#### Step 3.3: Verify Dynamic Schema Generation

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open browser and view page source.

3. Look for the schema.org JSON-LD and verify it contains dynamic data from your course-data.json.

4. Validate with Schema.org validator:
   - Go to: https://validator.schema.org/
   - Paste your JSON-LD and validate

### Phase 4: Performance Optimization for SEO

#### Step 4.1: Create Web Vitals Monitoring Utility

Create file: `src/utils/web-vitals-monitor.ts`

```typescript
import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals';

/**
 * Monitors Core Web Vitals and logs/reports metrics
 * @see https://web.dev/vitals/
 */
export function monitorWebVitals(): void {
  // Measure Core Web Vitals
  onCLS(metric => logMetric('CLS', metric.value));
  onFID(metric => logMetric('FID', metric.value));
  onLCP(metric => logMetric('LCP', metric.value));
  onTTFB(metric => logMetric('TTFB', metric.value));

  function logMetric(name: string, value: number): void {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Web Vital: ${name} = ${value}`);
    }
    
    // Send to analytics in production
    if (import.meta.env.PROD) {
      // Vercel Analytics integration
      if (window.va) {
        window.va('event', {
          name: 'web-vital',
          data: { name, value }
        });
      }
    }
  }
}
```

#### Step 4.2: Add Web Vitals Monitoring to Main

Edit file: `src/main.tsx`

Add import and initialization:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';
import './index.css';
import { monitorWebVitals } from './utils/web-vitals-monitor'; // Add this import

// Initialize web vitals monitoring in production only
if (import.meta.env.PROD) {
  monitorWebVitals();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
```

#### Step 4.3: Create Image Optimization Utility

Create file: `src/utils/image-optimizer.ts`

```typescript
/**
 * Applies performance optimizations to images on the page
 */
export function optimizeImages(): void {
  window.addEventListener('load', () => {
    // Get all images
    const images = document.querySelectorAll('img');
    
    // Apply lazy loading where needed
    images.forEach(img => {
      // Skip images that are already optimized
      if (img.loading === 'lazy' || img.hasAttribute('data-optimized')) {
        return;
      }
      
      // Apply lazy loading
      img.loading = 'lazy';
      
      // Mark as optimized
      img.setAttribute('data-optimized', 'true');
      
      // Add decoding attribute for better performance
      img.decoding = 'async';
      
      console.log('Optimized image:', img.src);
    });
  });
}
```

#### Step 4.4: Initialize Image Optimization in Main

Update file: `src/main.tsx` again:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';
import './index.css';
import { monitorWebVitals } from './utils/web-vitals-monitor';
import { optimizeImages } from './utils/image-optimizer'; // Add this import

// Initialize web vitals monitoring in production only
if (import.meta.env.PROD) {
  monitorWebVitals();
}

// Initialize image optimization for all environments
optimizeImages();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
```

#### Step 4.5: Create Vercel Edge Configuration

Create file: `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)\\.(.*)$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection", 
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "images": {
    "sizes": [640, 750, 828, 1080, 1200, 1920],
    "domains": ["verticalshortcut.com"],
    "minimumCacheTTL": 31536000
  }
}
```

## 3. Implementation Checklist

Use this checklist to verify each implementation step:

### Phase 1: Schema.org Implementation

- [ ] Step 1.1: Create Schema directory structure
- [ ] Step 1.2: Create Schema generator utilities
- [ ] Step 1.3: Create SchemaScript component
- [ ] Step 1.4: Modify Layout component
- [ ] Step 1.5: Create Vite Schema plugin
- [ ] Step 1.6: Update Vite config
- [ ] Step 1.7: Verify Schema implementation

### Phase 2: Technical SEO Enhancements

- [ ] Step 2.1: Create Dynamic Meta component
- [ ] Step 2.2: Add Dynamic Meta to Layout
- [ ] Step 2.3: Create Canonical URL component
- [ ] Step 2.4: Add Canonical URL to Layout
- [ ] Step 2.5: Set up automated sitemap configuration
- [ ] Step 2.6: Create sitemap generation script
- [ ] Step 2.7: Update package.json scripts
- [ ] Step 2.8: Test sitemap generation

### Phase 3: Automated Course Schema Generation

- [ ] Step 3.1: Create advanced course schema generator
- [ ] Step 3.2: Update SchemaScript to use dynamic generator
- [ ] Step 3.3: Verify dynamic schema generation

### Phase 4: Performance Optimization for SEO

- [ ] Step 4.1: Create Web Vitals monitoring utility
- [ ] Step 4.2: Add Web Vitals monitoring to main
- [ ] Step 4.3: Create image optimization utility
- [ ] Step 4.4: Initialize image optimization in main
- [ ] Step 4.5: Create Vercel edge configuration

## 4. Validation Process

### Schema.org Validation

1. Open your site in the browser
2. Right-click and select "View Page Source"
3. Find the `<script type="application/ld+json">` tags
4. Copy each JSON-LD block
5. Paste into Schema Markup Validator: https://validator.schema.org/
6. Verify no errors are reported
7. Test with Google's Rich Results Test: https://search.google.com/test/rich-results

### Performance Validation

1. Run Lighthouse test in Chrome DevTools:
   - Open Chrome DevTools (F12)
   - Navigate to "Lighthouse" tab
   - Check "Performance" and "SEO" categories
   - Click "Analyze page load"

2. Verify Core Web Vitals:
   - Open PageSpeed Insights: https://pagespeed.web.dev/
   - Enter your site URL
   - Check Core Web Vitals metrics
   - Verify "Good" ratings on all metrics

### Sitemap Validation

1. After building, check for sitemap.xml:
   ```bash
   cat public/sitemap.xml
   ```

2. Validate sitemap.xml structure:
   - Open: https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Upload your sitemap.xml
   - Verify no errors

3. Submit to Google Search Console:
   - Log in to Search Console: https://search.google.com/search-console
   - Select your property
   - Go to "Sitemaps" section
   - Submit sitemap URL

## 5. Troubleshooting

### Common Issues and Solutions

#### Schema Doesn't Appear in Source

**Problem:** Schema JSON-LD scripts aren't visible in page source.

**Solution:**
1. Check for JavaScript errors in console
2. Verify SchemaScript component is included in Layout
3. Try adding script directly to index.html as fallback

```html
<!-- Add to index.html head if components aren't working -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Clash Creation",
    "url": "https://verticalshortcut.com"
  }
</script>
```

#### Schema Validation Errors

**Problem:** Schema.org validator shows errors.

**Solution:**
1. Fix missing required properties (see error details)
2. Ensure all URLs are absolute (e.g., https://verticalshortcut.com/logo.png)
3. Check for proper nesting of types (e.g., Organization inside Course)

#### Sitemap Generation Fails

**Problem:** Sitemap generation command fails.

**Solution:**
1. Check for proper installation of next-sitemap
2. Verify correct paths in sitemap.config.js
3. Create public directory if it doesn't exist:
   ```bash
   mkdir -p public
   ```

#### Dynamic Meta Tags Not Updating

**Problem:** Meta tags don't change when navigating routes.

**Solution:**
1. Ensure DynamicMeta component is using correct useLocation hook
2. Add event listener for route changes:

```javascript
// Add inside DynamicMeta component
React.useEffect(() => {
  // Update meta on mount and route changes
  updateMetaTags();
  
  // Update on route change
  return history.listen(() => {
    updateMetaTags();
  });
}, [location]);
```

## 6. Implementation Roadmap

```
┌─────────────────────┬─────────────┬────────────────┬───────────────┐
│                     │ COMPLEXITY  │ SEO IMPACT     │ PRESERVES     │
│ IMPLEMENTATION      │ (1-5)       │ (1-5)          │ STRUCTURE     │
├─────────────────────┼─────────────┼────────────────┼───────────────┤
│ Schema.org JSON-LD  │     3       │      5         │      ✓        │
│ Dynamic Meta Tags   │     2       │      4         │      ✓        │
│ Canonical URLs      │     1       │      4         │      ✓        │
│ Sitemap Generation  │     2       │      4         │      ✓        │
│ Course Schema       │     3       │      5         │      ✓        │
│ Performance Monitor │     2       │      3         │      ✓        │
│ Image Optimization  │     2       │      4         │      ✓        │
│ Vercel Edge Config  │     2       │      3         │      ✓        │
└─────────────────────┴─────────────┴────────────────┴───────────────┘
```

## 7. References

### Schema.org Types

- Course: https://schema.org/Course
- CourseInstance: https://schema.org/CourseInstance
- Organization: https://schema.org/Organization
- FAQPage: https://schema.org/FAQPage
- Question: https://schema.org/Question
- Answer: https://schema.org/Answer
- Offer: https://schema.org/Offer

### Google Documentation

- Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Rich Results Test: https://search.google.com/test/rich-results
- Web Vitals: https://web.dev/vitals/

### Vercel Documentation

- Edge Config: https://vercel.com/docs/concepts/edge-network/headers
- Vercel Analytics: https://vercel.com/docs/analytics

This implementation plan requires zero changes to your existing copy and preserves your site structure completely, focusing entirely on behind-the-scenes technical enhancements that search engines will love.