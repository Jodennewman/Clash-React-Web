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