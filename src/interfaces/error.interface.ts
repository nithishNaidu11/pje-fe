export type Error = string | unknown;
export type ApiError = {
    errors: {
        api?: string;
        displayError: string;
    };
};
