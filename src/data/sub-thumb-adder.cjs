// Function to check and fix thumbnail naming patterns in your JSON architecture
function fixThumbnails(jsonData) {
    let issuesFound = 0;
    let fixed = 0;

    // Make a deep copy to avoid modifying the original
    const data = JSON.parse(JSON.stringify(jsonData));

    // Iterate through each category
    if (!data.categories || !Array.isArray(data.categories)) {
        console.log("No categories array found in the data");
        return { issuesFound, fixed, data };
    }

    data.categories.forEach((category, categoryIndex) => {
        // Check if sections exist
        if (!category.sections || !Array.isArray(category.sections)) {
            console.log(`Category "${category.id}" does not have a sections array`);
            return;
        }

        category.sections.forEach((section, sectionIndex) => {
            // Use the section's number property if available, otherwise use index+1
            const sectionNumber = section.number ?
                String(section.number).padStart(2, '0') :
                String(sectionIndex + 1).padStart(2, '0');

            // Check if modules exist
            if (!section.modules || !Array.isArray(section.modules)) {
                console.log(`Section "${section.id}" does not have a modules array`);
                return;
            }

            section.modules.forEach((module, moduleIndex) => {
                const moduleId = module.id;

                // Check module thumbnail
                const expectedModuleThumbnail = `${sectionNumber}-${moduleId}.webp`;

                if (!module.thumbnail) {
                    console.log(`Module "${moduleId}" is missing a thumbnail property.`);
                    module.thumbnail = expectedModuleThumbnail;
                    console.log(`Added thumbnail: ${expectedModuleThumbnail}`);
                    issuesFound++;
                    fixed++;
                } else if (module.thumbnail !== expectedModuleThumbnail) {
                    console.log(`Module "${moduleId}" has incorrect thumbnail: ${module.thumbnail}`);
                    console.log(`Should be: ${expectedModuleThumbnail}`);
                    module.thumbnail = expectedModuleThumbnail;
                    console.log(`Fixed to: ${module.thumbnail}`);
                    issuesFound++;
                    fixed++;
                }

                // Check submodules if they exist
                if (module.submodules && Array.isArray(module.submodules)) {
                    module.submodules.forEach((submodule, subIndex) => {
                        if (!submodule.id) {
                            console.log(`Submodule at index ${subIndex} in module "${moduleId}" is missing an ID.`);
                            issuesFound++;
                            return; // Skip this submodule
                        }

                        // Extract submodule number from ID or use index + 1
                        let submoduleNumber;
                        const idMatch = submodule.id.match(/-(\d+)$/);
                        if (idMatch) {
                            submoduleNumber = idMatch[1];
                        } else {
                            submoduleNumber = String(subIndex + 1).padStart(2, '0');
                            console.log(`Could not extract submodule number from ID "${submodule.id}", using ${submoduleNumber} instead.`);
                        }

                        const expectedSubmoduleThumbnail = `${sectionNumber}-${moduleId}-${submoduleNumber}.webp`;

                        // Check for both lowercase and uppercase "thumbnail" property
                        // This handles the case where the property is inconsistently named
                        let thumbnailExists = false;
                        let thumbnailProperty = '';

                        if (submodule.thumbnail !== undefined) {
                            thumbnailExists = true;
                            thumbnailProperty = 'thumbnail';
                        } else if (submodule.Thumbnail !== undefined) {
                            thumbnailExists = true;
                            thumbnailProperty = 'Thumbnail';
                        }

                        if (!thumbnailExists) {
                            console.log(`Submodule "${submodule.id}" is missing a thumbnail property.`);
                            // Always use lowercase for consistency
                            submodule.thumbnail = expectedSubmoduleThumbnail;
                            // Remove any uppercase version if it exists but is undefined
                            if ('Thumbnail' in submodule) delete submodule.Thumbnail;
                            console.log(`Added thumbnail: ${expectedSubmoduleThumbnail}`);
                            issuesFound++;
                            fixed++;
                        } else {
                            const currentThumbnail = submodule[thumbnailProperty];
                            if (currentThumbnail !== expectedSubmoduleThumbnail) {
                                console.log(`Submodule "${submodule.id}" has incorrect thumbnail: ${currentThumbnail}`);
                                console.log(`Should be: ${expectedSubmoduleThumbnail}`);

                                // Always use lowercase for consistency
                                submodule.thumbnail = expectedSubmoduleThumbnail;
                                // Remove the uppercase property if it exists
                                if (thumbnailProperty === 'Thumbnail') {
                                    delete submodule.Thumbnail;
                                }

                                console.log(`Fixed to: ${expectedSubmoduleThumbnail}`);
                                issuesFound++;
                                fixed++;
                            } else if (thumbnailProperty === 'Thumbnail') {
                                // If the value is correct but using uppercase property, standardize to lowercase
                                submodule.thumbnail = submodule.Thumbnail;
                                delete submodule.Thumbnail;
                                console.log(`Standardized property name from 'Thumbnail' to 'thumbnail' for "${submodule.id}"`);
                                issuesFound++;
                                fixed++;
                            }
                        }
                    });
                }
            });
        });
    });

    return {
        issuesFound,
        fixed,
        data
    };
}

// Usage example:
// 1. If you're running this in a browser environment:
function runThumbnailFix() {
    // Load your JSON data (replace with your actual data loading method)
    fetch('your-course-data.json')
        .then(response => response.json())
        .then(jsonData => {
            const result = fixThumbnails(jsonData);
            console.log(`Total issues found: ${result.issuesFound}`);
            console.log(`Issues fixed: ${result.fixed}`);

            // Optionally download the fixed JSON
            if (result.fixed > 0) {
                downloadJSON(result.data, 'fixed-course-data.json');
            }
        });
}

// 2. If you're running this in Node.js:

const fs = require('fs');

// Load the JSON file
const jsonData = JSON.parse(fs.readFileSync('course-data.json', 'utf8'));
const result = fixThumbnails(jsonData);

console.log(`Total issues found: ${result.issuesFound}`);
console.log(`Issues fixed: ${result.fixed}`);

// Save the fixed JSON if changes were made
if (result.fixed > 0) {
  fs.writeFileSync('fixed-course-data.json', JSON.stringify(result.data, null, 2));
  console.log('Fixed data saved to fixed-course-data.json');
}


// 3. For quick testing, you can also paste your JSON and run directly in console:
/*
// Paste your JSON here
const courseData = {
  "title": "Your Course Title",
  "categories": [
    // Your categories, sections, modules and submodules...
  ]
};

const result = fixThumbnails(courseData);
console.log(`Total issues found: ${result.issuesFound}`);
console.log(`Issues fixed: ${result.fixed}`);
console.log(JSON.stringify(result.data, null, 2));
*/

// Helper function to download the fixed JSON in browser environment
function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}