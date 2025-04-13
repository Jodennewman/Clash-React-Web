// This script extracts thumbnail names from a JSON file and saves them to a text file
// along with the information on whether each thumbnail is part of a module or a submodule.

const fs = require('fs');

// Function to extract thumbnails given the known course structure
function extractThumbnails(jsonFilePath, outputFilePath) {
  try {
    // Read and parse the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Array to store results
    const thumbnailEntries = [];

    // Check if this JSON conforms to the Course structure
    if (jsonData.categories && Array.isArray(jsonData.categories)) {
      // Iterate through all categories, sections, modules, and submodules as defined in the interfaces.
      jsonData.categories.forEach((category) => {
        if (category.sections && Array.isArray(category.sections)) {
          category.sections.forEach((section) => {
            if (section.modules && Array.isArray(section.modules)) {
              section.modules.forEach((module) => {
                // If the module has a thumbnail, add it with the module's title.
                if (module.thumbnail) {
                  thumbnailEntries.push({
                    thumbnail: module.thumbnail,
                    location: `Module: ${module.title}`
                  });
                }
                // Process all submodules if available.
                if (module.submodules && Array.isArray(module.submodules)) {
                  module.submodules.forEach((submodule) => {
                    // Some submodules may also have thumbnails.
                    if (submodule.thumbnail) {
                      thumbnailEntries.push({
                        thumbnail: submodule.thumbnail,
                        location: `Submodule: ${submodule.title} (Module: ${module.title})`
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      // Fallback to a generic recursive search if the structure is not as expected
      function processObject(obj, moduleName = "") {
        if (Array.isArray(obj)) {
          obj.forEach(item => {
            if (typeof item === 'object' && item !== null) processObject(item, moduleName);
          });
        } else if (typeof obj === 'object' && obj !== null) {
          if (obj.hasOwnProperty('thumbnail')) {
            let currentModule = moduleName;
            if (obj.module) currentModule = obj.module;
            if (obj.moduleName) currentModule = obj.moduleName;
            if (obj.name) currentModule = obj.name;
            let currentSubmodule = "Unknown Submodule";
            if (obj.submodule) currentSubmodule = obj.submodule;
            else if (obj.subModule) currentSubmodule = obj.subModule;
            else if (obj.submoduleName) currentSubmodule = obj.submoduleName;
            thumbnailEntries.push({
              thumbnail: obj.thumbnail,
              location: currentSubmodule === "Unknown Submodule"
                  ? `Module: ${currentModule || "Unknown Module"}`
                  : `Submodule: ${currentSubmodule} (Module: ${currentModule || "Unknown Module"})`
            });
          }
          for (const key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
              const newModule = key.toLowerCase().includes('module') ? key : moduleName;
              processObject(obj[key], newModule);
            }
          }
        }
      }
      processObject(jsonData);
    }

    // Format the output to include thumbnail and its location information
    const outputContent = thumbnailEntries.map(entry =>
        `Thumbnail: ${entry.thumbnail}\tLocation: ${entry.location}`
    ).join('\n');

    // Write the results to the output file
    fs.writeFileSync(outputFilePath, outputContent);
    console.log(`Successfully extracted ${thumbnailEntries.length} thumbnails to ${outputFilePath}`);
    return true;
  } catch (error) {
    console.error('Error processing JSON file:', error);
    return false;
  }
}

// Example usage: Replace these paths with your actual file paths.
const jsonFilePath = './course-data.json';
const outputFilePath = 'thumbnails-output.txt';

extractThumbnails(jsonFilePath, outputFilePath);