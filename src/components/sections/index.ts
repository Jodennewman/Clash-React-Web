// Export all section components for easy importing
import FAQ from "./faq-raised";
import { Pricing3ColsSubscription } from "./pricing-3-cols-subscription";
import { ModuleHUD } from "./ModuleHUD";
import CourseStats from "./course-stats";
import CaseStudies from "./Case-Studies";
import VSPainPoints from "./VSPainPoints";
import VSCharts from "./VSCharts";

// Re-export the components
export { 
  FAQ, 
  Pricing3ColsSubscription, 
  ModuleHUD, 
  CourseStats, 
  CaseStudies, 
  VSPainPoints,
  VSCharts
};

// Note: Additional components from subdirectories like navbar, carousel,
// feature, and bento-grid can be imported directly from their respective folders
// when needed. We're keeping this simple to avoid linter errors.
