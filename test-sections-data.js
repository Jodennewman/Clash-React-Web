// Script to validate all section data for the ModuleHUD component
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the course data JSON file
const rawCourseData = readFileSync(join(__dirname, './src/data/course-data.json'), 'utf8');
const courseData = JSON.parse(rawCourseData);

// Define our mainSections array as used in the ModuleHUD component
const mainSections = [
  // First BigSquare - Basic Theory/Core Concepts
  {
    id: "basic_theory",
    name: "Basic Theory",
    type: 'bigSquare'
  },
  // First Column - Upskillers
  {
    id: "upskiller_authentic_research_writer",
    name: "Research & Writing",
    type: 'normalSquare'
  },
  {
    id: "upskiller_shorts_ready_videographer",
    name: "Shooting",
    type: 'normalSquare'
  },
  {
    id: "upskiller_vertical_video_editors",
    name: "Editing",
    type: 'normalSquare'
  },
  // Second Column - PR/Authority & Delegation
  {
    id: "pr_authority",
    name: "PR & Authority",
    type: 'normalSquare'
  },
  {
    id: "delegation",
    name: "Delegation",
    type: 'normalSquare'
  },
  // Second BigSquare - Advanced Theory
  {
    id: "advanced_theory",
    name: "Advanced Theory",
    type: 'bigSquare'
  },
  // Third Column - Business Scaling
  {
    id: "delegation",
    name: "Team Building",
    type: 'normalSquare'
  },
  {
    id: "monetisation",
    name: "Monetisation",
    type: 'normalSquare'
  },
  {
    id: "conversion",
    name: "Conversion",
    type: 'normalSquare'
  },
  // Third BigSquare - System & Products
  {
    id: "delegation",
    name: "Systems & Products",
    type: 'bigSquare'
  }
];

// Function to group mainSections into columns as done in ModuleHUD
const getColumns = () => {
  return {
    column1: [mainSections[1], mainSections[2], mainSections[3]], // Three Upskillers
    column2: [mainSections[4], mainSections[5]], // PR/Authority & Delegation
    column3: [mainSections[7], mainSections[8], mainSections[9]] // Business Scaling
  };
};

// Function to get modules for a section
const getModulesForSection = (sectionId) => {
  if (!sectionId || !courseData) return [];
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      if (section.id === sectionId) {
        return Array.isArray(section.modules) ? section.modules : [];
      }
    }
  }
  return [];
};

// Function to get submodules for a module
const getSubmodulesForModule = (moduleId) => {
  if (!moduleId || !courseData) return [];
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      if (Array.isArray(section.modules)) {
        for (const module of section.modules) {
          if (module && module.id === moduleId) {
            return Array.isArray(module.submodules) ? module.submodules : [];
          }
        }
      }
    }
  }
  return [];
};

// Validate all sections in the mainSections array
console.log("=== VALIDATING ALL SECTIONS IN MAINSECTIONS ARRAY ===\n");

for (const [index, section] of mainSections.entries()) {
  console.log(`[${index}] Section: ${section.name} (ID: ${section.id})`);
  
  // Get modules for this section
  const modules = getModulesForSection(section.id);
  console.log(`  - Found ${modules.length} modules`);
  
  if (modules.length === 0) {
    console.log(`  ⚠️ WARNING: No modules found for section ID: ${section.id}`);
  } else {
    // Print first few modules
    const modulesToShow = Math.min(3, modules.length);
    for (let i = 0; i < modulesToShow; i++) {
      const module = modules[i];
      console.log(`    * Module: ${module.title}`);
      
      // Check if module has valid properties for ModuleModal
      const hasTitle = !!module.title;
      const hasSubtitle = !!module.subtitle;
      const hasThumbnail = !!module.thumbnail;
      const hasPoints = Array.isArray(module.points) && module.points.length > 0;
      const hasDuration = module.duration !== undefined;
      
      if (!hasTitle || !hasSubtitle || !hasThumbnail || !hasPoints || !hasDuration) {
        console.log(`      ⚠️ WARNING: Module missing required properties for ModuleModal`);
        if (!hasTitle) console.log(`        - Missing title`);
        if (!hasSubtitle) console.log(`        - Missing subtitle`);
        if (!hasThumbnail) console.log(`        - Missing thumbnail`);
        if (!hasPoints) console.log(`        - Missing points array`);
        if (!hasDuration) console.log(`        - Missing duration`);
      }
      
      // Check submodules
      const submodules = getSubmodulesForModule(module.id);
      console.log(`      - Has ${submodules.length} submodules`);
      
      if (submodules.length === 0) {
        console.log(`      ⚠️ WARNING: No submodules found for module: ${module.title}`);
      } else {
        // Check first submodule
        const firstSubmodule = submodules[0];
        const hasSubTitle = !!firstSubmodule.title;
        const hasSubSubtitle = !!firstSubmodule.subtitle;
        const hasSubDuration = firstSubmodule.duration !== undefined;
        const hasSubDifficulty = firstSubmodule.difficulty !== undefined;
        
        if (!hasSubTitle || !hasSubSubtitle || !hasSubDuration || !hasSubDifficulty) {
          console.log(`      ⚠️ WARNING: Submodule missing required properties`);
          if (!hasSubTitle) console.log(`        - Missing title`);
          if (!hasSubSubtitle) console.log(`        - Missing subtitle`);
          if (!hasSubDuration) console.log(`        - Missing duration`);
          if (!hasSubDifficulty) console.log(`        - Missing difficulty`);
        }
      }
    }
    
    if (modules.length > modulesToShow) {
      console.log(`    * ... and ${modules.length - modulesToShow} more modules`);
    }
  }
  
  console.log("");
}

// Validate columns structure
console.log("\n=== VALIDATING COLUMN STRUCTURE ===\n");

const columns = getColumns();

// Check column1 - Three Upskillers
console.log("Column 1 - Three Upskillers:");
for (const section of columns.column1) {
  const modules = getModulesForSection(section.id);
  console.log(`  - ${section.name} (ID: ${section.id}): ${modules.length} modules`);
}

// Check column2 - PR/Authority & Delegation
console.log("\nColumn 2 - PR/Authority & Delegation:");
for (const section of columns.column2) {
  const modules = getModulesForSection(section.id);
  console.log(`  - ${section.name} (ID: ${section.id}): ${modules.length} modules`);
}

// Check column3 - Business Scaling
console.log("\nColumn 3 - Business Scaling:");
for (const section of columns.column3) {
  const modules = getModulesForSection(section.id);
  console.log(`  - ${section.name} (ID: ${section.id}): ${modules.length} modules`);
}

// Check BigSquares
console.log("\nBigSquares:");
console.log(`  - First: ${mainSections[0].name} (ID: ${mainSections[0].id}): ${getModulesForSection(mainSections[0].id).length} modules`);
console.log(`  - Second: ${mainSections[6].name} (ID: ${mainSections[6].id}): ${getModulesForSection(mainSections[6].id).length} modules`);
console.log(`  - Third: ${mainSections[10].name} (ID: ${mainSections[10].id}): ${getModulesForSection(mainSections[10].id).length} modules`);

// Check for duplicate section IDs
console.log("\n=== CHECKING FOR DUPLICATE SECTION IDS ===\n");

const sectionIdCounts = {};
mainSections.forEach(section => {
  sectionIdCounts[section.id] = (sectionIdCounts[section.id] || 0) + 1;
});

let hasDuplicates = false;
for (const [id, count] of Object.entries(sectionIdCounts)) {
  if (count > 1) {
    hasDuplicates = true;
    console.log(`⚠️ WARNING: Section ID "${id}" appears ${count} times in mainSections array`);
    console.log(`  This is okay if intentional, but each instance will show the same modules when clicked`);
    
    // Find which sections have this ID
    const indices = mainSections
      .map((section, index) => section.id === id ? index : -1)
      .filter(index => index !== -1);
    
    console.log(`  Used in indices: ${indices.join(', ')}`);
    console.log(`  Display names: ${indices.map(index => mainSections[index].name).join(', ')}`);
  }
}

if (!hasDuplicates) {
  console.log("✅ No duplicate section IDs found");
}

console.log("\nValidation complete!");