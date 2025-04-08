// Script to list all sections in the course data
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the course data JSON file
const rawCourseData = readFileSync(join(__dirname, './src/data/course-data.json'), 'utf8');
const courseData = JSON.parse(rawCourseData);

console.log("\n=== ALL CATEGORIES AND SECTIONS IN COURSE DATA ===\n");

// Display all categories and sections
if (courseData && Array.isArray(courseData.categories)) {
  courseData.categories.forEach((category, categoryIndex) => {
    console.log(`CATEGORY ${categoryIndex + 1}: ${category.name} (ID: ${category.id})`);
    
    if (category && Array.isArray(category.sections)) {
      category.sections.forEach((section, sectionIndex) => {
        const moduleCount = Array.isArray(section.modules) ? section.modules.length : 0;
        console.log(`  - SECTION ${sectionIndex + 1}: ${section.name} (ID: ${section.id}) - ${moduleCount} modules`);
        
        // List the first 3 modules as examples
        if (Array.isArray(section.modules)) {
          section.modules.slice(0, 3).forEach((module, moduleIndex) => {
            console.log(`      * Module: ${module.title} (ID: ${module.id})`);
          });
          
          if (section.modules.length > 3) {
            console.log(`      * ... and ${section.modules.length - 3} more modules`);
          }
          console.log("");
        }
      });
    }
    console.log("---\n");
  });
}

// Suggest mapping for the current mainSections
console.log("\n=== SUGGESTED MAPPING FOR MAINSECTIONS ===\n");

const currentSections = [
  "basic_theory",
  "theory_advanced",
  "monetisation",
  "repurposing",
  "shooting",
  "editing",
  "system_notion"
];

currentSections.forEach(sectionId => {
  let found = false;
  let suggestion = null;
  
  // Try to find exact match first
  if (courseData && Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (category && Array.isArray(category.sections)) {
        for (const section of category.sections) {
          if (section && section.id === sectionId) {
            found = true;
            console.log(`✅ "${section.name}" (${sectionId}) is correct and exists in course data`);
            break;
          }
        }
      }
      if (found) break;
    }
  }
  
  // If not found, suggest similar section based on name
  if (!found) {
    // Find similar sections
    const lowerSectionId = sectionId.toLowerCase();
    const similarSections = [];
    
    if (courseData && Array.isArray(courseData.categories)) {
      for (const category of courseData.categories) {
        if (category && Array.isArray(category.sections)) {
          for (const section of category.sections) {
            if (section) {
              // Check if section name contains part of the current ID
              const lowerSectionName = section.name.toLowerCase();
              
              if (lowerSectionId.includes(lowerSectionName) || 
                  lowerSectionName.includes(lowerSectionId.replace("_", " ")) ||
                  section.id.includes(lowerSectionId.split("_")[0])) {
                similarSections.push({
                  id: section.id,
                  name: section.name
                });
              }
            }
          }
        }
      }
    }
    
    if (similarSections.length > 0) {
      console.log(`❌ "${sectionId}" not found in course data. Similar sections:`);
      similarSections.forEach((similar, index) => {
        console.log(`   ${index + 1}. "${similar.name}" (ID: ${similar.id})`);
      });
    } else {
      console.log(`❌ "${sectionId}" not found and no similar sections found in course data`);
    }
  }
});