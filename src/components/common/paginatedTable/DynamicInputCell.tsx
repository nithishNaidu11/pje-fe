import React from 'react';

import _ from 'lodash';

import {
    DynamicInput,
    type DynamicInputProps
} from '@hunar.ai/hunar-design-system';
import { dynamicInputCellSx } from './PaginatedTableStyles';

import { FIELD_SIZE } from 'Enum';
import type { OptionProps } from 'interfaces';

interface DynamicInputCellProps
    extends Omit<
        DynamicInputProps,
        'size' | 'sx' | 'onSelectChange' | 'onTextInputChange'
    > {
    onChange: (_: string) => void;
}

export const DynamicInputCell = ({
    label,
    name,
    id,
    options,
    value,
    selectPlaceHolder = '',
    textInputPlaceHolder = '',
    isRequired = false,
    isDisabled = false,
    limitTags = undefined,
    helperText = undefined,
    hasError = false,
    onChange
}: DynamicInputCellProps) => {
    const [cellValue, setCellValue] = React.useState(value);

    React.useEffect(() => {
        setCellValue(value);
    }, [value]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateDebouncedCellValue = React.useCallback(
        _.debounce((modifiedValue: string) => {
            onChange(modifiedValue);
        }, 2000),
        []
    );

    const onTextInputChange = React.useCallback(
        ({ target: { value } }: React.BaseSyntheticEvent) => {
            setCellValue(value);
            updateDebouncedCellValue(value.trim());
        },
        [updateDebouncedCellValue]
    );

    const onSelectChange = React.useCallback(
        (_: React.SyntheticEvent, selectedOption: OptionProps | null) => {
            if (selectedOption) {
                onChange(selectedOption.value);
            }
        },
        [onChange]
    );

    return (
        <DynamicInput
            options={options}
            label={label}
            name={name}
            id={id}
            value={cellValue}
            selectPlaceHolder={selectPlaceHolder}
            textInputPlaceHolder={textInputPlaceHolder}
            isRequired={isRequired}
            isDisabled={isDisabled}
            size={FIELD_SIZE.small}
            limitTags={limitTags}
            sx={dynamicInputCellSx}
            helperText={helperText}
            hasError={hasError}
            onSelectChange={onSelectChange}
            onTextInputChange={onTextInputChange}
        />
    );
};
