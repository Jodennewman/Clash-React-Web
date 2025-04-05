/**
 * Module Modal Data Validation Script
 * 
 * This script tests if the data required by ModuleModal is properly structured
 * and available from the course-utils functions.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the course data
const courseDataPath = join(__dirname, 'src/data/course-data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

// Mock getThumbnailPath function from course-utils
const getThumbnailPath = (thumbnailName) => {
  if (!thumbnailName) {
    console.warn('Missing thumbnail name, using default');
    return '/assets/main/DataBaseThumbnails/renamed/default.webp';
  }
  
  if (thumbnailName.startsWith('/') || thumbnailName.startsWith('./') || thumbnailName.startsWith('http')) {
    return thumbnailName;
  }
  
  return `/assets/main/DataBaseThumbnails/renamed/${thumbnailName}`;
};

// Mock getModuleById and getSubmodulesForModule functions
const getModuleById = (moduleId) => {
  if (!moduleId) return null;
  
  for (const category of courseData.categories || []) {
    for (const section of category.sections || []) {
      for (const module of section.modules || []) {
        if (module && module.id === moduleId) {
          return {
            ...module,
            key: `module-${moduleId}`
          };
        }
      }
    }
  }
  return null;
};

const getSubmodulesForModule = (moduleId) => {
  if (!moduleId) return [];
  
  const module = getModuleById(moduleId);
  if (!module || !Array.isArray(module.submodules)) return [];
  
  return module.submodules.map((submodule, index) => ({
    ...submodule,
    key: `${moduleId}-submodule-${submodule.id || index}`
  }));
};

// Extract sample module IDs for testing
const getSampleModuleIds = () => {
  const moduleIds = [];
  
  if (courseData && Array.isArray(courseData.categories)) {
    // Get one module from each section for comprehensive testing
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules) && section.modules.length > 0) {
            // Take the first module from each section
            moduleIds.push(section.modules[0].id);
          }
        });
      }
    });
    
    // Add some specific modules of interest
    // Featured modules
    const featuredModules = [];
    courseData.categories.forEach(category => {
      if (Array.isArray(category.sections)) {
        category.sections.forEach(section => {
          if (Array.isArray(section.modules)) {
            section.modules.forEach(module => {
              if (module && module.featured) {
                featuredModules.push(module.id);
              }
            });
          }
        });
      }
    });
    
    // Add first featured module if available
    if (featuredModules.length > 0) {
      if (!moduleIds.includes(featuredModules[0])) {
        moduleIds.push(featuredModules[0]);
      }
    }
    
    // Modules with many submodules
    const modulesWithManySubmodules = [];
    courseData.categories.forEach(category => {
      category.sections?.forEach(section => {
        section.modules?.forEach(module => {
          if (Array.isArray(module.submodules) && module.submodules.length > 5) {
            modulesWithManySubmodules.push({
              id: module.id,
              count: module.submodules.length
            });
          }
        });
      });
    });
    
    // Sort by submodule count and add the one with most submodules
    if (modulesWithManySubmodules.length > 0) {
      modulesWithManySubmodules.sort((a, b) => b.count - a.count);
      if (!moduleIds.includes(modulesWithManySubmodules[0].id)) {
        moduleIds.push(modulesWithManySubmodules[0].id);
      }
    }
  }
  
  // Return unique module IDs, limited to 5 for testing
  return [...new Set(moduleIds)].slice(0, 5);
};

// Main validation function
const validateModuleModalData = () => {
  const moduleIds = getSampleModuleIds();
  const results = [];
  
  console.log('=== MODULE MODAL DATA VALIDATION ===\n');
  console.log(`Testing ${moduleIds.length} sample modules for modal compatibility...\n`);
  
  moduleIds.forEach(moduleId => {
    const module = getModuleById(moduleId);
    const submodules = getSubmodulesForModule(moduleId);
    
    console.log(`\n--- Module: ${module?.title || moduleId} ---`);
    
    // Create validation result object
    const result = {
      moduleId,
      title: module?.title,
      valid: true,
      issues: []
    };
    
    // Check required module properties
    if (!module) {
      console.log('❌ Module not found');
      result.valid = false;
      result.issues.push('Module not found');
      results.push(result);
      return;
    }
    
    // Check for thumbnail
    if (!module.thumbnail) {
      console.log('⚠️ No thumbnail image');
      result.issues.push('Missing thumbnail');
    } else {
      const thumbnailPath = getThumbnailPath(module.thumbnail);
      console.log(`✅ Thumbnail: ${thumbnailPath}`);
    }
    
    // Check for title
    if (!module.title) {
      console.log('❌ Missing title');
      result.valid = false;
      result.issues.push('Missing title');
    } else {
      console.log(`✅ Title: ${module.title}`);
    }
    
    // Check for subtitle/description
    if (!module.subtitle) {
      console.log('⚠️ Missing subtitle/description');
      result.issues.push('Missing subtitle');
    } else {
      console.log(`✅ Subtitle: ${module.subtitle.substring(0, 50)}...`);
    }
    
    // Check for bullet points
    if (!Array.isArray(module.points) || module.points.length === 0) {
      console.log('⚠️ No bullet points');
      result.issues.push('Missing bullet points');
    } else {
      console.log(`✅ Bullet points: ${module.points.length}`);
    }
    
    // Check for submodules
    if (!Array.isArray(submodules) || submodules.length === 0) {
      console.log('⚠️ No submodules');
      result.issues.push('No submodules');
    } else {
      console.log(`✅ Submodules: ${submodules.length}`);
      
      // Validate submodules
      let validSubmodules = 0;
      let invalidSubmodules = 0;
      
      submodules.forEach(submodule => {
        let submoduleValid = true;
        
        if (!submodule.title) {
          submoduleValid = false;
          result.issues.push(`Submodule missing title: ${submodule.id}`);
        }
        
        if (!submodule.subtitle) {
          submoduleValid = false;
          result.issues.push(`Submodule missing subtitle: ${submodule.id}`);
        }
        
        if (typeof submodule.duration !== 'number') {
          submoduleValid = false;
          result.issues.push(`Submodule missing duration: ${submodule.id}`);
        }
        
        if (submoduleValid) {
          validSubmodules++;
        } else {
          invalidSubmodules++;
        }
      });
      
      console.log(`   - Valid submodules: ${validSubmodules}`);
      if (invalidSubmodules > 0) {
        console.log(`   - ⚠️ Invalid submodules: ${invalidSubmodules}`);
      }
    }
    
    // Check other metadata
    if (typeof module.duration !== 'number') {
      console.log('⚠️ Missing duration');
      result.issues.push('Missing duration');
    } else {
      console.log(`✅ Duration: ${module.duration} min`);
    }
    
    // Overall validity check
    if (result.issues.length > 0) {
      if (!result.valid) {
        console.log('❌ INVALID: Critical issues found');
      } else {
        console.log('⚠️ WARNING: Minor issues found');
      }
    } else {
      console.log('✅ VALID: All required data present');
    }
    
    results.push(result);
  });
  
  // Summary
  console.log('\n=== VALIDATION SUMMARY ===');
  const validModules = results.filter(r => r.valid).length;
  console.log(`✅ Valid modules: ${validModules}/${results.length}`);
  
  const modulesWithIssues = results.filter(r => r.issues.length > 0).length;
  console.log(`⚠️ Modules with issues: ${modulesWithIssues}/${results.length}`);
  
  const invalidModules = results.filter(r => !r.valid).length;
  console.log(`❌ Invalid modules: ${invalidModules}/${results.length}`);
  
  // Generate validation report
  const report = {
    timestamp: new Date().toISOString(),
    totalModulesTested: results.length,
    validModules,
    modulesWithIssues,
    invalidModules,
    results
  };
  
  return report;
};

// Run validation and save results
const report = validateModuleModalData();

// Save report to file
fs.writeFileSync('module-modal-validation.json', JSON.stringify(report, null, 2));
console.log('\nValidation report saved to module-modal-validation.json');