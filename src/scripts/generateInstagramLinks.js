// Script to generate Instagram links from sorted posts
import fs from 'fs';
import path from 'path';

// Read the sorted posts JSON file
const inputPath = path.join(process.cwd(), 'output', 'sorted_posts.json');
const outputPath = path.join(process.cwd(), 'output', 'instagram_links.md');

// Read and parse the sorted posts
const sortedPosts = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Generate markdown content with Instagram links
const generateMarkdown = (posts) => {
    let markdown = '# Instagram Posts Sorted by Views\n\n';
    
    posts.forEach((post, index) => {
        const url = `https://www.instagram.com/${post.userName}/reel/${post.code}/?hl=en`;
        markdown += `${index + 1}. [${post.viewCount.toLocaleString()} views](${url})\n`;
    });

    return markdown;
};

// Generate and save the markdown file
const markdown = generateMarkdown(sortedPosts);
fs.writeFileSync(outputPath, markdown);

console.log(`\nGenerated Instagram links!`);
console.log(`Total links generated: ${sortedPosts.length}`);
console.log(`Results saved to: ${outputPath}`);

// Print the top 5 links as a preview
console.log('\nTop 5 Instagram Links:');
sortedPosts.slice(0, 5).forEach((post, index) => {
    const url = `https://www.instagram.com/${post.userName}/reel/${post.code}/?hl=en`;
    console.log(`${index + 1}. ${url} (${post.viewCount.toLocaleString()} views)`);
}); 