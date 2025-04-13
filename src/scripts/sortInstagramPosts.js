// Script to sort Instagram posts by view count
import fs from 'fs';
import path from 'path';

// Read the ChrisIG.js file
const filePath = path.join(process.cwd(), '..', 'ChrisIG.js');
console.log('Reading file from:', filePath);

const fileContent = fs.readFileSync(filePath, 'utf8');
console.log('File size:', (fileContent.length / 1024 / 1024).toFixed(2), 'MB');

// Look for the array content
const arrayContent = fileContent.match(/\[\s*\{[\s\S]*?\}\s*\]/);
if (!arrayContent) {
    console.error('Could not find array in the file');
    process.exit(1);
}

// Parse the array content
let posts;
try {
    posts = JSON.parse(arrayContent[0]);
    console.log('Successfully parsed array with', posts.length, 'items');
} catch (error) {
    console.error('Error parsing array:', error);
    process.exit(1);
}

// Sort the posts by view count
const sortedPosts = [...posts].sort((a, b) => b.viewCount - a.viewCount);

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the sorted results to a file
const outputPath = path.join(outputDir, 'sorted_posts.json');
fs.writeFileSync(outputPath, JSON.stringify(sortedPosts, null, 2));

// Log summary
console.log(`\nSorting complete!`);
console.log(`Total posts processed: ${posts.length}`);
console.log(`\nTop 5 posts by view count:`);
sortedPosts.slice(0, 5).forEach((post, index) => {
    console.log(`${index + 1}. ${post.userName} - ${post.viewCount.toLocaleString()} views (${post.code})`);
});
console.log(`\nResults saved to: ${outputPath}`); 