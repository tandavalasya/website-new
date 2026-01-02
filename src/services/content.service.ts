import type { ResumeData } from '../types';
import { createLogger } from '../utils/logger';
import type { ResumeConfig, ResumeDataYAML } from '../utils/yaml-parser';
import { loadYAMLFile } from '../utils/yaml-parser';

const logger = createLogger('ContentService');

/**
 * ContentService for loading and parsing content from markdown files
 * 
 * Follows Single Responsibility Principle - only handles content loading
 * Follows Dependency Inversion Principle - depends on abstractions (markdown parser)
 * 
 * Features:
 * - Load resume data from markdown
 * - Parse frontmatter and content
 * - Transform to typed data structures
 * - Error handling and logging
 */
export class ContentService {
    /**
     * Load resume configuration from YAML
     */
    async loadResumeConfig(): Promise<ResumeConfig> {
        try {
            logger.info('Loading resume configuration');
            const config = await loadYAMLFile<ResumeConfig>('/content/resume/resume-config.yaml');
            logger.info('Resume configuration loaded successfully');
            return config;
        } catch (error) {
            logger.error('Failed to load resume configuration', { error });
            throw error;
        }
    }

    /**
     * Load resume data from YAML file
     * 
     * @returns Promise<ResumeData> - Parsed resume data
     * @throws Error if resume file cannot be loaded or parsed
     * 
     * @example
     * const service = new ContentService();
     * const resumeData = await service.loadResumeData();
     */
    async loadResumeData(): Promise<ResumeData> {
        try {
            logger.info('Loading resume data from YAML');

            // Load YAML data file
            const yamlData = await loadYAMLFile<ResumeDataYAML>('/content/resume/resume-data.yaml');

            // Transform YAML data to ResumeData structure
            const resumeData = this.transformYAMLToResumeData(yamlData);

            logger.info('Resume data loaded successfully from YAML', {
                sections: Object.keys(resumeData).length,
            });

            return resumeData;
        } catch (error) {
            logger.error('Failed to load resume data', { error });
            throw error;
        }
    }

    /**
     * Transform YAML data to ResumeData structure
     * @private
     */
    private transformYAMLToResumeData(yamlData: ResumeDataYAML): ResumeData {
        return {
            personalInfo: {
                name: yamlData.personal_info.name,
                title: yamlData.personal_info.title,
                email: yamlData.personal_info.contact.email,
                phone: yamlData.personal_info.contact.phone,
                location: yamlData.personal_info.contact.location,
                website: yamlData.personal_info.contact.website,
            },
            summary: yamlData.professional_summary,
            education: yamlData.education.map((edu: any) => ({
                degree: edu.degree,
                institution: edu.institution,
                year: edu.year,
                details: undefined,
            })),
            experience: yamlData.professional_experience.map((exp: any) => ({
                title: exp.title,
                organization: exp.role,
                period: '',
                description: exp.description,
                achievements: undefined,
            })),
            performances: yamlData.repertoire.map((rep: any) => ({
                title: rep.title,
                venue: '',
                date: '',
                description: rep.description,
            })),
            awards: yamlData.awards.map((award: any) => ({
                title: award.title,
                organization: award.organization || award.description,
                year: award.year,
            })),
            certifications: [],
            skills: [],
            // Add custom sections
            guruParampara: yamlData.guru_parampara,
            teachingPhilosophy: yamlData.teaching_philosophy,
        };
    }
}

// Export singleton instance
export const contentService = new ContentService();
