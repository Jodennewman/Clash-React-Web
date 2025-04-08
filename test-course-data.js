// Simple test script to verify course data structure is compatible with ModuleModal
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the course data JSON file
const rawCourseData = readFileSync(join(__dirname, './src/data/course-data.json'), 'utf8');
const courseData = JSON.parse(rawCourseData);

// Extract sample module IDs for testing
const extractModuleIds = (data) => {
  const moduleIds = [];
  
  if (data && Array.isArray(data.categories)) {
    data.categories.forEach(category => {
      if (category && Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (section && Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && module.id) {
                moduleIds.push(module.id);
              }
            });
          }
        });
      }
    });
  }
  
  return moduleIds;
};

// Get a module by ID 
const getModuleById = (moduleId) => {
  if (!moduleId || !courseData) return null;
  
  if (Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (category && Array.isArray(category.sections)) {
        for (const section of category.sections) {
          if (section && Array.isArray(section.modules)) {
            for (const module of section.modules) {
              if (module && module.id === moduleId) {
                return module;
              }
            }
          }
        }
      }
    }
  }
  return null;
};

// Get submodules for a module
const getSubmodulesForModule = (moduleId) => {
  const module = getModuleById(moduleId);
  if (!module || !Array.isArray(module.submodules)) return [];
  
  return module.submodules;
};

// Function to check if all required fields for ModuleModal are present
const validateModuleDataForModal = (module) => {
  const requiredFields = ['id', 'title', 'subtitle', 'thumbnail', 'points', 'duration'];
  const missingFields = requiredFields.filter(field => !module.hasOwnProperty(field) || module[field] === undefined);
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    validationDetails: {
      hasTitle: !!module.title,
      hasSubtitle: !!module.subtitle,
      hasThumbnail: !!module.thumbnail,
      pointsFormat: Array.isArray(module.points) ? 
        `Array with ${module.points.length} items` : 
        `Expected array, got ${typeof module.points}`,
      hasDuration: module.duration !== undefined ? 
        `Duration: ${module.duration}` : 
        'Missing duration',
      hasValidTracks: Array.isArray(module.tracks) ? 
        `${module.tracks.length} tracks` : 
        'No tracks array',
      submodulesFormat: Array.isArray(module.submodules) ? 
        `Has ${module.submodules.length} submodules` : 
        'No submodules array'
    }
  };
};

// Function to validate a submodule
const validateSubmoduleData = (submodule) => {
  const requiredFields = ['id', 'title', 'subtitle', 'duration', 'difficulty'];
  const missingFields = requiredFields.filter(field => !submodule.hasOwnProperty(field) || submodule[field] === undefined);
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    validationDetails: {
      hasTitle: !!submodule.title,
      hasSubtitle: !!submodule.subtitle,
      hasDuration: submodule.duration !== undefined ? 
        `Duration: ${submodule.duration}` : 
        'Missing duration',
      hasDifficulty: submodule.difficulty !== undefined ? 
        `Difficulty: ${submodule.difficulty}` : 
        'Missing difficulty',
      hasHighValue: submodule.highValue !== undefined ? 
        `HighValue: ${submodule.highValue}` : 
        'Missing highValue flag',
      hasResources: Array.isArray(submodule.resources) ? 
        `Has ${submodule.resources.length} resources` : 
        'No resources array'
    }
  };
};

// Run the validation
console.log("-- ModuleHUD Data Validation --");

// Get all module IDs
const moduleIds = extractModuleIds(courseData);
console.log(`Found ${moduleIds.length} total modules in the course data`);

// Sample a few modules for detailed testing
const samplesToTest = Math.min(5, moduleIds.length);
console.log(`\nTesting ${samplesToTest} sample modules for modal compatibility:\n`);

let validModulesCount = 0;
let modulesWithMissingFields = 0;

for (let i = 0; i < samplesToTest; i++) {
  const moduleId = moduleIds[i];
  const module = getModuleById(moduleId);
  
  console.log(`\n--- MODULE ${i+1}: ${module.title} (ID: ${moduleId}) ---`);
  
  const moduleValidation = validateModuleDataForModal(module);
  if (moduleValidation.isValid) {
    console.log("✅ Module has all required fields for display in modal");
    validModulesCount++;
  } else {
    console.log(`❌ Module is missing required fields: ${moduleValidation.missingFields.join(', ')}`);
    modulesWithMissingFields++;
  }
  
  console.log("Module Properties Validation:");
  for (const [key, value] of Object.entries(moduleValidation.validationDetails)) {
    console.log(`- ${key}: ${value}`);
  }
  
  // Check submodules
  const submodules = getSubmodulesForModule(moduleId);
  console.log(`\nSubmodules (${submodules.length}):`);
  
  if (submodules.length > 0) {
    // Check first submodule in detail
    const firstSubmodule = submodules[0];
    console.log(`First Submodule: ${firstSubmodule.title}`);
    
    const submoduleValidation = validateSubmoduleData(firstSubmodule);
    if (submoduleValidation.isValid) {
      console.log("✅ Submodule has all required fields");
    } else {
      console.log(`❌ Submodule is missing required fields: ${submoduleValidation.missingFields.join(', ')}`);
    }
    
    console.log("Submodule Properties Validation:");
    for (const [key, value] of Object.entries(submoduleValidation.validationDetails)) {
      console.log(`- ${key}: ${value}`);
    }
  } else {
    console.log("No submodules found for this module");
  }
}

// Summary
console.log("\n--- VALIDATION SUMMARY ---");
console.log(`Total modules tested: ${samplesToTest}`);
console.log(`✅ Valid modules: ${validModulesCount}`);
console.log(`❌ Modules with missing fields: ${modulesWithMissingFields}`);

// Test main sections data structure (used by ModuleHUD)
console.log("\n--- TESTING MAIN SECTIONS STRUCTURE ---");

// Simulate the mainSections array used in ModuleHUD
const mainSections = [
  {
    id: "basic_theory",
    name: "Basic Theory",
    color: "var(--hud-teal)",
    type: 'bigSquare',
    size: 'double',
    featured: true
  },
  {
    id: "theory_advanced",
    name: "Advanced Theory",
    color: "var(--hud-coral)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "monetisation",
    name: "Monetisation",
    color: "var(--hud-orange)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "repurposing",
    name: "Repurposing",
    color: "var(--secondary-teal)",
    type: 'bigSquare',
    size: 'double'
  },
  {
    id: "shooting",
    name: "Shooting",
    color: "var(--hud-pink)",
    type: 'normalSquare',
    size: 'normal'
  },
  {
    id: "editing",
    name: "Editing",
    color: "var(--accent-coral)",
    type: 'bigSquare',
    size: 'double'
  },
  {
    id: "system_notion",
    name: "System: Notion",
    color: "var(--hud-navy)",
    type: 'bigSquare',
    size: 'double',
    featured: true
  }
];

// Verify each section exists in the course data
console.log("Testing if each mainSection matches a section in course-data.json:");

for (const section of mainSections) {
  const sectionId = section.id;
  let sectionFound = false;
  let moduleCount = 0;
  
  // Look for this section in the course data
  if (Array.isArray(courseData.categories)) {
    for (const category of courseData.categories) {
      if (category && Array.isArray(category.sections)) {
        for (const dataSection of category.sections) {
          if (dataSection && dataSection.id === sectionId) {
            sectionFound = true;
            moduleCount = Array.isArray(dataSection.modules) ? dataSection.modules.length : 0;
            break;
          }
        }
      }
      if (sectionFound) break;
    }
  }
  
  if (sectionFound) {
    console.log(`✅ Section "${section.name}" (${sectionId}) found with ${moduleCount} modules`);
  } else {
    console.log(`❌ Section "${section.name}" (${sectionId}) NOT FOUND in course data`);
  }
}

console.log("\nTest completed.");