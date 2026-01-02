# Implementation Plan: Tandavalasya Website

## Overview

This implementation plan focuses on building the Tandavalasya website with the fancy resume page as the immediate priority. The approach follows SOLID principles, uses modern React patterns, and ensures maintainability and scalability.

**Priority Order:**
1. Project skeleton and infrastructure
2. Resume page with PDF export (URGENT PRIORITY)
3. Content management system
4. Remaining public pages
5. Advanced features (reviews, contact form, etc.)

## Tasks

- [x] 1. Initialize project structure and dependencies
  - Create Vite + React + TypeScript project
  - Install core dependencies (React Router, Tailwind CSS, Framer Motion)
  - Install dev dependencies (Vitest, React Testing Library, fast-check, ESLint, Prettier)
  - Configure Tailwind with custom theme (pink, purple, orange gradients)
  - Set up TypeScript configuration with strict mode
  - Create directory structure (src/pages, src/components, src/services, src/utils, content/)
  - _Requirements: 10.1, 13.3_

- [x] 2. Set up content directory structure
  - Create content/ directory at project root
  - Create subdirectories: content/resume, content/pages, content/blog, content/events, content/instructors
  - Create content/resume/resume.md template with YAML frontmatter
  - Create public/images/resume-backgrounds/ directory for dance pose images
  - Add .gitkeep files to maintain directory structure
  - _Requirements: 1.4, 8.4_

- [x] 3. Implement core utilities
  - [x] 3.1 Create Logger utility class
    - Implement log levels (debug, info, warn, error)
    - Add structured logging with context
    - Add CloudWatch integration placeholder for production
    - _Requirements: 14.3, 14.4_
  
  - [x] 3.2 Create markdown parser utility
    - Implement parseMarkdown function using gray-matter and marked
    - Support YAML frontmatter extraction
    - Handle relative image path resolution
    - Add error handling for invalid markdown
    - _Requirements: 8.1, 8.2, 8.5_
  
  - [x] 3.3 Create ErrorBoundary component
    - Implement React error boundary with fallback UI
    - Add error logging with context
    - Support custom fallback components
    - _Requirements: 14.1, 14.2_

- [x] 4. Implement animation system
  - [x] 4.1 Create AnimationWrapper component
    - Define animation variants (fadeIn, slideUp, slideDown, scale, stagger)
    - Implement usePrefersReducedMotion hook
    - Support viewport-based animations with Framer Motion
    - Add delay and custom motion props support
    - _Requirements: 12.6, 12.7, 12.8, 12.10_
  
  - [ ]* 4.2 Write property test for reduced motion
    - **Property 22: Reduced Motion Respect**
    - **Validates: Requirements 12.10**

- [ ] 5. Create base layout components
  - [ ] 5.1 Create Navigation component
    - Implement responsive navigation with mobile hamburger menu
    - Add navigation items configuration
    - Support active link highlighting
    - Add smooth scroll behavior
    - _Requirements: 12.1, 12.2, 12.3_
  
  - [ ] 5.2 Create Footer component
    - Display copyright and social links
    - Add responsive layout
    - _Requirements: 7.6_
  
  - [ ] 5.3 Create App layout wrapper
    - Implement main app structure with navigation and footer
    - Add background gradient (orange-50 via pink-50 to purple-50)
    - Wrap with ErrorBoundary
    - _Requirements: 2.1_

- [x] 6. Implement Resume Page (PRIORITY)
  - [x] 6.1 Create ContentService for loading resume data
    - Implement loadResumeData() method
    - Parse markdown file from content/resume/resume.md
    - Extract frontmatter and content
    - Transform to ResumeData interface
    - Add error handling and logging
    - _Requirements: 1.4, 1.5_
  
  - [x] 6.2 Create Resume page component structure
    - Create Resume.tsx page component
    - Implement useResumeContent hook to load data
    - Create main resume container with proper semantic HTML
    - Add print-specific CSS classes
    - _Requirements: 1.1, 1.6_
  
  - [x] 6.3 Create BackgroundPoses component
    - Dynamically discover all images in public/images/resume-backgrounds/ directory
    - Intelligently position images based on count:
      - 1 image: center background, large size
      - 2 images: top-left and bottom-right corners
      - 3 images: top-left, top-right, bottom-center
      - 4+ images: distributed across corners and edges
    - Apply translucent effect (opacity: 0.05-0.1)
    - Use CSS positioning (fixed or absolute) with z-index behind content
    - Randomly rotate images slightly (-5° to 5°) for artistic effect
    - Scale images appropriately to avoid overwhelming the content
    - Ensure images don't interfere with content readability
    - Hide or make very subtle in print mode (opacity: 0.02)
    - Handle case when no images are present gracefully (no errors)
    - _Requirements: 1.1_
  
  - [x] 6.4 Create ResumeHeader component
    - Display name, title, contact information
    - Use gradient text for name (pink-600 to purple-600)
    - Responsive typography (larger on desktop)
    - _Requirements: 1.6_
  
  - [x] 6.5 Create ResumeSummary component
    - Display professional summary text
    - Use proper typography and spacing
    - _Requirements: 1.6_
  
  - [x] 6.6 Create ResumeSection component
    - Reusable section component for education, experience, etc.
    - Support different item types (education, experience, performance, award)
    - Use consistent styling with section headers
    - Prevent page breaks inside sections (CSS: page-break-inside: avoid)
    - _Requirements: 1.6_
  
  - [x] 6.7 Implement print optimization CSS
    - Create @media print styles
    - Set page size to A4 with 0.5in margins
    - Optimize font sizes for print (10pt body, 24pt h1, 14pt h2, 12pt h3)
    - Remove/hide interactive elements (buttons, animations)
    - Adjust background opacity for print
    - Ensure content fits single page
    - Use high-contrast colors
    - _Requirements: 1.3, 1.8, 1.9_
  
  - [x] 6.8 Create PrintButton component
    - Add "Download as PDF" button
    - Trigger window.print() on click
    - Hide button in print mode (CSS: display: none)
    - Position fixed or at top of page
    - _Requirements: 1.10_
  
  - [x] 6.9 Implement responsive design for resume
    - Mobile layout (single column, smaller fonts)
    - Tablet layout (optimized spacing)
    - Desktop layout (full design)
    - Test at breakpoints: 640px, 1024px
    - _Requirements: 1.7, 12.1, 12.2, 12.3_
  
  - [ ]* 6.10 Write property test for single-page fit
    - **Property 1: Resume Content Fits Single Page**
    - **Validates: Requirements 1.3**
  
  - [ ]* 6.11 Write unit tests for resume components
    - Test ResumeHeader renders with sample data
    - Test ResumeSection renders different item types
    - Test PrintButton triggers print dialog
    - _Requirements: 1.6, 1.10_

- [x] 7. Create sample resume content
  - Create content/resume/resume.md with Bhargavi's information
  - Include YAML frontmatter with personal info
  - Add markdown sections for summary, education, experience, performances, awards, certifications
  - Use placeholder text where actual content is not yet available
  - _Requirements: 1.4, 1.6_

- [x] 8. Set up App routing
  - Configure React Router with BrowserRouter
  - Add route for /resume page
  - Set resume as default route
  - Wrap with ErrorBoundary
  - Add gradient background
  - _Requirements: 2.1, 14.1_

- [ ] 9. Checkpoint - Resume page complete
  - Verify resume page renders correctly
  - Test print functionality and single-page fit
  - Test responsive design at all breakpoints
  - Verify background images display correctly (once added)
  - Manual testing and user review
  - Ask user if questions arise or if ready to proceed to other pages

