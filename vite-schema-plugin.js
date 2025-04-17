/**
 * Vite plugin for injecting schema.org JSON-LD during build
 */
export default function schemaPlugin() {
  return {
    name: 'vite-schema-injection',
    transformIndexHtml(html) {
      // Load schemas during build time
      const { 
        CourseJsonLd, 
        OrganizationJsonLd, 
        FAQPageJsonLd,
        VideoObjectsJsonLd
      } = require('./src/utils/schema/generators');
      
      // Inject before closing head tag
      return html.replace(
        '</head>',
        `<script type="application/ld+json">
          ${CourseJsonLd()}
         </script>
         <script type="application/ld+json">
          ${OrganizationJsonLd()}
         </script>
         <script type="application/ld+json">
          ${FAQPageJsonLd()}
         </script>
         <script type="application/ld+json">
          ${VideoObjectsJsonLd()}
         </script>
         </head>`
      );
    }
  };
} 