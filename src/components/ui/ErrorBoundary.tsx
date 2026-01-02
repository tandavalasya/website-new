import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { createLogger } from '../../utils/logger';

const logger = createLogger('ErrorBoundary');

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    context?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary component for catching and handling React errors
 * 
 * Follows Single Responsibility Principle - only handles error catching and display
 * Implements React's error boundary pattern
 * 
 * Features:
 * - Catches errors in child components
 * - Logs errors with context
 * - Displays fallback UI
 * - Supports custom fallback components
 * - Provides reset functionality
 * 
 * @example
 * <ErrorBoundary
 *   context="HomePage"
 *   fallback={(error, reset) => (
 *     <div>
 *       <h2>Something went wrong</h2>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    /**
     * Update state when an error is caught
     * This is called during the render phase
     */
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    /**
     * Log error details after an error is caught
     * This is called during the commit phase
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        const context = this.props.context || 'Unknown';

        logger.error(`Error caught in ${context}`, {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            componentStack: errorInfo.componentStack,
            context,
        });

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    /**
     * Reset error state to allow retry
     */
    resetError = (): void => {
        logger.info('Error boundary reset', { context: this.props.context });
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render(): ReactNode {
        if (this.state.hasError && this.state.error) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.resetError);
            }

            // Default fallback UI
            return <DefaultErrorFallback error={this.state.error} onReset={this.resetError} />;
        }

        return this.props.children;
    }
}

/**
 * Default fallback UI for error boundary
 * Displays a user-friendly error message with retry option
 */
interface DefaultErrorFallbackProps {
    error: Error;
    onReset: () => void;
}

function DefaultErrorFallback({ error, onReset }: DefaultErrorFallbackProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center">
                    {/* Error Icon */}
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">
                        We're sorry for the inconvenience. Please try refreshing the page or contact support
                        if the problem persists.
                    </p>

                    {/* Error Details (only in development) */}
                    {import.meta.env.DEV && (
                        <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                            <p className="text-sm font-mono text-red-800 break-words">{error.message}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={onReset}
                            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorBoundary;
