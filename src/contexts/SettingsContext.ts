import React from 'react';

import { type Company, type PersonnelProps } from 'interfaces';

interface SettingsContextType {
    showSidebar: boolean;
    menuDrawerOpen: boolean;
    handleCloseMenu: VoidFunction;
    handleOpenMenu: VoidFunction;
    company: Company;
    loggedInPersonnel?: {
        fullName?: string | null;
        role?: string | null;
        email?: string | null;
        personnelId: string;
        mobileNumber?: string | null;
        personalizationDetails?: {
            searchHistoryKeywords?: [
                {
                    label: string;
                    timestamp: number;
                }
            ];
        } | null;
    };
    personnelData: PersonnelProps[];
}

export const settingsInitialState: SettingsContextType = {
    showSidebar: true,
    menuDrawerOpen: true,
    handleCloseMenu: () => undefined,
    handleOpenMenu: () => undefined,
    company: {
        name: ''
    },
    loggedInPersonnel: {
        personnelId: '',
        fullName: null,
        role: null,
        email: null,
        mobileNumber: null
    },
    personnelData: []
};

export const SettingsContext = React.createContext({} as SettingsContextType);
