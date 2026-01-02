import type { ReactNode } from 'react';
import type {
    AwardItem,
    CertificationItem,
    EducationItem,
    ExperienceItem,
    GuruParamparaItem,
    PerformanceItem,
} from '../../types';
import { parseTextWithFormatting } from '../../utils/text-formatter';
import { AnimationWrapper } from '../ui/AnimationWrapper';

interface ResumeSectionProps {
    title: string;
    items: Array<EducationItem | ExperienceItem | PerformanceItem | AwardItem | CertificationItem | GuruParamparaItem | string>;
    delay?: number;
}

/**
 * ResumeSection component - Classic style with maroon and gold accents
 */
export function ResumeSection({ title, items, delay = 0.2 }: ResumeSectionProps) {
    if (!items || items.length === 0) return null;

    // Check if this is a repertoire/performance section (should be rendered as list)
    const isRepertoire = items.length > 0 && 'title' in items[0] && 'description' in items[0] && !('organization' in items[0]);

    return (
        <AnimationWrapper variant="slideUp" delay={delay} className="page-break-inside-avoid">
            <section className="mt-5 print:mt-4">
                <div className="flex items-center mb-3 print:mb-2.5">
                    <h3 className="font-serif text-[1.2rem] print:text-[12pt] text-[#7a1f1f] font-bold">{title}</h3>
                    <div className="flex-1 h-px bg-[#ccc] ml-[15px]"></div>
                </div>
                {isRepertoire ? (
                    <ul className="list-none pl-0 text-[0.92rem] print:text-[8pt] mt-1.5 space-y-1.5">
                        {items.map((item, index) => (
                            <div key={index}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </ul>
                ) : (
                    <div>
                        {items.map((item, index) => (
                            <div key={index}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </AnimationWrapper>
    );
}

function renderItem(item: any): ReactNode {
    if ('number' in item && 'name' in item && 'description' in item) {
        return <GuruParamparaItemView item={item} />;
    }
    if ('degree' in item && 'institution' in item) {
        return <EducationItemView item={item} />;
    }
    if ('title' in item && 'organization' in item && 'description' in item) {
        return <ExperienceItemView item={item} />;
    }
    if ('title' in item && 'venue' in item && 'date' in item) {
        return <PerformanceItemView item={item} />;
    }
    if ('title' in item && 'organization' in item && 'year' in item) {
        return <AwardItemView item={item} />;
    }
    if ('title' in item && 'issuer' in item) {
        return <CertificationItemView item={item} />;
    }
    return null;
}

function GuruParamparaItemView({ item }: { item: GuruParamparaItem }) {
    return (
        <div className="page-break-inside-avoid mb-4 print:mb-3 text-left">
            <div className="mb-1">
                <span className="font-bold text-[#222] text-[1rem] print:text-[9pt] font-display">{item.name}</span>
            </div>
            <p className="text-left m-0 text-[0.92rem] print:text-[8pt] leading-relaxed print:leading-snug text-[#555]">
                {parseTextWithFormatting(item.description)}
            </p>
        </div>
    );
}

function EducationItemView({ item }: { item: EducationItem }) {
    return (
        <div className="page-break-inside-avoid text-left">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
                <h4 className="font-bold text-gray-900 print:text-[9pt] font-sans">{item.degree}</h4>
                <span className="text-sm text-maroon font-semibold print:text-[8pt] whitespace-nowrap ml-4">{item.year}</span>
            </div>
            <p className="text-gray-600 text-sm print:text-[8pt] mb-1 print:mb-0.5 italic font-sans">{item.institution}</p>
            {item.details && (
                <p className="text-gray-700 text-sm print:text-[8pt] print:leading-snug text-left font-sans">{item.details}</p>
            )}
        </div>
    );
}

function ExperienceItemView({ item }: { item: ExperienceItem }) {
    return (
        <div className="page-break-inside-avoid mb-4 print:mb-3 text-left">
            <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-[#222] text-[1rem] print:text-[9pt]">{item.title}</span>
                <span className="italic text-[#7a1f1f] text-[0.9rem] print:text-[8pt] ml-4">{item.organization}</span>
            </div>
            <p className="text-left m-0 mb-2.5 text-[0.92rem] print:text-[8pt] leading-relaxed print:leading-snug text-[#222]">
                {parseTextWithFormatting(item.description)}
            </p>
            {item.achievements && item.achievements.length > 0 && (
                <ul className="pl-5 text-[0.92rem] print:text-[8pt] mt-1.5 text-left">
                    {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="mb-1.5">{parseTextWithFormatting(achievement)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function PerformanceItemView({ item }: { item: PerformanceItem }) {
    return (
        <div className="page-break-inside-avoid mb-1.5 text-[0.92rem] print:text-[8pt] text-left flex items-start">
            <span className="mr-2 mt-1">•</span>
            <p className="m-0 text-left">
                <strong>{item.title}:</strong> {parseTextWithFormatting(item.description || '')}
            </p>
        </div>
    );
}

function AwardItemView({ item }: { item: AwardItem }) {
    return (
        <div className="page-break-inside-avoid flex items-start text-left">
            <span className="text-maroon mr-2 mt-1">♦</span>
            <p className="text-gray-800 text-sm print:text-[8pt] print:leading-snug font-sans text-left">
                <span className="font-semibold">{item.title}</span>
                {item.organization && <span className="text-gray-600"> — {item.organization}</span>}
                {item.year && <span className="text-maroon font-semibold"> ({item.year})</span>}
            </p>
        </div>
    );
}

function CertificationItemView({ item }: { item: CertificationItem }) {
    return (
        <div className="page-break-inside-avoid flex items-start text-left">
            <span className="text-maroon mr-2 mt-1">♦</span>
            <p className="text-gray-800 text-sm print:text-[8pt] print:leading-snug font-sans text-left">
                <span className="font-semibold">{item.title}</span>
                {item.issuer && <span className="text-gray-600"> — {item.issuer}</span>}
                {item.year && <span className="text-maroon font-semibold"> ({item.year})</span>}
            </p>
        </div>
    );
}
