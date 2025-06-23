export interface FormChangeEvent {
    target: {
        name: string;
        value?: string[] | string | number;
    };
}

export interface AuditMetadata {
    addedBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export interface ValidationMapProps {
    [key: string]: (_: string) => boolean;
}

export interface ErrorStateProps {
    [key: string]: boolean;
}

export type FormErrorStateProps = {
    [key: string]: { error: boolean; errorMsg?: string };
};

export type QuestionFormErrorStateProps = {
    [key: string]: FormErrorStateProps;
};
