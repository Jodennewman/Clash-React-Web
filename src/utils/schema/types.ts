/**
 * TypeScript interfaces for Schema.org JSON-LD
 * @see https://schema.org/
 */

// Course Data Interfaces
export interface CourseData {
  title: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  number: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  points: string[];
  thumbnail: string;
  tracks?: string[];
  duration?: number;
  founderMustWatch?: boolean;
  entrepreneurSpecific?: boolean;
  popular?: boolean;
  featured?: boolean;
  submodules: Submodule[];
}

export interface Submodule {
  id: string;
  title: string;
  subtitle?: string;
  duration: number | null;
  thumbnail?: string;
  difficulty?: number;
  resources?: string[];
  highValue?: boolean;
  week?: number;
  instructor?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Schema.org Interfaces
export interface SchemaBase {
  "@context": "https://schema.org";
  "@type": string;
}

export interface CourseSchema extends SchemaBase {
  "@type": "Course";
  name: string;
  description: string;
  provider: OrganizationSchema;
  timeRequired: string; // ISO 8601 duration
  hasCourseInstance: CourseInstanceSchema;
  offers?: OfferSchema;
  aggregateRating?: AggregateRatingSchema;
  teaches?: string[];
  educationalLevel?: string;
  learningResourceType?: string;
}

export interface CourseInstanceSchema {
  "@type": "CourseInstance";
  courseMode: string[];
  duration: string; // ISO 8601 duration
  inLanguage: string;
  startDate?: string; // ISO 8601 date
  endDate?: string; // ISO 8601 date
}

export interface OrganizationSchema extends SchemaBase {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint?: ContactPointSchema;
  address?: PostalAddressSchema;
}

export interface ContactPointSchema {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  email?: string;
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface OfferSchema {
  "@type": "Offer";
  price: string;
  priceCurrency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  validFrom?: string; // ISO 8601 date
  validThrough?: string; // ISO 8601 date
}

export interface AggregateRatingSchema {
  "@type": "AggregateRating";
  ratingValue: number;
  ratingCount: number;
  bestRating: number;
  worstRating: number;
}

export interface FAQPageSchema extends SchemaBase {
  "@type": "FAQPage";
  mainEntity: QuestionSchema[];
}

export interface QuestionSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: AnswerSchema;
}

export interface AnswerSchema {
  "@type": "Answer";
  text: string;
}

// Video Schema Interfaces
export interface VideoObjectSchema extends SchemaBase {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string; // ISO 8601 date
  duration: string; // ISO 8601 duration
  contentUrl?: string;
  embedUrl?: string;
  author?: Partial<OrganizationSchema>;
  publisher?: Partial<OrganizationSchema>;
  inLanguage?: string;
  learningResourceType?: string;
  accessMode?: string[];
  accessibilityFeature?: string[];
  isPartOf?: Partial<CourseSchema>;
}

export interface VideoPlaylistSchema extends SchemaBase {
  "@type": "ItemList";
  name: string;
  description: string;
  numberOfItems: number;
  itemListElement: Partial<VideoObjectSchema>[];
}

// Helper type for simplified course reference
export interface CourseReference extends SchemaBase {
  "@type": "Course";
  name: string;
  url: string;
}