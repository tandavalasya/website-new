import type { ResumeData } from '../../types';
import { AnimationWrapper } from '../ui/AnimationWrapper';

interface ResumeHeaderProps {
    personalInfo: ResumeData['personalInfo'];
}

/**
 * ResumeHeader component
 * 
 * Displays name, title, and contact information with gradient styling
 * Modern left-aligned layout with accent bar
 * 
 * @example
 * <ResumeHeader personalInfo={data.personalInfo} />
 */
export function ResumeHeader({ personalInfo }: ResumeHeaderProps) {
    const { name, title, email, phone, location, website } = personalInfo;

    return (
        <AnimationWrapper variant="slideDown" className="mb-8 print:mb-5">
            <header className="relative">
                {/* Accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-orange-500 print:w-0.5"></div>

                <div className="pl-6 print:pl-4">
                    {/* Name with gradient */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 print:text-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                        {name}
                    </h1>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl text-gray-700 font-light mb-4 print:text-base print:mb-2">
                        {title}
                    </h2>

                    {/* Contact Information */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 print:text-xs">
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="hover:text-pink-600 transition-colors print:text-gray-800 flex items-center gap-1"
                            >
                                <span className="text-pink-500 print:hidden">✉</span>
                                {email}
                            </a>
                        )}
                        {phone && (
                            <a
                                href={`tel:${phone}`}
                                className="hover:text-pink-600 transition-colors print:text-gray-800 flex items-center gap-1"
                            >
                                <span className="text-purple-500 print:hidden">☎</span>
                                {phone}
                            </a>
                        )}
                        {location && (
                            <span className="flex items-center gap-1">
                                <span className="text-orange-500 print:hidden">📍</span>
                                {location}
                            </span>
                        )}
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-600 transition-colors print:text-gray-800 flex items-center gap-1"
                            >
                                <span className="text-pink-500 print:hidden">🌐</span>
                                {website.replace(/^https?:\/\//, '')}
                            </a>
                        )}
                    </div>
                </div>
            </header>
        </AnimationWrapper>
    );
}
