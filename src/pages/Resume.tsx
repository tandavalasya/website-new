import { useEffect, useState } from 'react';
import { ResumeSection } from '../components/resume/ResumeSection';
import { BackgroundPoses } from '../components/ui/BackgroundPoses';
import { contentService } from '../services/content.service';
import type { ResumeData } from '../types';
import { createLogger } from '../utils/logger';

const logger = createLogger('Resume');

function useResumeContent() {
    const [data, setData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                logger.info('Loading resume data');
                const resumeData = await contentService.loadResumeData();
                setData(resumeData);
                logger.info('Resume data loaded successfully');
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to load resume');
                logger.error('Failed to load resume data', { error });
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { data, loading, error };
}

export function Resume() {
    const { data, loading, error } = useResumeContent();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon mx-auto mb-4"></div>
                    <p className="text-gray-600 font-sans">Loading resume...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-serif font-bold text-maroon mb-4">Failed to Load Resume</h1>
                    <p className="text-gray-600 mb-4 font-sans">{error?.message || 'Unknown error occurred'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-maroon text-white rounded-lg hover:bg-maroon-700 transition-colors font-sans"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 print:bg-white relative">
            <BackgroundPoses />

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="print:hidden fixed top-6 right-6 z-50 px-6 py-3 bg-[#7a1f1f] text-white rounded-lg shadow-xl hover:bg-[#5a1515] transition-all duration-300 font-sans font-medium flex items-center gap-2"
            >
                <span>📄</span>
                <span>Download PDF</span>
            </button>

            {/* Resume Container - Classic Paper Style */}
            <div className="max-w-[1000px] mx-auto my-6 print:my-0 print:max-w-full bg-[#FAFAFA] print:bg-[#FAFAFA] shadow-2xl print:shadow-none relative z-10 overflow-hidden">
                {/* Watermark */}
                <div className="absolute top-[20%] left-[20%] w-[80%] h-[80%] opacity-[0.04] print:opacity-[0.03] pointer-events-none z-0">
                    <img
                        src="/images/resume-backgrounds/pose-n.png"
                        alt=""
                        className="w-full h-full object-cover grayscale"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] print:grid-cols-[200px_1fr] min-h-[1100px] print:min-h-0 relative">
                    {/* Left Sidebar - Dark with Profile Images */}
                    <aside className="bg-[#161616] text-white p-6 print:p-4 flex flex-col gap-6 print:gap-4 relative z-10">
                        {/* Profile Image */}
                        <div className="w-full h-[350px] print:h-[250px] overflow-hidden border-2 border-[#bfa668]">
                            <img
                                src="/images/resume-backgrounds/068.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover soft-grayscale"
                                style={{ transform: 'scale(1.15)', objectPosition: '50% 50%' }}
                            />
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-serif text-[#bfa668] text-[0.9rem] print:text-[9pt] mb-2 print:mb-2 border-b border-[#333] pb-1 print:pb-1 tracking-wide uppercase">Contact</h3>
                            <div className="space-y-3 print:space-y-2 text-left">
                                {data.personalInfo.location && (
                                    <div className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                        <strong className="text-white/90 block font-sans text-[0.7rem] print:text-[6.5pt] uppercase tracking-wider mb-0.5">Location</strong>
                                        <span className="text-[#bbb] font-mono text-[0.75rem]">{data.personalInfo.location}</span>
                                    </div>
                                )}
                                {data.personalInfo.website && (
                                    <div className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                        <strong className="text-white/90 block font-sans text-[0.7rem] print:text-[6.5pt] uppercase tracking-wider mb-0.5">Website</strong>
                                        <span className="text-[#bbb] font-mono text-[0.75rem]">
                                            <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#bfa668] transition-colors">
                                                {data.personalInfo.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        </span>
                                    </div>
                                )}
                                {data.personalInfo.email && (
                                    <div className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                        <strong className="text-white/90 block font-sans text-[0.7rem] print:text-[6.5pt] uppercase tracking-wider mb-0.5">Email</strong>
                                        <span className="text-[#bbb] font-mono text-[0.75rem]">
                                            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-[#bfa668] transition-colors break-words">
                                                {data.personalInfo.email}
                                            </a>
                                        </span>
                                    </div>
                                )}
                                {data.personalInfo.phone && (
                                    <div className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                        <strong className="text-white/90 block font-sans text-[0.7rem] print:text-[6.5pt] uppercase tracking-wider mb-0.5">Phone</strong>
                                        <span className="text-[#bbb] font-mono text-[0.75rem]">
                                            <a href={`tel:${data.personalInfo.phone}`} className="hover:text-[#bfa668] transition-colors">
                                                {data.personalInfo.phone}
                                            </a>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Education in Sidebar */}
                        {data.education && data.education.length > 0 && (
                            <div>
                                <h3 className="font-serif text-[#bfa668] text-[0.9rem] print:text-[9pt] mb-2 print:mb-2 border-b border-[#333] pb-1 print:pb-1 tracking-wide uppercase">Education</h3>
                                <div className="space-y-3 print:space-y-2 text-left">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                            <strong className="text-white/90 block text-[0.8rem] print:text-[7.5pt] mb-0.5">{edu.degree}</strong>
                                            <span className="text-[#bbb] text-[0.75rem]">{edu.institution}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Awards in Sidebar */}
                        {data.awards && data.awards.length > 0 && (
                            <div>
                                <h3 className="font-serif text-[#bfa668] text-[0.9rem] print:text-[9pt] mb-2 print:mb-2 border-b border-[#333] pb-1 print:pb-1 tracking-wide uppercase">Awards & Records</h3>
                                <div className="space-y-3 print:space-y-2 text-left">
                                    {data.awards.map((award, index) => (
                                        <div key={index} className="text-[0.75rem] print:text-[7pt] leading-relaxed">
                                            <strong className="text-white/90 block text-[0.8rem] print:text-[7.5pt] mb-0.5">{award.title}</strong>
                                            <span className="text-[#bbb] text-[0.75rem]">{award.organization}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Second Profile Image */}
                        <div className="w-full h-[240px] print:h-[180px] overflow-hidden mt-auto print:mt-2">
                            <img
                                src="/images/resume-backgrounds/0085.jpg"
                                alt="Meditation Pose"
                                className="w-full h-full object-cover opacity-80 border border-[#444] soft-grayscale"
                                style={{ objectPosition: '50% 35%' }}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="p-8 print:p-6 relative z-10 flex flex-col">
                        {/* Header */}
                        <header className="border-b-2 border-[#7a1f1f] pb-3 print:pb-3 mb-4 print:mb-4 flex justify-between items-center">
                            <div className="flex-1">
                                <h1 className="font-serif text-[2.2rem] print:text-[22pt] text-[#7a1f1f] leading-none m-0 p-0">
                                    {data.personalInfo.name}
                                </h1>
                                <h2 className="font-display text-[1rem] print:text-[10pt] text-[#666] italic mt-1 mb-0 p-0">
                                    {data.personalInfo.title}
                                </h2>
                            </div>
                            <div className="w-[96px] h-[96px] print:w-[96px] print:h-[96px] rounded-full border-2 border-[#7a1f1f] overflow-hidden flex-shrink-0">
                                <img
                                    src="/images/resume-backgrounds/308.jpg"
                                    alt="Abhinaya"
                                    className="w-full h-full soft-grayscale"
                                    style={{ objectFit: 'cover', objectPosition: '50% -10%', transform: 'scale(5)' }}
                                />
                            </div>
                        </header>

                        {/* Professional Summary */}
                        {data.summary && (
                            <section className="mt-5 print:mt-4">
                                <div className="flex items-center mb-3 print:mb-2.5">
                                    <h3 className="font-serif text-[1.2rem] print:text-[12pt] text-[#7a1f1f] font-bold">Professional Summary</h3>
                                    <div className="flex-1 h-px bg-[#ccc] ml-[15px]"></div>
                                </div>
                                <p className="text-left m-0 mb-2.5 text-[0.92rem] print:text-[8pt] leading-relaxed print:leading-snug text-[#222]">
                                    {data.summary}
                                </p>
                            </section>
                        )}

                        {/* Guru Parampara */}
                        {data.guruParampara && data.guruParampara.length > 0 && (
                            <ResumeSection title="Guru Parampara (Lineage)" items={data.guruParampara} delay={0.2} />
                        )}

                        {/* Professional Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <ResumeSection title="Professional Experience" items={data.experience} delay={0.3} />
                        )}

                        {/* Teaching Philosophy - Elegant Quote Style */}
                        {data.teachingPhilosophy && (
                            <section className="mt-5 print:mt-4 text-left">
                                <div className="relative bg-white p-4 print:p-3 border-l-4 border-[#bfa668] shadow-[0_5px_15px_rgba(0,0,0,0.05)] print:shadow-none print:border print:border-[#eee] text-left">
                                    <span className="font-serif text-[#7a1f1f] text-[0.95rem] print:text-[9pt] mb-1.5 block text-left">{data.teachingPhilosophy.title}</span>
                                    <p className="m-0 italic text-[#444] text-[0.92rem] print:text-[8pt] leading-relaxed print:leading-snug text-left" style={{ textAlign: 'left' }}>
                                        {data.teachingPhilosophy.quote}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Repertoire (Performances) */}
                        {data.performances && data.performances.length > 0 && (
                            <ResumeSection title="Repertoire & Highlights" items={data.performances} delay={0.4} />
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <div className="hidden">
                                <ResumeSection title="Education" items={data.education} delay={0.5} />
                            </div>
                        )}

                        {/* Awards & Recognition */}
                        {data.awards && data.awards.length > 0 && (
                            <div className="hidden">
                                <ResumeSection title="Awards & Recognition" items={data.awards} delay={0.6} />
                            </div>
                        )}

                        {/* Visual Strip - Dance Pose Images */}
                        <div className="grid grid-cols-2 gap-2.5 print:gap-2 mt-auto pt-5 print:pt-4">
                            <img
                                src="/images/resume-backgrounds/039.jpg"
                                alt="Performance Pose"
                                className="w-full h-[130px] print:h-[130px] object-cover object-center rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.1)] print:shadow-none pencil-sketch-effect"
                            />
                            <img
                                src="/images/resume-backgrounds/211.jpg"
                                alt="Performance Pose 2"
                                className="w-full h-[130px] print:h-[130px] object-cover rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.1)] print:shadow-none pencil-sketch-effect"
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
