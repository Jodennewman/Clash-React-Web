/* eslint-disable @typescript-eslint/no-explicit-any */
import courseData from '../../../course-data.json';
import {
  CourseSchema,
  OrganizationSchema,
  FAQPageSchema,
  CourseData,
  VideoObjectSchema,
  VideoPlaylistSchema,
  CourseReference
} from './types';

// Assert the type of courseData
const typedCourseData = (courseData as CourseData) || ({} as CourseData);

const safeCategories = Array.isArray((typedCourseData as any).categories) ? (typedCourseData as any).categories : [];

// Calculate total duration in minutes
const getTotalDuration = () => {
  return safeCategories.reduce((catTotal: number, category: any) => {
    return catTotal + (category.sections || []).reduce((sectionTotal: number, section: any) => {
      return sectionTotal + (section.modules || []).reduce((moduleTotal: number, module: any) => {
        return moduleTotal + (module.duration || 0);
      }, 0);
    }, 0);
  }, 0);
};

// Get all module titles for teaches array
const getAllModuleTitles = () => {
  return safeCategories.flatMap((category: any) =>
    (category.sections || []).flatMap((section: any) =>
      (section.modules || []).map((module: any) => module.title)
    )
  );
};

/**
 * Generates JSON-LD schema for Course
 * @see https://schema.org/Course
 */
export function CourseJsonLd(): string {
  const totalDuration = getTotalDuration();
  const moduleTitles = getAllModuleTitles();
  
  const course: CourseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": typedCourseData.title,
    "description": "The premium 10-week program for founders and creators to master short-form video content",
    "provider": {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Clash Creation",
      "url": "https://verticalshortcut.com",
      "logo": "https://verticalshortcut.com/logo.png"
    },
    "timeRequired": `PT${totalDuration}M`, // ISO 8601 duration in minutes
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["online", "onsite"],
      "duration": "PT10W", // 10 weeks
      "inLanguage": "en"
    },
    "offers": {
      "@type": "Offer",
      "price": "5500",
      "priceCurrency": "GBP"
    },
    "teaches": moduleTitles,
    "educationalLevel": "Beginner to Advanced",
    "learningResourceType": "Video Course"
  };

  return JSON.stringify(course);
}

/**
 * Generates JSON-LD schema for Organization
 * @see https://schema.org/Organization
 */
export function OrganizationJsonLd(): string {
  const organization: OrganizationSchema = {
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
      "contactType": "customer service",
      "email": "hello@verticalshortcut.com"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Example Street",
      "addressLocality": "London",
      "addressRegion": "Greater London",
      "postalCode": "SW1A 1AA",
      "addressCountry": "UK"
    }
  };

  return JSON.stringify(organization);
}

/**
 * Generates JSON-LD schema for FAQPage
 * @see https://schema.org/FAQPage
 */
export function FAQPageJsonLd(): string {
  // Use static FAQs since they're not in course data
  const faqs = [
    {
      question: "How long is the Vertical Shortcut program?",
      answer: `The Vertical Shortcut is a comprehensive 10-week program with ${getAllModuleTitles().length} modules and approximately ${getTotalDuration()} minutes of video content.`
    },
    {
      question: "Who is this program for?",
      answer: "This program is designed for business founders and entrepreneurs who want to leverage short-form content to generate leads and revenue."
    }
  ];
  
  const faqPage: FAQPageSchema = {
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
  };

  return JSON.stringify(faqPage);
}

/**
 * Generates JSON-LD schema for course videos
 * @see https://schema.org/VideoObject
 */
export function VideoObjectsJsonLd(): string {
  const courseRef: CourseReference = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": typedCourseData.title,
    "url": "https://verticalshortcut.com"
  };

  const organizationRef: Partial<OrganizationSchema> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Clash Creation",
    "url": "https://verticalshortcut.com",
    "logo": "https://verticalshortcut.com/logo.png"
  };

  const videos: VideoObjectSchema[] = safeCategories.flatMap((category: any) =>
    (category.sections || []).flatMap((section: any) =>
      (section.modules || []).flatMap((module: any) =>
        (module.submodules || []).map((submodule: any) => ({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": submodule.title,
          "description": submodule.subtitle || module.subtitle,
          "thumbnailUrl": `https://verticalshortcut.com/thumbnails/${submodule.thumbnail || module.thumbnail}`,
          "uploadDate": "2024-01-01", // TODO: Add actual upload dates to course data
          "duration": `PT${submodule.duration || 0}M`,
          "inLanguage": "en",
          "learningResourceType": "Video",
          "accessMode": ["visual", "auditory"],
          "accessibilityFeature": ["captions", "transcript"],
          "author": organizationRef,
          "publisher": organizationRef,
          "isPartOf": courseRef
        }))
      )
    )
  );

  // Create a playlist for each module
  const playlists: VideoPlaylistSchema[] = safeCategories.flatMap((category: any) =>
    (category.sections || []).flatMap((section: any) =>
      (section.modules || []).map((module: any) => {
        const moduleVideos: Partial<VideoObjectSchema>[] = (module.submodules || []).map((submodule: any) => ({
          "@context": "https://schema.org" as const,
          "@type": "VideoObject" as const,
          "name": submodule.title,
          "description": submodule.subtitle || module.subtitle,
          "thumbnailUrl": `https://verticalshortcut.com/thumbnails/${submodule.thumbnail || module.thumbnail}`,
          "uploadDate": "2024-01-01", // TODO: Add actual upload dates to course data
          "duration": `PT${submodule.duration || 0}M`,
          "inLanguage": "en"
        }));

        return {
          "@context": "https://schema.org" as const,
          "@type": "ItemList" as const,
          "name": module.title,
          "description": module.subtitle,
          "numberOfItems": moduleVideos.length,
          "itemListElement": moduleVideos
        };
      })
    )
  );

  return JSON.stringify([...videos, ...playlists]);
}