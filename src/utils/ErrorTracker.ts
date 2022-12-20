/**
 * ErrorTracker provides utility to track errors in the app.
 */

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

        ErrorTracker._isInitiated = true;
    };

    /**
     * Captures exception
     * @param {Error} err Error object
     */
    static captureException = (err: unknown) => {
        if (ErrorTracker._isInitiated && err instanceof Error) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    };
}

export default ErrorTracker;
