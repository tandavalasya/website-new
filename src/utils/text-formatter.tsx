import type { ReactNode } from 'react';

/**
 * Parse text with **bold** markdown syntax and return React elements
 * Example: "aged **5 to 75**" -> ["aged ", <strong>5 to 75</strong>]
 */
export function parseTextWithBold(text: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        // Add bold text
        parts.push(<strong key={match.index}>{match[1]}</strong>);
        
        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
}

/**
 * Parse text with *italic* markdown syntax
 */
export function parseTextWithItalic(text: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const regex = /\*(.+?)\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        // Add italic text
        parts.push(<em key={match.index}>{match[1]}</em>);
        
        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
}

/**
 * Parse text with both **bold** and *italic* markdown syntax
 */
export function parseTextWithFormatting(text: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        // Check if it's bold or italic
        if (match[1]) {
            // Bold
            parts.push(<strong key={match.index}>{match[2]}</strong>);
        } else if (match[3]) {
            // Italic
            parts.push(<em key={match.index}>{match[4]}</em>);
        }
        
        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
}
