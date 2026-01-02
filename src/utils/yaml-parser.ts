import yaml from 'js-yaml';
import { createLogger } from './logger';

const logger = createLogger('YAMLParser');

export interface ResumeConfig {
    resume: {
        profile: string;
        layout: {
            sidebar_width: string;
            main_width: string;
            colors: {
                primary: string;
                gold: string;
                text: string;
                background: string;
                sidebar_bg: string;
            };
            fonts: {
                heading: string;
                subheading: string;
                body: string;
            };
        };
        sections: {
            enabled: string[];
            disabled: string[];
            order: string[];
        };
        sidebar: {
            enabled: string[];
            profile_image: string;
            secondary_image: string;
            order: string[];
        };
        header: {
            show_thumbnail: boolean;
            thumbnail_image: string;
            thumbnail_style: string;
        };
        footer: {
            show_gallery: boolean;
            gallery_images: string[];
            gallery_columns: number;
        };
        watermark: {
            enabled: boolean;
            image: string;
            opacity: number;
            position: string;
        };
        print: {
            page_size: string;
            margins: string;
            fit_to_page: boolean;
            preserve_colors: boolean;
        };
    };
}

export interface GuruParamparaItem {
    number: number;
    name: string;
    description: string;
}

export interface ProfessionalExperienceItem {
    title: string;
    role: string;
    description: string;
}

export interface RepertoireItem {
    title: string;
    description: string;
}

export interface ResumeDataYAML {
    personal_info: {
        name: string;
        title: string;
        contact: {
            location: string;
            website: string;
            email: string;
            phone: string;
        };
    };
    professional_summary: string;
    guru_parampara: GuruParamparaItem[];
    professional_experience: ProfessionalExperienceItem[];
    teaching_philosophy?: {
        title: string;
        quote: string;
    };
    education: Array<{
        degree: string;
        institution: string;
        year: string;
    }>;
    awards: Array<{
        title: string;
        description: string;
        organization: string;
        year: string;
    }>;
    repertoire: RepertoireItem[];
}

/**
 * Parse YAML content into JavaScript object
 */
export function parseYAML<T = any>(content: string): T {
    try {
        const parsed = yaml.load(content) as T;
        logger.info('YAML parsed successfully');
        return parsed;
    } catch (error) {
        logger.error('Failed to parse YAML', { error });
        throw new Error(`YAML parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Load and parse YAML file from URL
 */
export async function loadYAMLFile<T = any>(url: string): Promise<T> {
    try {
        logger.info('Loading YAML file', { url });
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to load YAML file: ${response.statusText}`);
        }
        
        const content = await response.text();
        return parseYAML<T>(content);
    } catch (error) {
        logger.error('Failed to load YAML file', { url, error });
        throw error;
    }
}
