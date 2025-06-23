/* eslint-disable camelcase */
import React from 'react';

import { ColumnFieldProps, RowProps } from 'components/lead';

import { useCSVValidationHelper } from 'hooks/useCSVValidationHelper';

import { DataUtils, RegExUtil } from 'utils';
import { AB_PAYROLL_TYPE } from 'Enum';

export const usePJEUploadHelper = () => {
    const { invalidChars, isCSVCellSanitized } = useCSVValidationHelper();

    const [error, setError] = React.useState('');
    const [columns, setColumns] = React.useState<ColumnFieldProps[]>([]);
    const [rows, setRows] = React.useState<RowProps[]>([]);

    const mandatoryFields: string[] = React.useMemo(
        () => [
            'full_name',
            'email',
            'offer_accepted_date',
            'date_of_joining',
            'mobile_number',
            'alternate_number'
        ],
        []
    );

    const ALLOWED_PAYROLL_TYPES = React.useMemo(
        () => [AB_PAYROLL_TYPE.POORNATA, AB_PAYROLL_TYPE.NON_POORNATA],
        []
    );

    const validatedRows = React.useCallback(
        (rows: RowProps[]): RowProps[] => {
            return (rows || []).map((row: RowProps) => {
                for (const [key, value] of Object.entries(row)) {
                    if (
                        mandatoryFields.indexOf(key) > -1 &&
                        DataUtils.isEmpty(value?.value)
                    ) {
                        setError(
                            `One of the ${mandatoryFields.join(',')} is missing`
                        );
                        return {
                            ...row,
                            [key]: {
                                ...row[key],
                                error: true
                            }
                        };
                    }

                    if (!isCSVCellSanitized(value.value)) {
                        setError(
                            `Some of the cells starts with ${invalidChars.join(
                                ', '
                            )}`
                        );
                        return {
                            ...row,
                            [key]: {
                                ...row[key],
                                error: true
                            }
                        };
                    }

                    if (
                        row?.mobile_number?.value &&
                        !RegExUtil.isMobileNumber(row?.mobile_number?.value)
                    ) {
                        setError(`There are validation errors`);
                        return {
                            ...row,
                            mobile_number: {
                                ...row.mobile_number,
                                error: true
                            }
                        };
                    }

                    if (
                        row?.alternate_number?.value &&
                        !RegExUtil.isMobileNumber(row?.alternate_number?.value)
                    ) {
                        setError(`There are validation errors`);
                        return {
                            ...row,
                            alternate_number: {
                                ...row.alternate_number,
                                error: true
                            }
                        };
                    }

                    if (
                        row?.payroll_type?.value &&
                        ALLOWED_PAYROLL_TYPES.indexOf(
                            row?.payroll_type?.value as AB_PAYROLL_TYPE
                        ) < 0
                    ) {
                        setError(
                            // eslint-disable-next-line max-len
                            `Only ${AB_PAYROLL_TYPE.POORNATA} and ${AB_PAYROLL_TYPE.NON_POORNATA} are supported for payroll_type`
                        );
                        return {
                            ...row,
                            payroll_type: {
                                ...row.payroll_type,
                                error: true
                            }
                        };
                    }
                }
                return row;
            });
        },
        [
            invalidChars,
            isCSVCellSanitized,
            mandatoryFields,
            ALLOWED_PAYROLL_TYPES
        ]
    );

    const containsInvalidColums = React.useCallback(
        (columnFields: ColumnFieldProps[]) => {
            const columns = (columnFields || []).map(
                (columnField: ColumnFieldProps) => columnField.field
            );
            const areColumnsValid = mandatoryFields.every(val =>
                columns.includes(val)
            );

            if (
                columnFields.length < mandatoryFields.length ||
                !areColumnsValid
            ) {
                setError(
                    'File could not be uploaded. Mandatory columns are mismatched.'
                );
                return true;
            }
            return false;
        },
        [mandatoryFields]
    );

    const setBulkUploadData = React.useCallback(
        (parsedData: { data: string[][] }) => {
            const columnFields = parsedData.data?.[0]?.map((datum: string) => {
                const field = datum.toLowerCase().trim().replace(/ /g, '_');
                return { field, headerName: datum, width: 70 };
            });

            if (containsInvalidColums(columnFields)) {
                return true;
            }
            parsedData.data.splice(0, 1);

            const rows: RowProps[] = parsedData.data.map((datum: string[]) => {
                const row = datum.reduce(
                    (field: RowProps, cellData: string, index: number) => {
                        if (columnFields[index]?.field)
                            return {
                                ...field,
                                [columnFields[index].field]: {
                                    value: cellData
                                }
                            };
                        else return field;
                    },
                    {}
                );
                return row;
            });
            setColumns(columnFields);
            setRows(validatedRows(rows));
        },
        [containsInvalidColums, validatedRows]
    );

    return {
        error,
        columns,
        rows,
        setError,
        setColumns,
        setRows,
        validatedRows,
        setBulkUploadData
    };
};
