import { useEffect, useState } from 'react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('BackgroundPoses');

/**
 * BackgroundPoses component
 * 
 * Displays dance pose as full-page artistic background
 * Works in both screen and print/PDF modes
 */
export function BackgroundPoses() {
    const [hasImages, setHasImages] = useState(false);

    useEffect(() => {
        // Check if extracted PNG images exist
        checkForExtractedImages();
    }, []);

    async function checkForExtractedImages() {
        try {
            // Check for extracted PNG images with transparent backgrounds
            const pngImages = ['pose-n.png', 'pose1.png', 'pose2.png'];

            for (const imageName of pngImages) {
                const src = `/images/resume-backgrounds/${imageName}`;
                const exists = await checkImageExists(src);
                if (exists) {
                    setHasImages(true);
                    logger.info('Found extracted pose images');
                    return;
                }
            }

            logger.info('No extracted pose images found, using subtle background');
            setHasImages(false);
        } catch (error) {
            logger.warn('Failed to check for images', { error });
            setHasImages(false);
        }
    }

    async function checkImageExists(src: string): Promise<boolean> {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden print:opacity-[0.12] z-0">
            {hasImages ? (
                // Full-page dance pose background - balanced visibility
                <div className="absolute inset-0">
                    {/* Main full-size background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.22] print:opacity-[0.12]"
                        style={{
                            backgroundImage: 'url(/images/resume-backgrounds/pose-n.png)',
                            filter: 'grayscale(60%) contrast(105%) brightness(100%)',
                            mixBlendMode: 'multiply',
                        }}
                    />
                </div>
            ) : (
                // Subtle, elegant gradient background fallback
                <div className="absolute inset-0">
                    {/* Soft gradient orbs */}
                    <div
                        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] print:opacity-[0.01]"
                        style={{
                            top: '10%',
                            right: '5%',
                            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.4) 0%, transparent 65%)',
                        }}
                    />
                    <div
                        className="absolute w-[450px] h-[450px] rounded-full opacity-[0.04] print:opacity-[0.01]"
                        style={{
                            bottom: '15%',
                            left: '35%',
                            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 65%)',
                        }}
                    />
                    {/* Subtle decorative lines */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-[0.02] print:opacity-[0.005]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'rgb(100, 116, 139)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(245, 158, 11)', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,200 Q 400,150 800,200 T 1600,200"
                            stroke="url(#lineGrad)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M 0,600 Q 400,550 800,600 T 1600,600"
                            stroke="url(#lineGrad)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}
