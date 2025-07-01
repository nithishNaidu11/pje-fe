import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    const getFormattedBooleanField = (fieldValue: boolean | null) => {
        return fieldValue === false ? 'No' : fieldValue === true ? 'Yes' : '';
    };

    return {
        getRelativeDateField,
        getFormattedBooleanField
    };
};
