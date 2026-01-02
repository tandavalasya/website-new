import { AnimationWrapper } from '../ui/AnimationWrapper';

interface ResumeSummaryProps {
    summary: string;
}

/**
 * ResumeSummary component
 * 
 * Displays professional summary with modern styling and accent
 * 
 * @example
 * <ResumeSummary summary={data.summary} />
 */
export function ResumeSummary({ summary }: ResumeSummaryProps) {
    if (!summary) return <></>;

    return (
        <AnimationWrapper variant="slideUp" delay={0.1} className="mb-6 print:mb-4">
            <section className="relative pl-6 print:pl-4">
                {/* Accent dot */}
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 print:w-2 print:h-2"></div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 print:text-sm uppercase tracking-wide">
                    Professional Summary
                </h3>
                <p className="text-gray-700 leading-relaxed print:text-xs print:leading-snug border-l-2 border-pink-100 pl-4 print:border-l">
                    {summary}
                </p>
            </section>
        </AnimationWrapper>
    );
}
