import React from 'react';

import { type FormFields, type Company, type PersonnelProps } from 'interfaces';
import { PERSONNEL_TYPE } from 'Enum';

interface SettingsContextType {
    showSidebar: boolean;
    menuDrawerOpen: boolean;
    handleCloseMenu: VoidFunction;
    handleOpenMenu: VoidFunction;
    formFields: FormFields;
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
        type?: PERSONNEL_TYPE | null;
    };
    personnelData: PersonnelProps[];
}

export const settingsInitialState: SettingsContextType = {
    showSidebar: true,
    menuDrawerOpen: true,
    handleCloseMenu: () => undefined,
    handleOpenMenu: () => undefined,
    formFields: {
        gender: []
    },
    company: {
        name: ''
    },
    loggedInPersonnel: {
        personnelId: '',
        fullName: null,
        role: null,
        email: null,
        mobileNumber: null,
        type: null
    },
    personnelData: []
};

export const SettingsContext = React.createContext({} as SettingsContextType);
