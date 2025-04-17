import { CourseJsonLd, OrganizationJsonLd, FAQPageJsonLd } from './generators';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface CourseSchema {
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
}

interface OrganizationSchema {
  '@type': string;
  name: string;
  url: string;
}

interface FAQSchema {
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

/**
 * Validates schema.org JSON-LD implementation
 */
export async function validateSchema(): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Validate Course Schema
    const courseSchema = JSON.parse(CourseJsonLd()) as CourseSchema;
    validateRequiredCourseFields(courseSchema, errors);

    // Validate Organization Schema
    const orgSchema = JSON.parse(OrganizationJsonLd()) as OrganizationSchema;
    validateRequiredOrgFields(orgSchema, errors);

    // Validate FAQ Schema
    const faqSchema = JSON.parse(FAQPageJsonLd()) as FAQSchema;
    validateRequiredFAQFields(faqSchema, errors);

    // Log validation results
    if (errors.length === 0) {
      console.log('✅ Schema validation passed');
    } else {
      console.error('❌ Schema validation failed:', errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  } catch (error) {
    errors.push(`Schema parsing error: ${error instanceof Error ? error.message : String(error)}`);
    return { isValid: false, errors, warnings };
  }
}

function validateRequiredCourseFields(schema: CourseSchema, errors: string[]): void {
  if (schema['@type'] !== 'Course') {
    errors.push('Course schema missing @type');
  }
  if (!schema.name) {
    errors.push('Course schema missing name');
  }
  if (!schema.description) {
    errors.push('Course schema missing description');
  }
  if (!schema.provider) {
    errors.push('Course schema missing provider');
  }
}

function validateRequiredOrgFields(schema: OrganizationSchema, errors: string[]): void {
  if (schema['@type'] !== 'Organization') {
    errors.push('Organization schema missing @type');
  }
  if (!schema.name) {
    errors.push('Organization schema missing name');
  }
  if (!schema.url) {
    errors.push('Organization schema missing url');
  }
}

function validateRequiredFAQFields(schema: FAQSchema, errors: string[]): void {
  if (schema['@type'] !== 'FAQPage') {
    errors.push('FAQPage schema missing @type');
  }
  if (!Array.isArray(schema.mainEntity)) {
    errors.push('FAQPage schema missing mainEntity array');
  } else {
    schema.mainEntity.forEach((qa, index) => {
      if (!qa.name) {
        errors.push(`FAQ item ${index + 1} missing question`);
      }
      if (!qa.acceptedAnswer?.text) {
        errors.push(`FAQ item ${index + 1} missing answer`);
      }
    });
  }
} 