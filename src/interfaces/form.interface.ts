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
