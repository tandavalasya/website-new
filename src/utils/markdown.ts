import matter from 'gray-matter';
import { marked } from 'marked';
import { createLogger } from './logger';

const logger = createLogger('MarkdownParser');

/**
 * Result of parsing a markdown file
 */
export interface ParsedMarkdown {
    metadata: Record<string, any>;
    content: string;
    rawContent: string;
}

/**
 * Parse markdown content with YAML frontmatter
 * 
 * Follows Single Responsibility Principle - only handles markdown parsing
 * 
 * @param content - Raw markdown content with optional YAML frontmatter
 * @returns Parsed metadata and HTML content
 * 
 * @example
 * const markdown = `---
 * title: "My Post"
 * date: "2024-01-01"
 * ---
 * # Hello World
 * This is my post.`;
 * 
 * const result = parseMarkdown(markdown);
 * // result.metadata = { title: "My Post", date: "2024-01-01" }
 * // result.content = "<h1>Hello World</h1><p>This is my post.</p>"
 */
export function parseMarkdown(content: string): ParsedMarkdown {
    try {
        // Parse frontmatter using gray-matter
        const { data, content: markdownContent } = matter(content);

        // Convert markdown to HTML using marked
        const htmlContent = marked(markdownContent);

        logger.debug('Parsed markdown successfully', {
            hasMetadata: Object.keys(data).length > 0,
            contentLength: markdownContent.length,
        });

        return {
            metadata: data,
            content: htmlContent as string,
            rawContent: markdownContent,
        };
    } catch (error) {
        logger.error('Failed to parse markdown', { error });
        throw new Error(`Markdown parsing failed: ${(error as Error).message}`);
    }
}

/**
 * Resolve relative image paths in markdown to absolute paths
 * 
 * Converts relative paths like `./images/photo.jpg` to `/images/photo.jpg`
 * 
 * @param content - Markdown content with relative image paths
 * @param basePath - Base path to prepend (default: '/images')
 * @returns Markdown content with resolved image paths
 * 
 * @example
 * const markdown = '![Photo](./photo.jpg)';
 * const resolved = resolveImagePaths(markdown);
 * // Result: '![Photo](/images/photo.jpg)'
 */
export function resolveImagePaths(content: string, basePath = '/images'): string {
    try {
        // Replace relative image paths with absolute paths
        // Matches: ![alt](./path/to/image.jpg) or ![alt](../path/to/image.jpg)
        const resolved = content.replace(
            /!\[([^\]]*)\]\(\.\.?\/([^)]+)\)/g,
            (_match, alt, path) => {
                const absolutePath = `${basePath}/${path}`;
                logger.debug('Resolved image path', { original: path, resolved: absolutePath });
                return `![${alt}](${absolutePath})`;
            }
        );

        return resolved;
    } catch (error) {
        logger.error('Failed to resolve image paths', { error });
        return content; // Return original content on error
    }
}

/**
 * Validate frontmatter metadata against required fields
 * 
 * @param metadata - Parsed frontmatter metadata
 * @param requiredFields - Array of required field names
 * @returns Validation result with errors if any
 * 
 * @example
 * const metadata = { title: "My Post" };
 * const result = validateFrontmatter(metadata, ['title', 'date']);
 * // result.isValid = false
 * // result.errors = ['Missing required field: date']
 */
export function validateFrontmatter(
    metadata: Record<string, any>,
    requiredFields: string[]
): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const field of requiredFields) {
        if (!(field in metadata) || metadata[field] === undefined || metadata[field] === '') {
            errors.push(`Missing required field: ${field}`);
        }
    }

    const isValid = errors.length === 0;

    if (!isValid) {
        logger.warn('Frontmatter validation failed', { errors, metadata });
    }

    return { isValid, errors };
}

/**
 * Extract excerpt from markdown content
 * 
 * Takes the first paragraph or specified number of characters
 * 
 * @param content - Markdown content
 * @param maxLength - Maximum length of excerpt (default: 200)
 * @returns Excerpt text
 * 
 * @example
 * const content = "# Title\n\nThis is the first paragraph.\n\nSecond paragraph.";
 * const excerpt = extractExcerpt(content);
 * // Result: "This is the first paragraph."
 */
export function extractExcerpt(content: string, maxLength = 200): string {
    try {
        // Remove markdown headers
        const withoutHeaders = content.replace(/^#+\s+.+$/gm, '');

        // Get first paragraph
        const paragraphs = withoutHeaders.trim().split('\n\n');
        const firstParagraph = paragraphs[0] || '';

        // Trim to max length
        if (firstParagraph.length <= maxLength) {
            return firstParagraph.trim();
        }

        // Trim at word boundary
        const trimmed = firstParagraph.substring(0, maxLength);
        const lastSpace = trimmed.lastIndexOf(' ');
        const excerpt = lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed;

        return `${excerpt.trim()}...`;
    } catch (error) {
        logger.error('Failed to extract excerpt', { error });
        return '';
    }
}

/**
 * Calculate reading time for content
 * 
 * Assumes average reading speed of 200 words per minute
 * 
 * @param content - Text content
 * @returns Reading time in minutes (minimum 1)
 * 
 * @example
 * const content = "This is a short article with about 50 words...";
 * const readTime = calculateReadingTime(content);
 * // Result: 1 (minimum)
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes); // Minimum 1 minute
}
