# Design Document

## Introduction

This document provides the technical design for the Tandavalasya website, a modern, professional web platform for TandavaLasya School of Arts. The design prioritizes the fancy resume page as the immediate deliverable, followed by the complete public-facing website with content management capabilities.

The design builds upon successful patterns from v2 (React SPA with SOLID principles) while addressing the immediate need for a printable resume and long-term goals of a full-featured website.

## Overview

### System Architecture

The Tandavalasya website follows a modern JAMstack architecture:

- **Frontend**: React SPA with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling with custom theme
- **Animations**: Framer Motion for smooth, performant animations
- **Content**: Markdown files with frontmatter for easy content management
- **Build**: Vite for fast development and optimized production builds
- **Hosting**: Netlify for static hosting with automatic deployments
- **Backend**: AWS Lambda + API Gateway for serverless functions (reviews, contact form)
- **Infrastructure**: AWS CDK for infrastructure as code

### Design Principles

1. **Mobile-First**: Design for mobile devices first, then scale up
2. **Performance**: Optimize for fast load times and smooth interactions
3. **Accessibility**: WCAG 2.1 Level AA compliance throughout
4. **Maintainability**: Clean code following SOLID principles
5. **Content-Driven**: Easy content updates without code changes
6. **Cost-Effective**: Minimize infrastructure costs while maintaining quality


## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Netlify CDN / CloudFront                  │
│                    (Static Asset Delivery)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      React SPA (Vite)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Services   │     │
│  │  - Home      │  │  - Layout    │  │  - API       │     │
│  │  - Resume    │  │  - UI        │  │  - Content   │     │
│  │  - About     │  │  - Animation │  │  - Logger    │     │
│  │  - Blog      │  │  - Error     │  │  - Error     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Services (Optional)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Lambda     │  │  API Gateway │  │  CloudWatch  │     │
│  │  - Reviews   │  │  - REST API  │  │  - Logs      │     │
│  │  - Contact   │  │  - CORS      │  │  - Metrics   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Google Places│  │   EmailJS    │  │   Porkbun    │     │
│  │     API      │  │   (Email)    │  │    (DNS)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
tandavalasya-website/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Resume.tsx      # PRIORITY: Fancy resume page
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Events.tsx
│   │   ├── Schedule.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   ├── layout/         # Layout components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Background.tsx
│   │   └── ui/             # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── AnimationWrapper.tsx
│   ├── services/           # Business logic
│   │   ├── api.service.ts
│   │   ├── content.service.ts
│   │   └── reviews.service.ts
│   ├── utils/              # Utilities
│   │   ├── logger.ts
│   │   ├── error-handler.ts
│   │   └── markdown.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   └── styles/             # Global styles
│       └── index.css
├── content/                # Markdown content
│   ├── pages/
│   ├── blog/
│   ├── events/
│   ├── resume/
│   │   └── resume.md       # Resume content
│   └── instructors/
├── public/
│   ├── images/
│   │   ├── originals/
│   │   └── watermarked/
│   └── logo.png
├── infrastructure/         # AWS CDK
│   ├── lib/
│   │   ├── website-stack.ts
│   │   └── lambda-stack.ts
│   └── bin/
│       └── app.ts
└── scripts/
    └── watermark.ts        # Image watermarking script
```


## Components and Interfaces

### 1. Resume Page Component (PRIORITY)

The fancy resume page is the top priority feature. It must be visually stunning, creative, and export perfectly to a single-page PDF.

#### Resume Component Structure

```typescript
interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }>;
  experience: Array<{
    title: string;
    organization: string;
    period: string;
    description: string;
    achievements?: string[];
  }>;
  performances: Array<{
    title: string;
    venue: string;
    date: string;
    description?: string;
  }>;
  awards: Array<{
    title: string;
    organization: string;
    year: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    year: string;
  }>;
  skills: string[];
}

// Resume.tsx
const Resume: React.FC = () => {
  const resumeData = useResumeContent(); // Load from markdown
  
  return (
    <div className="resume-container">
      {/* Background with translucent dance poses */}
      <BackgroundPoses />
      
      {/* Main resume content */}
      <div className="resume-content">
        <ResumeHeader data={resumeData.personalInfo} />
        <ResumeSummary text={resumeData.summary} />
        <ResumeSection title="Education" items={resumeData.education} />
        <ResumeSection title="Experience" items={resumeData.experience} />
        <ResumeSection title="Performances" items={resumeData.performances} />
        <ResumeSection title="Awards" items={resumeData.awards} />
      </div>
      
      {/* Print button (hidden in print) */}
      <PrintButton />
    </div>
  );
};
```

#### Resume Styling Strategy

**Screen View:**
- Colorful gradients (pink-600 to purple-600, orange-500 to pink-600)
- Translucent dance pose images as background (opacity: 0.05-0.1)
- Modern typography with Inter or Poppins font
- Smooth animations on scroll
- Responsive layout (mobile, tablet, desktop)

**Print View (CSS @media print):**
- Remove background images or make them very subtle
- High contrast colors for readability
- Optimize spacing to fit single page
- Remove interactive elements (buttons, animations)
- Use print-safe fonts
- Ensure proper page breaks

```css
/* Print-specific styles */
@media print {
  @page {
    size: A4;
    margin: 0.5in;
  }
  
  .resume-container {
    background: white;
    max-width: 100%;
  }
  
  .background-poses {
    opacity: 0.02; /* Very subtle in print */
  }
  
  .print-button {
    display: none;
  }
  
  /* Prevent page breaks inside sections */
  .resume-section {
    page-break-inside: avoid;
  }
  
  /* Optimize font sizes for print */
  body {
    font-size: 10pt;
    line-height: 1.4;
  }
  
  h1 { font-size: 24pt; }
  h2 { font-size: 14pt; }
  h3 { font-size: 12pt; }
}
```


### 2. Content Management System

The content management system allows all website content to be managed through markdown files.

#### Content Service Interface

```typescript
interface ContentService {
  // Load content from markdown files
  loadPage(slug: string): Promise<PageContent>;
  loadBlogPosts(): Promise<BlogPost[]>;
  loadBlogPost(slug: string): Promise<BlogPost>;
  loadEvents(): Promise<Event[]>;
  loadInstructors(): Promise<Instructor[]>;
  loadResumeData(): Promise<ResumeData>;
}

interface PageContent {
  slug: string;
  title: string;
  content: string; // Rendered HTML from markdown
  metadata: Record<string, any>;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  featuredImage?: string;
  tags: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  category: 'performance' | 'workshop' | 'arangetram' | 'community';
  description: string;
  images: string[];
  isPast: boolean;
}

interface Instructor {
  id: string;
  name: string;
  title: string;
  image: string;
  shortBio: string;
  detailedBio: string;
}
```

#### Markdown Processing

```typescript
// markdown.ts
import matter from 'gray-matter';
import { marked } from 'marked';

export function parseMarkdown(content: string) {
  const { data, content: markdown } = matter(content);
  const html = marked(markdown);
  
  return {
    metadata: data,
    content: html
  };
}

// Example markdown file structure
/*
---
title: "The Beauty of Bharatanatyam"
date: "2024-06-01"
author: "Bhargavi Venkataraman"
excerpt: "Discover the grace and tradition of Bharatanatyam dance."
featuredImage: "/images/blog/bharatanatyam-beauty.jpg"
tags: ["dance", "tradition", "culture"]
---

# The Beauty of Bharatanatyam

Bharatanatyam is one of the oldest classical dance forms...
*/
```


### 3. Reviews Integration Service

Fetches and displays Google reviews with fallback to local reviews.

```typescript
interface ReviewsService {
  fetchReviews(): Promise<Review[]>;
  getCachedReviews(): Review[];
  updateCache(reviews: Review[]): void;
}

interface Review {
  id: string;
  name: string;
  profilePhoto?: string;
  rating: number; // 1-5
  text: string;
  date: string;
  source: 'google' | 'local';
}

// Implementation with retry and fallback
class GoogleReviewsService implements ReviewsService {
  private cache: Review[] = [];
  private readonly MAX_RETRIES = 3;
  
  async fetchReviews(): Promise<Review[]> {
    try {
      // Try to fetch from Google Places API via Lambda
      const response = await this.fetchWithRetry('/api/reviews');
      const googleReviews = this.transformGoogleReviews(response.data);
      
      // Merge with local reviews
      const localReviews = await this.loadLocalReviews();
      const allReviews = [...googleReviews, ...localReviews];
      
      // Update cache
      this.updateCache(allReviews);
      
      return allReviews;
    } catch (error) {
      // Fallback to cached or local reviews
      logger.warn('Failed to fetch Google reviews, using fallback', error);
      return this.getCachedReviews();
    }
  }
  
  private async fetchWithRetry(url: string, attempt = 1): Promise<any> {
    try {
      return await fetch(url);
    } catch (error) {
      if (attempt < this.MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }
}
```

### 4. Image Watermarking Service

Applies watermark to images for brand protection.

```typescript
interface WatermarkService {
  watermarkImage(inputPath: string, outputPath: string): Promise<void>;
  batchWatermark(directory: string): Promise<void>;
}

// Implementation using sharp library
import sharp from 'sharp';

class ImageWatermarkService implements WatermarkService {
  private readonly WATERMARK_PATH = './public/logo.png';
  private readonly WATERMARK_OPACITY = 0.4;
  private readonly WATERMARK_POSITION = 'southeast';
  private readonly WATERMARK_PADDING = 20;
  
  async watermarkImage(inputPath: string, outputPath: string): Promise<void> {
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Scale watermark based on image size
      const watermarkWidth = Math.min(
        Math.max(metadata.width! * 0.15, 50),
        150
      );
      
      const watermark = await sharp(this.WATERMARK_PATH)
        .resize(watermarkWidth)
        .composite([{
          input: Buffer.from([255, 255, 255, Math.floor(255 * this.WATERMARK_OPACITY)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: 'dest-in'
        }])
        .toBuffer();
      
      await image
        .composite([{
          input: watermark,
          gravity: this.WATERMARK_POSITION,
          blend: 'over'
        }])
        .toFile(outputPath);
        
      logger.info('Watermarked image', { inputPath, outputPath });
    } catch (error) {
      logger.error('Failed to watermark image', { inputPath, error });
      throw error;
    }
  }
  
  async batchWatermark(directory: string): Promise<void> {
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    
    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const outputPath = path.join(directory, '../watermarked', file);
      await this.watermarkImage(inputPath, outputPath);
    }
  }
}
```


### 5. Animation System

Centralized animation system using Framer Motion for consistent, performant animations.

```typescript
// AnimationWrapper.tsx
import { motion, Variants } from 'framer-motion';

const ANIMATION_VARIANTS: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

interface AnimationWrapperProps {
  children: React.ReactNode;
  variant?: keyof typeof ANIMATION_VARIANTS;
  delay?: number;
  className?: string;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  variant = 'fadeIn',
  delay = 0,
  className
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={ANIMATION_VARIANTS[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hook to detect reduced motion preference
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}
```

### 6. Error Handling System

Comprehensive error handling with boundaries and logging.

```typescript
// ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean; error?: Error }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error boundary caught error', { error, errorInfo });
    this.props.onError?.(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!);
      }
      
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Logger utility
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

class Logger {
  private context: string;
  
  constructor(context: string) {
    this.context = context;
  }
  
  private log(level: LogLevel, message: string, data?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      data
    };
    
    // Console logging
    console[level](message, logEntry);
    
    // In production, send to CloudWatch
    if (process.env.NODE_ENV === 'production') {
      this.sendToCloudWatch(logEntry);
    }
  }
  
  debug(message: string, data?: any) {
    this.log(LogLevel.DEBUG, message, data);
  }
  
  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }
  
  warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }
  
  error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }
  
  private async sendToCloudWatch(logEntry: any) {
    // Implementation for CloudWatch logging
    // This would be called via Lambda function
  }
}
```


## Data Models

### Resume Data Model

```typescript
// content/resume/resume.md
/*
---
personalInfo:
  name: "Bhargavi Venkataraman"
  title: "Bharatanatyam Artist & Educator"
  email: "bhargavi@tandavalasya.com"
  phone: "+1 (XXX) XXX-XXXX"
  location: "City, State"
  website: "https://www.tandavalasya.com"
---

## Professional Summary

MFA in Bharatanatyam, Grade B Doordarshan Artist, and award-winning performer...

## Education

### Master of Fine Arts (MFA) in Bharatanatyam
**Institution Name** | 2015-2017
- Specialized in traditional and contemporary Bharatanatyam
- Thesis: "Innovation in Classical Dance"

## Experience

### Founder & Artistic Director
**TandavaLasya School of Arts** | 2018 - Present
- Established and grew dance school to 50+ students
- Developed comprehensive curriculum for all skill levels
...
*/
```

### Blog Post Data Model

```typescript
interface BlogPostFrontmatter {
  title: string;
  date: string; // ISO 8601 format
  author: string;
  excerpt: string;
  featuredImage?: string;
  tags: string[];
  published: boolean;
}

// Example: content/blog/beauty-of-bharatanatyam.md
/*
---
title: "The Beauty of Bharatanatyam"
date: "2024-06-01"
author: "Bhargavi Venkataraman"
excerpt: "Discover the grace and tradition of Bharatanatyam dance."
featuredImage: "/images/blog/bharatanatyam-beauty.jpg"
tags: ["dance", "tradition", "culture"]
published: true
---

# The Beauty of Bharatanatyam

Bharatanatyam is one of the oldest classical dance forms of India...
*/
```

### Event Data Model

```typescript
interface EventFrontmatter {
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  category: 'performance' | 'workshop' | 'arangetram' | 'community';
  featuredImage: string;
  gallery: string[]; // Array of image paths
  registrationLink?: string;
}

// Example: content/events/annual-performance-2024.md
/*
---
title: "Annual Performance 2024"
date: "2024-12-15"
time: "6:00 PM - 9:00 PM"
location: "City Auditorium, Main Street"
category: "performance"
featuredImage: "/images/events/annual-2024/featured.jpg"
gallery:
  - "/images/events/annual-2024/photo1.jpg"
  - "/images/events/annual-2024/photo2.jpg"
registrationLink: "https://eventbrite.com/..."
---

Join us for our annual performance showcasing...
*/
```

### Instructor Data Model

```typescript
interface InstructorData {
  id: string;
  name: string;
  title: string;
  image: string;
  email?: string;
  phone?: string;
  shortBio: string; // For cards/listings
  detailedBio: string; // Markdown for detail page
  specializations: string[];
  yearsExperience: number;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  achievements: string[];
}

// Stored as JSON with markdown bio
// content/instructors/bhargavi.json
/*
{
  "id": "bhargavi",
  "name": "Bhargavi Venkataraman",
  "title": "Founder & Artistic Director",
  "image": "/images/instructors/bhargavi.jpg",
  "shortBio": "MFA (Bharatanatyam), Grade B Doordarshan Artist...",
  "specializations": ["Bharatanatyam", "Choreography", "Abhinaya"],
  "yearsExperience": 15
}
*/
// content/instructors/bhargavi.md (detailed bio)
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

The following properties define the correctness criteria for the Tandavalasya website. Each property is universally quantified and references the specific requirements it validates.

### Property 1: Resume Content Fits Single Page

*For any* resume content loaded from markdown, when rendered and printed, the total content height SHALL NOT exceed the printable area of a single A4 page (approximately 1050px at 96 DPI with 0.5in margins).

**Validates: Requirements 1.3**

### Property 2: Markdown Content Round-Trip

*For any* valid markdown file with YAML frontmatter in the content directory, parsing the file and then re-serializing the frontmatter SHALL produce equivalent metadata values.

**Validates: Requirements 1.5, 8.2, 8.3**

### Property 3: Instructor Card Completeness

*For any* instructor in the instructors data, the rendered instructor card SHALL display all required fields: name, title, photo, and short bio.

**Validates: Requirements 3.4**

### Property 4: Event Chronological Ordering

*For any* set of events with dates, when displayed on the events page, upcoming events SHALL be sorted in ascending chronological order and past events SHALL be sorted in descending chronological order.

**Validates: Requirements 5.1**

### Property 5: Image Watermark Application

*For any* image processed by the Watermark_Service, the output image SHALL contain the Tandavalasya logo watermark positioned in the bottom-right corner with 20px padding and 40% opacity.

**Validates: Requirements 5.3, 9.1, 9.2**

### Property 6: Image Aspect Ratio Preservation

*For any* image processed by the Watermark_Service, the aspect ratio of the output image SHALL equal the aspect ratio of the input image within a tolerance of 0.01.

**Validates: Requirements 9.3**

### Property 7: Watermark Format Support

*For any* image in a supported format (JPEG, PNG, WebP, GIF), the Watermark_Service SHALL successfully process the image and produce a watermarked output without errors.

**Validates: Requirements 9.4**

### Property 8: Watermark Scaling

*For any* image with dimensions between 100px and 5000px, the watermark logo width SHALL be scaled to be between 50px and 150px, proportional to the image width (approximately 15% of image width).

**Validates: Requirements 9.8**

### Property 9: Event Filtering

*For any* set of events and any category filter (performance, workshop, arangetram, community), applying the filter SHALL return only events matching that category.

**Validates: Requirements 5.8**

### Property 10: Blog Post Chronological Ordering

*For any* set of blog posts with dates, when displayed on the blog listing page, posts SHALL be sorted in descending chronological order (newest first).

**Validates: Requirements 6.2**

### Property 11: Markdown Rendering Consistency

*For any* valid markdown content with standard elements (headings, lists, links, images), rendering to HTML SHALL produce semantically correct HTML with proper tag hierarchy.

**Validates: Requirements 6.1, 6.3**

### Property 12: Blog Index Generation

*For any* markdown files in the content/blog directory with valid frontmatter, the blog index SHALL include an entry for each file with title, excerpt, date, and slug.

**Validates: Requirements 6.5**

### Property 13: Read Time Calculation

*For any* blog post content, the calculated read time SHALL be approximately word count divided by 200 (average reading speed), rounded to the nearest minute, with a minimum of 1 minute.

**Validates: Requirements 6.7**

### Property 14: Contact Form Validation

*For any* contact form submission with missing required fields (name, email, or message), validation SHALL fail and display inline error messages for each missing field.

**Validates: Requirements 7.3**

### Property 15: Content Directory Reading

*For any* markdown file placed in the content directory with valid frontmatter, the Content_Manager SHALL successfully read and parse the file without errors.

**Validates: Requirements 8.1**

### Property 16: Image Path Resolution

*For any* relative image path in markdown content (e.g., `./images/photo.jpg`), the Content_Manager SHALL resolve it to the correct absolute path in the public directory (e.g., `/images/photo.jpg`).

**Validates: Requirements 8.5**

### Property 17: Frontmatter Validation

*For any* markdown file with invalid or missing required frontmatter fields, the Content_Manager SHALL fail validation and provide a helpful error message indicating which fields are missing or invalid.

**Validates: Requirements 8.8**

### Property 18: Review Display Completeness

*For any* review (Google or local), the rendered review card SHALL display all required fields: reviewer name, rating (1-5 stars), review text, and date.

**Validates: Requirements 11.3**

### Property 19: Review Source Indication

*For any* review displayed on the website, the review card SHALL include a visual indicator (badge or icon) showing whether the review is from Google or a local source.

**Validates: Requirements 11.7**

### Property 20: Reviews Carousel Responsive Display

*For any* screen width, the reviews carousel SHALL display the appropriate number of reviews per page: 1 review for mobile (< 640px), 2 reviews for tablet (640px - 1024px), and 3 reviews for desktop (> 1024px).

**Validates: Requirements 11.6**

### Property 21: Responsive Layout Adaptation

*For any* page component, when the viewport width changes from mobile to tablet to desktop breakpoints, the layout SHALL adapt to use the appropriate number of columns and spacing for that breakpoint.

**Validates: Requirements 12.1, 12.2, 12.3**

### Property 22: Reduced Motion Respect

*For any* animated component, when the user's system preference is set to `prefers-reduced-motion: reduce`, animations SHALL be disabled or significantly reduced.

**Validates: Requirements 12.10**

### Property 23: Error Boundary Catching

*For any* error thrown within a component wrapped by an ErrorBoundary, the error SHALL be caught, logged with context, and a fallback UI SHALL be displayed instead of crashing the application.

**Validates: Requirements 14.2**

### Property 24: API Call Logging

*For any* API call made by the application, the logger SHALL record an entry with timestamp, endpoint, method, and response status.

**Validates: Requirements 14.4**


## Error Handling

### Error Handling Strategy

The application implements a multi-layered error handling approach:

1. **Component-Level Error Boundaries**: Wrap major sections to prevent cascading failures
2. **Service-Level Try-Catch**: Handle API and service errors with retry logic
3. **Graceful Degradation**: Provide fallbacks for non-critical features
4. **User-Friendly Messages**: Display helpful error messages without exposing technical details
5. **Comprehensive Logging**: Log all errors with context for debugging

### Error Types

```typescript
enum ErrorType {
  NETWORK_ERROR = 'NetworkError',
  VALIDATION_ERROR = 'ValidationError',
  CONTENT_ERROR = 'ContentError',
  API_ERROR = 'ApiError',
  RENDER_ERROR = 'RenderError'
}

class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public context?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### Error Handling Patterns

**API Calls with Retry:**
```typescript
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new AppError(
          ErrorType.API_ERROR,
          `API request failed: ${response.status}`,
          { url, status: response.status }
        );
      }
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      logger.warn(`API call attempt ${attempt} failed`, { url, error });
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new AppError(
    ErrorType.NETWORK_ERROR,
    `Failed after ${maxRetries} attempts`,
    { url, lastError }
  );
}
```

**Graceful Degradation:**
```typescript
// Reviews component with fallback
function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function loadReviews() {
      try {
        // Try to fetch Google reviews
        const googleReviews = await reviewsService.fetchReviews();
        setReviews(googleReviews);
      } catch (error) {
        logger.warn('Failed to load Google reviews, using local fallback', error);
        
        // Fallback to local reviews
        const localReviews = await import('../config/reviews.json');
        setReviews(localReviews.default);
        
        setError(error as Error);
      }
    }
    
    loadReviews();
  }, []);
  
  return (
    <section>
      {error && (
        <div className="warning-banner">
          Showing cached reviews. Live reviews temporarily unavailable.
        </div>
      )}
      <ReviewsCarousel reviews={reviews} />
    </section>
  );
}
```

### Error Logging

All errors are logged with structured context:

```typescript
interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  context: string;
  message: string;
  data?: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  user?: {
    userAgent: string;
    language: string;
    viewport: { width: number; height: number };
  };
  page?: {
    pathname: string;
    search: string;
  };
}
```


## Testing Strategy

### Dual Testing Approach

The Tandavalasya website will use both unit testing and property-based testing to ensure comprehensive coverage and correctness.

**Unit Tests:**
- Verify specific examples and edge cases
- Test component rendering with known inputs
- Test integration points between components
- Test error conditions and fallback behavior
- Focus on concrete scenarios

**Property-Based Tests:**
- Verify universal properties across all inputs
- Test with randomly generated data
- Ensure correctness properties hold for any valid input
- Catch edge cases that might be missed in unit tests
- Provide confidence in general correctness

### Testing Framework

- **Test Runner**: Vitest (fast, Vite-native)
- **React Testing**: React Testing Library
- **Property-Based Testing**: fast-check
- **E2E Testing**: Playwright (for critical user flows)
- **Accessibility Testing**: axe-core / jest-axe

### Property-Based Testing Configuration

Each property test will:
- Run a minimum of 100 iterations with randomly generated inputs
- Reference the design document property it validates
- Use descriptive test names that explain the property
- Include shrinking to find minimal failing examples

**Tag Format:**
```typescript
// Feature: tandavalasya-website, Property 1: Resume Content Fits Single Page
test('resume content fits on single page for any valid content', () => {
  fc.assert(
    fc.property(
      fc.record({
        personalInfo: fc.record({ /* ... */ }),
        education: fc.array(/* ... */),
        experience: fc.array(/* ... */),
        // ... other sections
      }),
      (resumeData) => {
        const rendered = render(<Resume data={resumeData} />);
        const contentHeight = rendered.container.scrollHeight;
        const maxHeight = 1050; // A4 page height at 96 DPI with margins
        
        expect(contentHeight).toBeLessThanOrEqual(maxHeight);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Organization

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── components/
│   │   │   ├── Resume.test.tsx
│   │   │   ├── ReviewCard.test.tsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── content.service.test.ts
│   │   │   ├── reviews.service.test.ts
│   │   │   └── watermark.service.test.ts
│   │   └── utils/
│   │       ├── logger.test.ts
│   │       └── markdown.test.ts
│   ├── properties/
│   │   ├── resume.properties.test.ts
│   │   ├── content.properties.test.ts
│   │   ├── watermark.properties.test.ts
│   │   └── reviews.properties.test.ts
│   └── e2e/
│       ├── resume-download.spec.ts
│       ├── contact-form.spec.ts
│       └── navigation.spec.ts
```

### Key Test Scenarios

**Resume Page:**
- Unit: Renders with sample data, print button triggers print dialog
- Property: Content fits single page for any valid resume data
- E2E: User can view resume and trigger PDF download

**Content Management:**
- Unit: Parses specific markdown files correctly
- Property: Any valid markdown file is parsed without errors
- Property: Frontmatter round-trip preserves data

**Watermarking:**
- Unit: Watermarks sample images correctly
- Property: Watermark applied to any supported image format
- Property: Aspect ratio preserved for any image

**Reviews:**
- Unit: Displays sample reviews correctly
- Property: All review fields displayed for any review
- Property: Carousel shows correct number per screen size
- E2E: Reviews load and carousel navigation works

**Contact Form:**
- Unit: Validates specific invalid inputs
- Property: Validation fails for any missing required field
- E2E: Form submission sends email and shows confirmation

### Accessibility Testing

All components will be tested for accessibility:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Resume page has no accessibility violations', async () => {
  const { container } = render(<Resume />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Performance Testing

Key performance metrics will be monitored:

- Lighthouse CI in GitHub Actions
- Bundle size tracking with size-limit
- Core Web Vitals monitoring in production

### Test Coverage Goals

- Unit test coverage: > 80% for components and services
- Property test coverage: All 24 correctness properties implemented
- E2E test coverage: All critical user flows (resume download, contact form, navigation)
- Accessibility: Zero violations on all pages


## Infrastructure Design

### AWS CDK Stack Architecture

The infrastructure is defined using AWS CDK with TypeScript for type safety and maintainability.

```typescript
// infrastructure/lib/website-stack.ts
export class TandavalasyaWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // S3 bucket for static assets (if not using Netlify)
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
    
    // CloudFront distribution for CDN
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ]
    });
    
    // Lambda function for Google Reviews API
    const reviewsFunction = new lambda.Function(this, 'ReviewsFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/reviews'),
      environment: {
        GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY!
      },
      timeout: Duration.seconds(10),
      memorySize: 256
    });
    
    // API Gateway for Lambda functions
    const api = new apigateway.RestApi(this, 'Api', {
      restApiName: 'Tandavalasya API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });
    
    const reviews = api.root.addResource('reviews');
    reviews.addMethod('GET', new apigateway.LambdaIntegration(reviewsFunction));
    
    // CloudWatch alarms for monitoring
    new cloudwatch.Alarm(this, 'ReviewsErrorAlarm', {
      metric: reviewsFunction.metricErrors(),
      threshold: 5,
      evaluationPeriods: 1,
      alarmDescription: 'Alert when reviews function has errors'
    });
    
    // Outputs
    new CfnOutput(this, 'WebsiteURL', {
      value: distribution.distributionDomainName
    });
    
    new CfnOutput(this, 'ApiURL', {
      value: api.url
    });
  }
}
```

### Cost Optimization Strategies

To stay within the $15/month budget:

1. **Static Hosting**: Use Netlify free tier or AWS S3 + CloudFront (minimal cost)
2. **Lambda Optimization**: 
   - Minimize function invocations with caching
   - Use ARM architecture (Graviton2) for 20% cost savings
   - Set appropriate memory and timeout limits
3. **API Gateway Caching**: Enable caching for reviews endpoint (24-hour TTL)
4. **CloudFront Caching**: Aggressive caching for static assets (1 year)
5. **Scheduled Reviews Update**: Update reviews once daily instead of on-demand
6. **Free Tier Usage**: Leverage AWS free tier for Lambda, API Gateway, CloudWatch

**Estimated Monthly Costs:**
- Netlify: $0 (free tier)
- OR AWS S3 + CloudFront: ~$1-2
- Lambda (reviews): ~$0.20 (assuming 1000 invocations/month)
- API Gateway: ~$3.50 (assuming 1000 requests/month)
- CloudWatch: ~$0.50
- **Total: ~$5-6/month** (well under budget)

### Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:properties
      - run: npm run build
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      
      # Deploy to Netlify
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
      
      # OR Deploy to AWS
      - name: Deploy CDK Stack
        run: |
          cd infrastructure
          npm ci
          npx cdk deploy --require-approval never
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Security Considerations

1. **API Keys**: Store in environment variables, never commit to repository
2. **CORS**: Restrict API Gateway CORS to specific domains in production
3. **Rate Limiting**: Implement rate limiting on API Gateway to prevent abuse
4. **DDoS Protection**: CloudFront with AWS Shield Standard (included free)
5. **Content Security Policy**: Implement CSP headers to prevent XSS
6. **HTTPS Only**: Enforce HTTPS for all traffic

### Monitoring and Alerts

1. **CloudWatch Logs**: All Lambda function logs
2. **CloudWatch Metrics**: Track invocations, errors, duration
3. **CloudWatch Alarms**: Alert on error thresholds
4. **Lighthouse CI**: Monitor performance scores on each deployment
5. **Sentry** (optional): Real-time error tracking in production


## Technology Stack Summary

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast dev server, optimized builds)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context + Hooks (no Redux needed for this scale)
- **Forms**: React Hook Form with Zod validation
- **Markdown**: gray-matter + marked
- **HTTP Client**: Native fetch with retry wrapper

### Backend (Serverless)
- **Functions**: AWS Lambda (Node.js 18)
- **API**: AWS API Gateway (REST)
- **Monitoring**: AWS CloudWatch
- **Infrastructure**: AWS CDK (TypeScript)

### Testing
- **Test Runner**: Vitest
- **React Testing**: React Testing Library
- **Property Testing**: fast-check
- **E2E Testing**: Playwright
- **Accessibility**: jest-axe
- **Coverage**: c8

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions

### Hosting & Deployment
- **Static Hosting**: Netlify (primary) or AWS S3 + CloudFront
- **Domain**: Porkbun (DNS configuration)
- **SSL**: Automatic via Netlify or AWS Certificate Manager

### External Services
- **Email**: EmailJS or AWS SES
- **Reviews**: Google Places API
- **Analytics**: Google Analytics 4 (optional)
- **Error Tracking**: Sentry (optional)

## Design Decisions and Rationale

### Why React + TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Excellent tooling and IDE support
- **Maintainability**: Self-documenting code with types
- **Ecosystem**: Rich ecosystem of libraries and tools

### Why Vite over Create React App?
- **Performance**: 10-100x faster dev server startup
- **Modern**: Built for ES modules, optimized for modern browsers
- **Flexibility**: Easy to configure and extend
- **Future-Proof**: Active development and community support

### Why Tailwind CSS?
- **Productivity**: Rapid UI development with utility classes
- **Consistency**: Design system built into the framework
- **Performance**: Purges unused CSS for minimal bundle size
- **Customization**: Easy to extend with custom theme

### Why Serverless (Lambda)?
- **Cost**: Pay only for what you use (fits $15/month budget)
- **Scalability**: Automatically scales with traffic
- **Maintenance**: No server management required
- **Simplicity**: Focus on code, not infrastructure

### Why Netlify over AWS S3?
- **Simplicity**: Zero-config deployments from Git
- **Features**: Built-in CDN, SSL, preview deployments
- **Cost**: Free tier sufficient for this project
- **Developer Experience**: Excellent DX with automatic builds

### Why Markdown for Content?
- **Simplicity**: Easy to write and edit
- **Version Control**: Git-friendly plain text format
- **Portability**: Not locked into a CMS
- **Developer-Friendly**: Familiar format for technical users

### Why Property-Based Testing?
- **Confidence**: Tests work for all inputs, not just examples
- **Edge Cases**: Automatically discovers edge cases
- **Specification**: Properties serve as executable specifications
- **Regression**: Shrinking finds minimal failing examples

## Future Enhancements

The following features are out of scope for the initial release but may be added later:

### Phase 3: Student Portal
- Student authentication (Google/Facebook/Instagram OAuth)
- Admin approval system for student emails
- Student profile management
- View lessons learned and materials
- Download teaching materials (restricted to learned lessons)

### Phase 4: Student Portal Advanced
- Fee payment management (Stripe integration)
- Autopay setup
- View/download bills
- Email notifications for class schedules
- Upload homework with admin email alerts

### Phase 5: Admin Dashboard
- Student insights and metrics
- Revenue tracking for tax purposes
- Event/performance tracking
- Aggregated dashboards
- Student management (approve/reject, assign lessons)

These phases will require additional infrastructure:
- **Authentication**: Auth0 or AWS Cognito
- **Database**: DynamoDB or PostgreSQL (RDS)
- **File Storage**: AWS S3 for student uploads
- **Payment Processing**: Stripe API
- **Email Service**: AWS SES for transactional emails
- **Admin UI**: Separate admin portal with role-based access

## Conclusion

This design provides a solid foundation for the Tandavalasya website with a focus on:

1. **Immediate Priority**: Fancy, printable resume page
2. **Content Management**: Easy updates via markdown files
3. **Performance**: Fast load times and smooth interactions
4. **Maintainability**: Clean architecture following SOLID principles
5. **Cost-Effectiveness**: Well under $15/month budget
6. **Scalability**: Ready to add student portal features in future phases

The design leverages modern web technologies and best practices to create a professional, maintainable website that can grow with the business needs.

