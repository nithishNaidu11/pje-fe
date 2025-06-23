import React from 'react';

import * as XLSX from 'xlsx';

import { Column } from '../components/common';

import { get as preJoiningEngagement } from 'api/preJoiningEngagement';

import { TableFilters } from 'hooks/useTableFilters';
import { useExport } from 'hooks/apiHooks/useExport';
import { useToast } from 'hooks/useToast';

import { DataUtils } from 'utils';

interface Params {
    [key: string]: string | undefined;
}

interface Props {
    exportTableId: string;
    params: Params;
    filters?: TableFilters;
    body?: {
        // actionSource?: JQ_ACTION_SOURCE;
        // candidateIds?: string[];
    };
}

interface ExportTableApiProps {
    [key: string]: any; // TODO: type this(ApiClient)
}

const exportApis: ExportTableApiProps = {
    preJoiningEngagement
};

type ObjectProps = {
    [key: string]: string;
};

interface ExportTableProps {
    data: Blob;
    fileName: string;
    exportFields: string[];
    columns: Column[];
    subHeader?: ObjectProps;
}

interface HandleExportMutationProps {
    columns: Column[];
    fileName: string;
    subHeader?: ObjectProps;
    onSuccess?: VoidFunction;
}

export const useExportWrapper = ({
    exportTableId,
    params,
    filters,
    body
}: Props) => {
    const apiClient = exportApis[exportTableId];
    const exportMutation = useExport({ apiClient, params, filters, body });
    const { showError, showSuccess } = useToast();

    const getExportFields = React.useCallback((columns: Column[]) => {
        return columns.map(
            (column: Column) => column.exportId || column.accessor
        );
    }, []);

    const getFieldToHeaderTextMap = React.useCallback((columns: Column[]) => {
        const fieldToHeaderTextMap = columns.reduce(
            (map: { [key: string]: string }, column: Column) => ({
                ...map,
                [column.exportId || column.accessor]: column.headerText
            }),
            {}
        );
        return fieldToHeaderTextMap;
    }, []);

    const exportTable = React.useCallback(
        async ({
            data,
            fileName,
            exportFields,
            columns,
            subHeader = {}
        }: ExportTableProps) => {
            const exportValues: string[][] = [];
            const ws = XLSX.utils.json_to_sheet([]);
            const wb = XLSX.utils.book_new();
            const xlsxWorkbook = XLSX.read(await data.arrayBuffer(), {
                type: 'array'
            });
            const jsonData: ObjectProps[] = XLSX.utils.sheet_to_json(
                xlsxWorkbook.Sheets[xlsxWorkbook.SheetNames[0]]
            );
            const fieldToHeaderTextMap = getFieldToHeaderTextMap(columns);

            const exportHeaders = exportFields?.reduce((acc: string[], key) => {
                const headerText =
                    fieldToHeaderTextMap?.[key] ??
                    fieldToHeaderTextMap?.[DataUtils.toCamel(key)] ??
                    key;
                acc = [...acc, headerText];
                return acc;
            }, []);
            const exportSubHeaders = Object.keys(subHeader).length
                ? columns.map(column => subHeader[column.id] || '')
                : undefined;

            const snakizedExportFields = exportFields.map(exportField =>
                DataUtils.toSnakeWrapper(exportField)
            );

            jsonData.forEach((res: ObjectProps) => {
                const singleRecord: string[] = [];
                snakizedExportFields.map(exportField => {
                    if (exportField in res) {
                        singleRecord.push(res[exportField]);
                    } else {
                        singleRecord.push('');
                    }
                });

                exportValues.push(singleRecord);
            });

            XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
            if (exportHeaders)
                XLSX.utils.sheet_add_aoa(ws, [exportHeaders], {
                    origin: 0
                });
            if (exportSubHeaders)
                XLSX.utils.sheet_add_aoa(ws, [exportSubHeaders], {
                    origin: 1
                });

            const origin = exportSubHeaders ? 2 : 1;
            exportValues.forEach((exportValue, i) => {
                XLSX.utils.sheet_add_aoa(ws, [exportValue], {
                    origin: origin + i
                });
            });

            XLSX.writeFile(wb, fileName);
        },
        [getFieldToHeaderTextMap]
    );

    const exportTableWithSubheader = (
        data: string,
        fileName: string,
        headers?: string[],
        subheaders?: string[]
    ) => {
        if (!data) {
            return;
        }
        let formattedCSVdata = '';
        if (Array.isArray(headers)) {
            const newLineIndex = data.indexOf('\n');
            const headersLine = headers.join(',');
            formattedCSVdata =
                headersLine +
                '\n' +
                subheaders +
                '\n' +
                data.substring(newLineIndex + 1);
        }

        const blob = new Blob([formattedCSVdata], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    const handleExportMutation = React.useCallback(
        ({
            columns,
            fileName,
            subHeader = {},
            onSuccess = () => undefined
        }: HandleExportMutationProps) => {
            const exportColumns = columns.slice(1);
            const exportFields = getExportFields(exportColumns);

            try {
                exportMutation.mutate(exportFields, {
                    onSuccess: data => {
                        showSuccess({
                            message: 'Records are exported successfully!'
                        });
                        exportTable({
                            data,
                            fileName,
                            exportFields,
                            columns: exportColumns,
                            subHeader
                        });
                        onSuccess();
                    },
                    onError: error => {
                        showError({
                            message: error.errors.displayError
                        });
                    }
                });
            } catch (error) {
                showError({
                    message: 'Something went wrong!'
                });
            }
        },
        [exportMutation, exportTable, getExportFields, showError, showSuccess]
    );

    return {
        exportMutation,
        exportTable,
        exportTableWithSubheader,
        handleExportMutation
    };
};
