import type { LogEntry } from '../types';
import { LogLevel } from '../types';

/**
 * Logger utility class for structured logging
 * Follows Single Responsibility Principle - only handles logging
 * 
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Structured logging with context
 * - Browser console output in development
 * - CloudWatch integration placeholder for production
 * 
 * @example
 * const logger = new Logger('MyComponent');
 * logger.info('Component mounted', { props });
 * logger.error('Failed to load data', { error });
 */
export class Logger {
    private context: string;

    constructor(context: string) {
        this.context = context;
    }

    /**
     * Log a debug message
     * Use for detailed debugging information
     */
    debug(message: string, data?: any): void {
        this.log(LogLevel.DEBUG, message, data);
    }

    /**
     * Log an info message
     * Use for general informational messages
     */
    info(message: string, data?: any): void {
        this.log(LogLevel.INFO, message, data);
    }

    /**
     * Log a warning message
     * Use for potentially harmful situations
     */
    warn(message: string, data?: any): void {
        this.log(LogLevel.WARN, message, data);
    }

    /**
     * Log an error message
     * Use for error events that might still allow the application to continue
     */
    error(message: string, data?: any): void {
        this.log(LogLevel.ERROR, message, data);
    }

    /**
     * Internal log method that creates structured log entries
     * @private
     */
    private log(level: LogLevel, message: string, data?: any): void {
        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            context: this.context,
            message,
            data,
        };

        // Add error details if data is an Error object
        if (data instanceof Error) {
            logEntry.error = {
                name: data.name,
                message: data.message,
                stack: data.stack,
            };
        }

        // Add user context if available
        if (typeof window !== 'undefined') {
            logEntry.user = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
            };

            logEntry.page = {
                pathname: window.location.pathname,
                search: window.location.search,
            };
        }

        // Console logging (always in development, errors in production)
        if (import.meta.env.DEV || level === LogLevel.ERROR) {
            this.logToConsole(level, message, logEntry);
        }

        // Send to CloudWatch in production
        if (import.meta.env.PROD) {
            this.sendToCloudWatch(logEntry);
        }
    }

    /**
     * Log to browser console with appropriate styling
     * @private
     */
    private logToConsole(level: LogLevel, message: string, logEntry: LogEntry): void {
        const style = this.getConsoleStyle(level);
        const prefix = `[${this.context}]`;

        switch (level) {
            case LogLevel.DEBUG:
                console.debug(`%c${prefix} ${message}`, style, logEntry);
                break;
            case LogLevel.INFO:
                console.info(`%c${prefix} ${message}`, style, logEntry);
                break;
            case LogLevel.WARN:
                console.warn(`%c${prefix} ${message}`, style, logEntry);
                break;
            case LogLevel.ERROR:
                console.error(`%c${prefix} ${message}`, style, logEntry);
                break;
        }
    }

    /**
     * Get console styling based on log level
     * @private
     */
    private getConsoleStyle(level: LogLevel): string {
        const styles = {
            [LogLevel.DEBUG]: 'color: #6b7280; font-weight: normal;',
            [LogLevel.INFO]: 'color: #3b82f6; font-weight: bold;',
            [LogLevel.WARN]: 'color: #f59e0b; font-weight: bold;',
            [LogLevel.ERROR]: 'color: #ef4444; font-weight: bold;',
        };
        return styles[level];
    }

    /**
     * Send log entry to CloudWatch (placeholder for production)
     * In production, this would call a Lambda function to write to CloudWatch
     * @private
     */
    private async sendToCloudWatch(_logEntry: LogEntry): Promise<void> {
        try {
            // TODO: Implement CloudWatch logging via Lambda
            // This would make a POST request to an API Gateway endpoint
            // that triggers a Lambda function to write to CloudWatch Logs

            // Example implementation:
            // await fetch('/api/logs', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(logEntry),
            // });
        } catch (error) {
            // Silently fail - don't let logging errors break the app
            console.error('Failed to send log to CloudWatch:', error);
        }
    }
}

/**
 * Create a logger instance for a specific context
 * @param context - The context/component name for the logger
 * @returns A new Logger instance
 * 
 * @example
 * const logger = createLogger('HomePage');
 * logger.info('Page loaded');
 */
export function createLogger(context: string): Logger {
    return new Logger(context);
}
