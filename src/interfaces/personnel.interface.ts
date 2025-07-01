export interface PersonnelProps {
    fullName: string;
    personnelId: string;
    email: string;
    mobileNumber: string;
    workspaceIds: string[];
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
