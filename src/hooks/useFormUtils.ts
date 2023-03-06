import React from 'react';

import type { Options } from 'interfaces';

interface GetSelectedOption {
    options?: Options;
    fieldValue: unknown;
}

export const useFormUtils = () => {
    const getSelectedOption = React.useCallback(
        ({ options = [], fieldValue }: GetSelectedOption) => {
            return options.find(option => option.value === fieldValue) || null;
        },
        []
    );

    const getMultiSelectedOptions = React.useCallback(
        ({
            options = [],
            fieldValue
        }: {
            options?: Options;
            fieldValue: string[] | undefined;
        }) => {
            const selectedOptions =
                fieldValue && fieldValue.length > 0
                    ? fieldValue
                          .map(value => {
                              return options.find(
                                  option => option.value === value
                              );
                          })
                          .filter(val => !!val)
                    : [];
            return selectedOptions as Options;
        },
        []
    );

    return {
        getSelectedOption,
        getMultiSelectedOptions
    };
};
