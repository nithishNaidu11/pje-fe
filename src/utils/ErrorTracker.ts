/**
 * ErrorTracker provides utility to track errors in the app.
 */
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/browser';

interface Props {
    dsn?: string;
    release?: string;
    environment?: string;
}
export class ErrorTracker {
    static _isInitiated = false;

    /**
     * Initiates the error tracker
     * @param {object} options Init options
     * @param {string} options.dsn Data source name
     * @param {string} options.environment App environment
     * @param {string} options.release App release
     */
    static init = (options: Props) => {
        if (
            !options ||
            !options.dsn ||
            !options.environment ||
            !options.release
        ) {
            return;
        }
        // By including and configuring Sentry, the SDK will automatically attach
        // global handlers to capture uncaught exceptions and unhandled rejections.
        // @see https://docs.sentry.io/platforms/javascript/
        Sentry.init({
            dsn: options.dsn || '',
            environment: options.environment || '',
            release: options.release || '',
            enabled: options.environment !== 'local'
        });
        Sentry.configureScope(scope => {
            scope.setTag('service', 'worker-crm');
        });
        ErrorTracker._isInitiated = true;
    };

    /**
     * Captures exception
     * @param {Error} err Error object
     */
    static captureException = (err: unknown) => {
        if (ErrorTracker._isInitiated && err instanceof Error) {
            const axiosError = err as AxiosError;
            if (axiosError.config) Sentry.setExtra('error', axiosError.config);
            Sentry.captureException(err);
        }
    };
}

export default ErrorTracker;
