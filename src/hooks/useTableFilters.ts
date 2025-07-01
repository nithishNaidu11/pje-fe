import React from 'react';

import { type OptionProps, type FormFields, PersonnelProps } from 'interfaces';

export const useTableFilters = (
    formFields?: FormFields,
    personnelData?: PersonnelProps[]
) => {
    const genderOptions: OptionProps[] = React.useMemo(() => {
        if (formFields) return formFields.gender;
        return [];
    }, [formFields]);

    const personnelOptions = React.useMemo(() => {
        if (personnelData) {
            const options = personnelData.map(option => {
                return {
                    label: option.email,
                    value: option.email
                };
            });
            return options;
        }

        return [];
    }, [personnelData]);

    return {
        genderOptions,
        personnelOptions
    };
};
