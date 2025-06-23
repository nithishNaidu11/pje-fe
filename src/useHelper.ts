import { TableFilters } from 'hooks/useTableFilters';

import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getFormattedfilters = (filters: TableFilters) => {
        for (const modifiedFilterKey of Object.keys(filters)) {
            const filterKey = modifiedFilterKey as keyof typeof filters;
            if (Array.isArray(filters[filterKey])) {
                const filter = (
                    filters[filterKey] ? filters[filterKey] : []
                ) as string[];
                if (filter?.length === 0) {
                    delete filters[filterKey];
                }
            } else {
                if (Object.keys(filters[filterKey] || {}).length === 0) {
                    delete filters[filterKey];
                }
            }
        }

        return filters;
    };

    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    const getFormattedBooleanField = (fieldValue: boolean | null) => {
        return fieldValue === false ? 'No' : fieldValue === true ? 'Yes' : '';
    };

    return {
        getFormattedfilters,
        getRelativeDateField,
        getFormattedBooleanField
    };
};
