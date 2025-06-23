import React from 'react';

const INVALID_CHAR_MAP = {
    '=': '=',
    '+': '+',
    '-': '-',
    '@': '@',
    '<TAB>': '\t',
    '<CR>': '\r'
};

export const useCSVValidationHelper = () => {
    const isCSVCellSanitized = React.useCallback(
        (cellValue: string) =>
            !Object.values(INVALID_CHAR_MAP).includes(cellValue[0]),
        []
    );

    const invalidChars = React.useMemo(() => Object.keys(INVALID_CHAR_MAP), []);

    return {
        isCSVCellSanitized,
        invalidChars
    };
};
