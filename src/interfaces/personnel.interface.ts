import type { AuditMetadata } from './form.interface';

export interface PersonnelProps {
    fullName: string;
    personnelId: string;
    email: string;
    mobileNumber: string;
    workspaceIds: string[];
    auditMetadata: AuditMetadata;
    personalizationDetails: {
        searchHistoryKeywords?: [{ label: string; timestamp: number }];
    } | null;
}

export interface LoggedInPersonnelProps {
    personnelId?: string;
    fullName?: string;
    email?: string;
    personalizationDetails?: {
        searchHistoryKeywords?: [
            {
                label: string;
                timestamp: number;
            }
        ];
    };
    mobileNumber?: string;
}
