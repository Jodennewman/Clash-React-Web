import { readFileSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import fetch from 'node-fetch';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface ValidationResult {
  totalUrls: number;
  validUrls: number;
  errors: string[];
  warnings: string[];
}

async function validateSitemap(): Promise<ValidationResult> {
  const result: ValidationResult = {
    totalUrls: 0,
    validUrls: 0,
    errors: [],
    warnings: []
  };

  try {
    // Read sitemap file
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    const sitemapContent = readFileSync(sitemapPath, 'utf-8');

    // Parse XML
    const parser = new XMLParser();
    const parsed = parser.parse(sitemapContent);

    if (!parsed.urlset || !Array.isArray(parsed.urlset.url)) {
      result.errors.push('Invalid sitemap structure: missing urlset or urls');
      return result;
    }

    const urls: SitemapUrl[] = parsed.urlset.url;
    result.totalUrls = urls.length;

    // Validate each URL
    for (const url of urls) {
      try {
        // Check required fields
        if (!url.loc) {
          result.errors.push(`URL missing required 'loc' field`);
          continue;
        }

        // Validate URL format
        try {
          new URL(url.loc);
        } catch {
          result.errors.push(`Invalid URL format: ${url.loc}`);
          continue;
        }

        // Check URL accessibility
        try {
          const response = await fetch(url.loc);
          if (!response.ok) {
            result.errors.push(`URL not accessible (${response.status}): ${url.loc}`);
            continue;
          }
        } catch {
          result.errors.push(`Failed to fetch URL: ${url.loc}`);
          continue;
        }

        // Validate optional fields
        if (url.lastmod && !/^\d{4}-\d{2}-\d{2}/.test(url.lastmod)) {
          result.warnings.push(`Invalid lastmod format for URL: ${url.loc}`);
        }

        if (url.changefreq && !['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(url.changefreq)) {
          result.warnings.push(`Invalid changefreq value for URL: ${url.loc}`);
        }

        if (url.priority && (isNaN(Number(url.priority)) || Number(url.priority) < 0 || Number(url.priority) > 1)) {
          result.warnings.push(`Invalid priority value for URL: ${url.loc}`);
        }

        result.validUrls++;
      } catch (urlError) {
        const errorMessage = urlError instanceof Error 
          ? urlError.message 
          : String(urlError);
        result.errors.push(`Error processing URL ${url.loc}: ${errorMessage}`);
      }
    }
  } catch (sitemapError) {
    const errorMessage = sitemapError instanceof Error 
      ? sitemapError.message 
      : String(sitemapError);
    result.errors.push(`Error processing sitemap: ${errorMessage}`);
  }

  // Generate report
  console.log('\nSitemap Validation Report:');
  console.log('------------------------');
  console.log(`Total URLs: ${result.totalUrls}`);
  console.log(`Valid URLs: ${result.validUrls}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach(err => console.log(`- ${err}`));
  }

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach(warn => console.log(`- ${warn}`));
  }

  return result;
}

// Run validation
validateSitemap().catch(console.error); 