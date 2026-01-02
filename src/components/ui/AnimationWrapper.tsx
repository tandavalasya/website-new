import type { MotionProps, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

/**
 * Predefined animation variants for consistent animations across the app
 * Follows Open/Closed Principle - can add new variants without modifying existing code
 */
export const ANIMATION_VARIANTS: Record<string, Variants> = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    slideDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    slideRight: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
    stagger: {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};

/**
 * Hook to detect user's motion preference
 * Respects prefers-reduced-motion for accessibility
 * 
 * @returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReducedMotion;
}

interface AnimationWrapperProps {
    children: ReactNode;
    variant?: keyof typeof ANIMATION_VARIANTS;
    delay?: number;
    className?: string;
    motionProps?: Partial<MotionProps>;
}

/**
 * AnimationWrapper component for consistent animations
 * 
 * Follows Single Responsibility Principle - only handles animation wrapping
 * Respects user's motion preferences for accessibility
 * 
 * Features:
 * - Predefined animation variants
 * - Viewport-based animations (animate when scrolled into view)
 * - Respects prefers-reduced-motion
 * - Customizable delay and motion props
 * 
 * @example
 * <AnimationWrapper variant="slideUp" delay={0.2}>
 *   <h1>Hello World</h1>
 * </AnimationWrapper>
 */
export function AnimationWrapper({
    children,
    variant = 'fadeIn',
    delay = 0,
    className,
    motionProps = {},
}: AnimationWrapperProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    // If user prefers reduced motion, render without animation
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const selectedVariant = ANIMATION_VARIANTS[variant];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={selectedVariant}
            transition={{ delay }}
            className={className}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer component for staggered animations of children
 * 
 * Use with StaggerItem components to create sequential animations
 * 
 * @example
 * <StaggerContainer>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 * </StaggerContainer>
 */
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.stagger}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem component for individual items in a stagger animation
 * 
 * Must be used inside a StaggerContainer
 */
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div variants={ANIMATION_VARIANTS.slideUp} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * PageTransition component for page-level transitions
 * 
 * Use to wrap page components for smooth transitions between routes
 * 
 * @example
 * <PageTransition>
 *   <HomePage />
 * </PageTransition>
 */
interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
}
