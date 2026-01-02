# Requirements Document

## Introduction

This document specifies the requirements for the Tandavalasya website, a professional and creative web presence for TandavaLasya School of Arts (Tandavalasya LLC), where Bhargavi Venkataraman (MFA Bharatanatyam, Grade B Doordarshan Artist) teaches Bharatanatyam classes. The website will serve as both a public-facing platform and a student management system, with an immediate focus on generating a fancy, printable resume page.

The website builds upon learnings from two previous implementations (v1 and v2) to create a refined, maintainable, and feature-rich platform.

## Glossary

- **Tandavalasya**: TandavaLasya School of Arts LLC, a Bharatanatyam dance school founded by Bhargavi Venkataraman
- **Bharatanatyam**: Classical Indian dance form from Tamil Nadu, India
- **Student_Portal**: Authenticated area where registered students access learning materials and manage their accounts
- **Admin_Dashboard**: Restricted interface for administrative functions and analytics
- **Resume_Generator**: System component that creates a printable HTML resume from markdown content
- **Content_Manager**: System for managing website content, blogs, and resume data from markdown files
- **SPA**: Single Page Application
- **CDK**: AWS Cloud Development Kit for infrastructure as code
- **Watermark_Service**: Component that applies Tandavalasya logo to images
- **Arangetram**: Debut solo performance marking a major milestone in a Bharatanatyam dancer's journey
- **Mudras**: Symbolic hand gestures used in Bharatanatyam to express ideas and emotions
- **Abhinaya**: The art of expression through facial movements and gestures in Bharatanatyam

## Requirements

### Requirement 1: Fancy Resume Page (URGENT PRIORITY)

**User Story:** As Bhargavi, I want to generate a fancy, creative resume page that can be exported as a single-page PDF, so that I can share my professional credentials in a visually stunning format.

#### Acceptance Criteria

1. WHEN a user accesses the resume page, THE Resume_Generator SHALL render an HTML page with translucent dance poses of Bhargavi as background elements
2. WHEN the resume page is displayed, THE Resume_Generator SHALL present all resume content in a modern, colorful, and creative layout with gradient accents
3. WHEN the resume page is printed or exported to PDF, THE Resume_Generator SHALL ensure all content fits on a single page without overflow
4. THE Content_Manager SHALL allow resume content to be maintained in markdown format within a content directory at the project root
5. WHEN resume markdown content is updated, THE Resume_Generator SHALL reflect changes on the next build without requiring code modifications
6. THE Resume_Generator SHALL include sections for professional summary, education, teaching experience, performances, awards, certifications, and contact information
7. WHEN the page is viewed on different screen sizes, THE Resume_Generator SHALL maintain visual appeal and readability with responsive design
8. THE Resume_Generator SHALL use CSS print media queries to optimize the layout for PDF export with proper margins and page breaks
9. WHEN the resume is printed, THE Resume_Generator SHALL use high-contrast colors and remove interactive elements for print optimization
10. THE Resume_Generator SHALL include a "Download as PDF" button that triggers the browser's print dialog with optimized settings

### Requirement 2: Homepage and About Section

**User Story:** As a visitor, I want to learn about Tandavalasya School of Arts, so that I can understand the teaching philosophy and decide if I want to enroll.

#### Acceptance Criteria

1. WHEN a visitor accesses the homepage, THE System SHALL display the Tandavalasya logo and welcome message with animated entrance effects
2. THE System SHALL present Bhargavi Venkataraman's teaching approach for Bharatanatyam, including benefits of body conditioning, stretching, and strengthening
3. WHEN the homepage loads, THE System SHALL display a carousel of excerpts from Google reviews and student testimonials with ratings
4. THE System SHALL include a hero section with prominent call-to-action buttons for "View Classes" and "Contact Us"
5. THE Content_Manager SHALL allow homepage content to be maintained in markdown format within the content directory
6. THE System SHALL display a classes highlight section showcasing beginner, intermediate, and performance preparation programs
7. WHEN a visitor scrolls through the homepage, THE System SHALL apply smooth scroll animations and stagger effects for visual appeal
8. THE System SHALL include the school's mission statement: "To nurture a lifelong love for Bharatanatyam by blending tradition with creativity, discipline with joy, and art with holistic well-being"

### Requirement 3: About Me Page

**User Story:** As a visitor, I want to learn about Bhargavi Venkataraman's background and credentials, so that I can understand her expertise and experience.

#### Acceptance Criteria

1. WHEN a visitor accesses the About page, THE System SHALL display Bhargavi's biography including her MFA in Bharatanatyam and Grade B Doordarshan Artist status
2. THE System SHALL include a mission and vision section with visually distinct cards featuring icons and gradient backgrounds
3. THE System SHALL display core tenets of the school including respect for tradition, creativity, physical health, mental resilience, community, and individual growth
4. THE System SHALL include an instructors section with profile cards showing name, title, photo, and short bio for each instructor
5. WHEN a visitor clicks on an instructor card, THE System SHALL navigate to a detailed instructor page with full biography
6. THE Content_Manager SHALL allow About page content and instructor profiles to be maintained in markdown format with JSON metadata
7. THE System SHALL include professional photographs of Bhargavi and other instructors with proper attribution
8. THE System SHALL display teaching philosophy emphasizing the blend of tradition with innovation and holistic well-being

### Requirement 4: Course Curriculum and Schedule Page

**User Story:** As a prospective student, I want to view the course curriculum and class schedules, so that I can understand what I will learn and when classes are offered.

#### Acceptance Criteria

1. WHEN a visitor accesses the curriculum page, THE System SHALL display structured information about beginner, intermediate, and performance preparation class levels
2. THE System SHALL present detailed information about body conditioning, stretching, and strengthening components integrated into each class
3. THE System SHALL include class schedules with days, times, duration, and location information organized by class level
4. THE System SHALL display class format options including in-person and virtual attendance where applicable
5. THE Content_Manager SHALL allow curriculum and schedule content to be maintained in markdown format with structured metadata
6. THE System SHALL include descriptions of what students will learn at each level including basic positions, movements, mudras, abhinaya, and choreography
7. WHEN displaying class information, THE System SHALL use color-coded cards or badges to distinguish between class levels
8. THE System SHALL include information about Arangetram preparation for advanced students

### Requirement 5: Events, Performances, and Gallery

**User Story:** As a visitor, I want to view past and upcoming events and performances, so that I can see the school's activities and student achievements.

#### Acceptance Criteria

1. WHEN a visitor accesses the events page, THE System SHALL display upcoming events with dates, times, locations, and descriptions in chronological order
2. THE System SHALL display past events and performances with descriptions, dates, and photo galleries
3. WHEN displaying event images, THE Watermark_Service SHALL ensure all images include the Tandavalasya logo watermark positioned in the bottom-right corner
4. THE System SHALL organize events into categories including performances, workshops, Arangetrams, and community events
5. THE Content_Manager SHALL allow event content to be maintained in markdown format with frontmatter metadata for date, title, category, and image references
6. THE System SHALL display a photo gallery grid with lightbox functionality for viewing full-size watermarked images
7. WHEN a visitor clicks on an event card, THE System SHALL navigate to a detailed event page with full description and photo gallery
8. THE System SHALL include filtering options to view events by category or time period (upcoming, past, all)

### Requirement 6: Blog Publishing System

**User Story:** As an admin, I want to publish blog posts about dance, teaching, and events, so that I can engage with students and the community.

#### Acceptance Criteria

1. WHEN an admin creates a blog post in markdown format with frontmatter, THE System SHALL render it as a formatted web page with proper typography
2. THE System SHALL display blog posts in reverse chronological order on a blog listing page with title, excerpt, date, and featured image
3. WHEN a visitor accesses a blog post, THE System SHALL display the full content with proper markdown rendering including headings, lists, links, and images
4. THE Content_Manager SHALL support blog posts written in markdown with frontmatter metadata including title, date, author, excerpt, featured image, and tags
5. THE System SHALL generate a blog index automatically from markdown files in the content/blog directory
6. THE System SHALL include suggested blog topics such as "The Beauty of Bharatanatyam", "Student Spotlights", "Upcoming Workshops", "History of Bharatanatyam", "Costume and Makeup", "Importance of Mudras", "Music in Bharatanatyam", and "Abhinaya: The Art of Expression"
7. WHEN displaying blog posts, THE System SHALL show read time estimates based on word count
8. THE System SHALL include social sharing buttons for each blog post to share on Facebook, Twitter, and WhatsApp

### Requirement 7: Contact Page

**User Story:** As a visitor, I want to contact Bhargavi or the school, so that I can inquire about classes or performances.

#### Acceptance Criteria

1. WHEN a visitor accesses the contact page, THE System SHALL display contact information including email, phone, and physical address
2. THE System SHALL provide a contact form with fields for name, email, phone, subject, and message
3. WHEN a contact form is submitted, THE System SHALL validate required fields (name, email, message) and display inline error messages for invalid inputs
4. WHEN a valid contact form is submitted, THE System SHALL send an email notification to the admin using EmailJS or AWS SES and display a success confirmation message
5. THE Content_Manager SHALL allow contact page content to be maintained in markdown format
6. THE System SHALL include social media links for Instagram and YouTube with icons
7. THE System SHALL display a map showing the school's location using embedded Google Maps or a static map image
8. WHEN the contact form is submitted successfully, THE System SHALL clear the form fields and show a thank you message

### Requirement 8: Content Management from Markdown

**User Story:** As an admin, I want to manage all website content from markdown files in a single directory, so that I can easily update content without touching code.

#### Acceptance Criteria

1. THE Content_Manager SHALL read all website content from markdown files organized in a content directory at the project root
2. THE Content_Manager SHALL support frontmatter metadata in markdown files using YAML format for structured data (title, date, author, tags, featured image, etc.)
3. WHEN markdown content is updated, THE System SHALL reflect changes on the next build or development server reload
4. THE Content_Manager SHALL organize content by type in subdirectories: content/pages, content/blog, content/events, content/resume, content/instructors
5. THE Content_Manager SHALL support relative image paths in markdown that resolve correctly to the public/images directory in the built site
6. THE System SHALL provide a clear content structure template with examples for each content type
7. THE Content_Manager SHALL support markdown extensions including tables, code blocks, and custom components where needed
8. THE System SHALL validate frontmatter metadata and provide helpful error messages for missing or invalid fields during build

### Requirement 9: Image Watermarking

**User Story:** As an admin, I want all hosted images to have the Tandavalasya logo watermark, so that I can protect my intellectual property.

#### Acceptance Criteria

1. WHEN an image is uploaded or processed for the website, THE Watermark_Service SHALL apply the Tandavalasya logo as a semi-transparent watermark
2. THE Watermark_Service SHALL position the watermark in the bottom-right corner with 20px padding and 40% opacity for subtle branding
3. THE Watermark_Service SHALL preserve the original image quality and aspect ratio while adding the watermark
4. THE Watermark_Service SHALL support common image formats (JPEG, PNG, WebP, GIF)
5. THE System SHALL store both original and watermarked versions of images in separate directories (originals/ and watermarked/)
6. THE Watermark_Service SHALL provide a command-line tool or build script to batch process images in a directory
7. WHEN watermarking fails for an image, THE System SHALL log the error and continue processing remaining images
8. THE Watermark_Service SHALL scale the watermark logo proportionally based on the source image dimensions (minimum 50px, maximum 150px width)

### Requirement 10: Infrastructure and Deployment

**User Story:** As a developer, I want a cost-effective, maintainable infrastructure setup, so that the website can run reliably within budget constraints.

#### Acceptance Criteria

1. THE System SHALL be deployed as a lightweight Single Page Application (SPA) built with React or similar modern framework
2. THE Infrastructure SHALL use AWS services (S3 for storage, API Gateway for APIs, Lambda for serverless functions, CloudWatch for monitoring) where backend functionality is needed
3. THE Infrastructure SHALL be defined using AWS CDK (TypeScript or Python) for reproducible, version-controlled deployments
4. THE System SHALL support deployment of static assets via Netlify with automatic builds from Git or AWS S3 with CloudFront CDN
5. THE Infrastructure SHALL include DDoS protection through CloudFront with AWS Shield Standard and rate limiting on API Gateway
6. THE Infrastructure SHALL operate within a monthly budget of $15 USD including hosting, CDN, serverless functions, and monitoring
7. THE System SHALL integrate with the existing Porkbun domain registration using DNS configuration
8. THE Infrastructure SHALL include monitoring and logging via CloudWatch with alerts for errors and performance issues
9. THE CDK package SHALL include separate stacks for development, staging, and production environments
10. THE System SHALL implement caching strategies to minimize Lambda invocations and reduce costs (CloudFront caching, API Gateway caching)

### Requirement 11: Google Reviews Integration

**User Story:** As a visitor, I want to see authentic reviews from students, so that I can trust the quality of instruction.

#### Acceptance Criteria

1. WHEN the homepage loads, THE System SHALL display excerpts from Google reviews fetched via Google Places API
2. THE System SHALL fetch and cache Google reviews using AWS Lambda to minimize API costs and improve performance
3. THE System SHALL display reviewer names, profile photos, star ratings (1-5), review text excerpts, and review dates
4. THE System SHALL update cached reviews periodically (daily) using a scheduled Lambda function or manual trigger
5. IF Google reviews API is unavailable or rate-limited, THEN THE System SHALL display manually curated student testimonials from reviews.json as fallback
6. THE System SHALL implement a reviews carousel with navigation controls (previous/next arrows and pagination dots) showing 1-3 reviews per page based on screen size
7. THE System SHALL indicate the source of each review with a "Google Review" badge or icon for transparency
8. THE System SHALL handle API errors gracefully with retry logic (3 attempts with exponential backoff) and fallback to cached data

### Requirement 12: Responsive Design and Animations

**User Story:** As a visitor on any device, I want the website to look professional and be easy to navigate, so that I can access information regardless of my device.

#### Acceptance Criteria

1. WHEN the website is accessed on mobile devices (< 640px), THE System SHALL display a responsive layout with hamburger menu navigation and single-column content
2. WHEN the website is accessed on tablets (640px - 1024px), THE System SHALL display a responsive layout optimized for medium screens with 2-column grids where appropriate
3. WHEN the website is accessed on desktop (> 1024px), THE System SHALL display a responsive layout optimized for large screens with multi-column grids and expanded navigation
4. THE System SHALL ensure all interactive elements (buttons, links, form inputs) are touch-friendly with minimum 44x44px tap targets on mobile
5. THE System SHALL maintain visual consistency with the Tandavalasya brand colors (pink, purple, orange gradients) across all screen sizes
6. THE System SHALL implement smooth page transitions using Framer Motion or similar animation library
7. THE System SHALL apply entrance animations (fade-in, slide-up, scale) to content sections as they enter the viewport
8. THE System SHALL use stagger animations for lists and grids to create visual interest without overwhelming users
9. THE System SHALL implement hover effects on interactive elements (scale, shadow, color transitions) for desktop users
10. THE System SHALL ensure animations respect user preferences for reduced motion (prefers-reduced-motion media query)

### Requirement 13: Performance and Optimization

**User Story:** As a visitor, I want the website to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE System SHALL achieve a Lighthouse performance score of 90 or higher for desktop and 80 or higher for mobile
2. THE System SHALL implement lazy loading for images below the fold using native loading="lazy" attribute or Intersection Observer
3. THE System SHALL minify and bundle CSS and JavaScript assets using Vite, Webpack, or similar build tool
4. THE System SHALL use modern image formats (WebP with JPEG/PNG fallbacks) and responsive images with srcset for optimal delivery
5. THE System SHALL implement caching strategies for static assets with appropriate cache-control headers (1 year for immutable assets, shorter for HTML)
6. THE System SHALL preload critical resources (fonts, hero images, CSS) to improve First Contentful Paint (FCP)
7. THE System SHALL code-split JavaScript bundles by route to reduce initial bundle size
8. THE System SHALL achieve Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
9. THE System SHALL compress text assets (HTML, CSS, JS) using gzip or brotli compression
10. THE System SHALL minimize third-party scripts and load them asynchronously where possible (Google Analytics, EmailJS)

### Requirement 14: Error Handling and Logging

**User Story:** As a developer, I want comprehensive error handling and logging, so that I can quickly diagnose and fix issues.

#### Acceptance Criteria

1. THE System SHALL implement error boundaries around major components to prevent full application crashes
2. WHEN an error occurs in a component, THE System SHALL display a user-friendly error message and log detailed error information
3. THE System SHALL implement a centralized logging utility with log levels (debug, info, warn, error) for consistent logging
4. THE System SHALL log all API calls, errors, and user interactions with structured context (timestamp, user agent, page, action)
5. WHEN an API call fails, THE System SHALL implement automatic retry logic with exponential backoff (3 attempts maximum)
6. THE System SHALL provide graceful degradation when non-critical features fail (e.g., show cached reviews if API fails)
7. THE System SHALL log errors to CloudWatch Logs in production for monitoring and debugging
8. THE System SHALL sanitize error messages shown to users to avoid exposing sensitive information

### Requirement 15: Accessibility Compliance

**User Story:** As a visitor with disabilities, I want the website to be accessible, so that I can navigate and understand the content.

#### Acceptance Criteria

1. THE System SHALL achieve WCAG 2.1 Level AA compliance for accessibility
2. THE System SHALL provide alt text for all images describing the content or purpose
3. THE System SHALL ensure sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text) throughout the site
4. THE System SHALL support keyboard navigation for all interactive elements with visible focus indicators
5. THE System SHALL use semantic HTML elements (header, nav, main, article, footer) for proper document structure
6. THE System SHALL provide ARIA labels and roles where semantic HTML is insufficient
7. THE System SHALL ensure form inputs have associated labels and helpful error messages
8. THE System SHALL support screen readers with proper heading hierarchy (h1-h6) and descriptive link text
9. THE System SHALL respect user preferences for reduced motion in animations
10. THE System SHALL ensure all videos have captions or transcripts where applicable

### Requirement 16: SEO Optimization

**User Story:** As a business owner, I want the website to rank well in search engines, so that potential students can find us easily.

#### Acceptance Criteria

1. THE System SHALL include proper meta tags (title, description, keywords) on all pages with unique, descriptive content
2. THE System SHALL generate a sitemap.xml file listing all public pages for search engine crawlers
3. THE System SHALL implement Open Graph tags for social media sharing with appropriate images and descriptions
4. THE System SHALL use semantic HTML with proper heading hierarchy for content structure
5. THE System SHALL include structured data (JSON-LD) for organization, events, and reviews to enhance search results
6. THE System SHALL ensure all pages have descriptive, SEO-friendly URLs (e.g., /classes/beginner instead of /page?id=123)
7. THE System SHALL implement canonical URLs to prevent duplicate content issues
8. THE System SHALL optimize images with descriptive filenames and alt text
9. THE System SHALL achieve good Core Web Vitals scores as they impact search rankings
10. THE System SHALL include a robots.txt file to guide search engine crawlers


### Requirement 9: Professional Artist Profile/Resume System

**User Story:** As Bhargavi Venkataraman, I want a comprehensive professional Artist Profile/Resume that accurately represents my classical dance credentials, lineage, and achievements in an elegant format, so that I can share my professional identity with cultural organizations, students, and collaborators.

#### Acceptance Criteria

1. THE Resume_System SHALL maintain all resume data in a structured format (YAML/JSON) that separates content from presentation
2. THE Resume_System SHALL support configuration to enable/disable specific sections without modifying code
3. THE Resume_System SHALL use ONLY the data provided in the source files and SHALL NOT generate or invent any performances, awards, or credentials
4. THE Resume_System SHALL render content in a classical, elegant, and culturally rich tone appropriate for arts and culture contexts
5. THE Resume_System SHALL use clean Markdown formatting with distinct sections for readability and maintainability

#### Source Material Requirements (Anti-Hallucination Rules)

6. THE Resume_System SHALL display candidate identity exactly as specified:
   - Name: "Bhargavi Venkataraman"
   - Titles: "Classical Danseuse | Choreographer | Artistic Director"
   - Location: "Vancouver, BC (PR Status)"
   - Website: "www.tandavalasya.com"
   - Email: "bhargavi@tandavalasya.com"

7. THE Professional Summary section SHALL include these specific facts and ONLY these facts:
   - Grade B Doordarshan artist status
   - MFA in Bharatanatyam from SASTRA University
   - Teaching career commencement in 2013
   - Vazhuvoor tradition with analytical precision
   - Active performance and teaching in both Seattle, WA and Vancouver, BC

8. THE Guru Parampara (Lineage) section SHALL list exactly 4 Gurus in chronological order with their specific contributions:
   - **Smt. Dakshayanee Ramachandran (Nrithyaarpana)**: Foundational training from age 8 to college; Arangetram completed at age 11
   - **Smt. Bhagyashree Satthish (Om Nrithyakshethra)**: 10+ years training; Mastered Nattuvangam; Solo career launch; Guinness Record participation
   - **Padma Vibhushan Dr. Padma Subrahmanyam**: MFA advisor via SASTRA University
   - **Kassiyet Adilkhankyzy**: Current advanced training (2 years) focusing on Thillana and Padam

9. THE Professional Experience section SHALL include exactly 3 roles with specified details:
   - **Role 1 - Founder & Artistic Director @ TandavaLasya**: Mentors students aged 5 to 75; Students perform/compete in Seattle and Vancouver
   - **Role 2 - Instructor @ Om Nrithyakshethra**: Trained junior batches and managed production logistics
   - **Role 3 - Faculty & Performer @ Rangeela Dance Company**: Classical Dance department faculty and troupe performer

10. THE Awards & Major Records section SHALL include exactly these achievements:
    - Guinness World Record: Participant in "Largest Bharatanatyam Dance Lesson" (Chennai)
    - Asia Book of Records: Participant in 'Nitya Akhanda Nrittam'
    - Best Performer (2016): Awarded by Sri Parthasarathy Swami Sabha
    - Historic Event: Selected as one of 1,000 dancers for Tanjore Brihadeeswarar Temple 1000th Year Celebration

11. THE Teaching Philosophy section SHALL include this exact quote:
    > "My methodology integrates physical conditioning with the art form. I utilize Bharatanatyam's geometric postures to enhance core strength and flexibility, proving that classical dance is a rigorous fitness discipline for the body as well as a spiritual discipline for the mind."

#### Layout and Design Requirements

12. THE Resume_Generator SHALL use a two-column layout with sidebar (30%) and main content (70%)
13. THE Resume_Generator SHALL use the following color scheme:
    - Primary: #7a1f1f (Deep Classical Red)
    - Gold: #bfa668 (Muted Gold)
    - Text: #222
    - Background: #FAFAFA
    - Sidebar Background: #161616

14. THE Resume_Generator SHALL use the following font hierarchy:
    - Headings: Cinzel (serif)
    - Subheadings: Playfair Display (serif, italic)
    - Body: Lato (sans-serif)
    - Monospace: JetBrains Mono (for contact info, technical details)

15. THE Resume_Generator SHALL include a watermark background image at 4% opacity positioned centrally
16. THE Resume_Generator SHALL display a profile photo in the sidebar (260px height) with gold border
17. THE Resume_Generator SHALL include a circular header thumbnail (70px) in the main content area
18. THE Resume_Generator SHALL render section titles with subtle gray underline divider extending to the right
19. THE Resume_Generator SHALL include a footer gallery with 2 performance images in a grid layout
20. THE Resume_Generator SHALL render ALL main content text as LEFT-ALIGNED (not justified or centered)

#### Sidebar Content Requirements

21. THE Resume_Generator SHALL display in the sidebar (in order):
    - Profile photo (top)
    - Contact information (location, website, email)
    - Education section (MFA and B.E. degrees)
    - Awards & Records section (in compact format with subtle left border accent)
    - Secondary image (bottom)

22. THE Sidebar sections SHALL use subtle styling with:
    - Section headers: Uppercase, smaller font (0.95rem), gold color, thin bottom border (#333)
    - Left border accent: Thin (1px), gold with 30% opacity (gold/30) for elegance
    - Label text: Smaller uppercase (0.75rem), white with 90% opacity, tracking-wider
    - Content text: JetBrains Mono font (0.8rem), light gray (#bbb)
    - Increased spacing between entries (space-y-4) for breathing room

23. THE Education section in sidebar SHALL display:
    - Master of Fine Arts (MFA) - Bharatanatyam, SASTRA University
    - B.E. (Engineering) - Technical Background

24. THE Awards section in sidebar SHALL use compact format with:
    - Subtle gold left border (1px, 30% opacity)
    - Bold title (0.85rem)
    - Description in smaller font (0.8rem)
    - Efficient space utilization

#### Main Content Requirements

25. THE Main Content area SHALL display sections in this order:
    - Header (name, title, thumbnail)
    - Professional Summary
    - Guru Parampara (Lineage)
    - Professional Experience
    - Teaching Philosophy (quote box)
    - Repertoire & Highlights
    - Footer Gallery

26. THE Guru Parampara section SHALL render WITHOUT numeric bullets, styled like Professional Experience:
    - Guru name in bold Playfair Display font (1rem)
    - Description in regular body font (0.92rem), LEFT-ALIGNED
    - No bullet points or number markers
    - Clean, minimal presentation

27. THE Professional Experience section SHALL render each role with:
    - Title in bold (left side)
    - Role in italic primary color (right side)
    - Description in LEFT-ALIGNED body text (not justified)
    - Teaching Philosophy as a special quote-style box with gold left border (4px)

28. THE Teaching Philosophy box SHALL be styled with:
    - White background
    - Gold left border (4px)
    - Subtle shadow
    - Title in serif font (0.95rem)
    - Quote text in italic, LEFT-ALIGNED (not centered)
    - Wrapped in a section tag with proper spacing (mt-5)

29. THE Repertoire & Highlights section SHALL display with:
    - Custom bullet points (•) with no left padding (pl-0)
    - Bold emphasis for key terms (e.g., "Prestigious Sabhas", "PanchaBhootha Sthalam")
    - Regular body text for descriptions
    - LEFT-ALIGNED text
    - Consistent alignment with other main content sections (no extra indentation)

30. THE Footer gallery images SHALL be styled with:
    - Top-aligned object positioning (object-top) to prevent head cropping
    - Sketch/pencil effect: grayscale(100%) contrast(1.3) brightness(1.15)
    - Alternative effects available: pencil-sketch-effect, oil-paint-effect
    - Maintains artistic elegance while being print-friendly

30. THE Resume_Generator SHALL parse markdown formatting in YAML content:
    - **text** renders as bold (<strong>)
    - *text* renders as italic (<em>)
    - Applies to all sections including descriptions, achievements, and quotes

#### Configuration System Requirements

31. THE Resume_System SHALL use a YAML configuration file that specifies:
    - Which sections are enabled/disabled
    - Section ordering
    - Sidebar content and ordering
    - Color scheme customization
    - Font selections
    - Image paths

28. THE Resume_System SHALL use a YAML data file that contains:
    - Personal information
    - Professional summary text
    - Guru Parampara entries (array of objects)
    - Professional experience entries (array of objects)
    - Teaching philosophy quote
    - Education entries
    - Awards entries
    - Repertoire entries

29. THE Resume_System SHALL validate that all required fields are present in the data file
30. THE Resume_System SHALL provide clear error messages if required data is missing
31. THE Resume_System SHALL allow section reordering via configuration without code changes
32. THE Resume_System SHALL support multiple resume profiles (e.g., "full", "abbreviated", "academic")

#### Print and Export Requirements

33. THE Resume_Generator SHALL ensure all content fits on a single A4 page (210mm x 297mm) when printed
34. THE Resume_Generator SHALL use print-specific CSS with exact color preservation
35. THE Resume_Generator SHALL remove interactive elements (buttons) in print mode
36. THE Resume_Generator SHALL maintain sidebar dark background and gold accents in print output
37. THE Resume_Generator SHALL render the Teaching Philosophy box with visible border and background in print mode
38. THE Resume_Generator SHALL include a "Download as PDF" button that triggers browser print dialog with optimized settings

#### Data Integrity and Accuracy Requirements

39. THE Resume_System SHALL preserve all specific details exactly as provided including:
    - Guru names and affiliations
    - Institution names (SASTRA University, Om Nrithyakshethra, etc.)
    - Award titles and organizations
    - Age ranges (5 to 75)
    - Locations (Seattle, WA; Vancouver, BC; Chennai)
    - Years and dates (2013, 2016, etc.)

40. THE Resume_System SHALL NOT add generic descriptions or responsibilities not present in source data
41. THE Resume_System SHALL NOT modify or paraphrase the Teaching Philosophy quote
42. THE Resume_System SHALL NOT invent performances, venues, or achievements
43. THE Resume_System SHALL maintain cultural terminology exactly as specified (Arangetram, Nattuvangam, Thillana, Padam, etc.)

