// Core data types for the Tandavalasya website

export interface GuruParamparaItem {
    number: number;
    name: string;
    description: string;
}

export interface TeachingPhilosophy {
    title: string;
    quote: string;
}

export interface ResumeData {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        website: string;
    };
    summary: string;
    education: EducationItem[];
    experience: ExperienceItem[];
    performances: PerformanceItem[];
    awards: AwardItem[];
    certifications: CertificationItem[];
    skills: string[];
    guruParampara?: GuruParamparaItem[];
    teachingPhilosophy?: TeachingPhilosophy;
}

export interface EducationItem {
    degree: string;
    institution: string;
    year: string;
    details?: string;
}

export interface ExperienceItem {
    title: string;
    organization: string;
    period: string;
    description: string;
    achievements?: string[];
}

export interface PerformanceItem {
    title: string;
    venue: string;
    date: string;
    description?: string;
}

export interface AwardItem {
    title: string;
    organization: string;
    year: string;
}

export interface CertificationItem {
    title: string;
    issuer: string;
    year: string;
}

export interface PageContent {
    slug: string;
    title: string;
    content: string;
    metadata: Record<string, any>;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    featuredImage?: string;
    tags: string[];
}

export interface Event {
    id: string;
    title: string;
    date: string;
    category: 'performance' | 'workshop' | 'arangetram' | 'community';
    description: string;
    images: string[];
    isPast: boolean;
}

export interface Instructor {
    id: string;
    name: string;
    title: string;
    image: string;
    shortBio: string;
    detailedBio: string;
}

export interface Review {
    id: string;
    name: string;
    profilePhoto?: string;
    rating: number;
    text: string;
    date: string;
    source: 'google' | 'local';
}

export const LogLevel = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
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
